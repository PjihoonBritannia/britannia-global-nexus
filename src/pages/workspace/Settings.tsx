
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Save, Globe } from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  getWordPressSettings,
  updateWordPressSettings,
  fetchWordPressApiLogs
} from '@/integrations/wordpress/api';

interface Setting {
  id: string;
  setting_key: string;
  setting_value: any;
  description: string;
}

interface WordPressSettings {
  id?: string;
  api_url: string;
  admin_url: string;
  username: string;
  app_password: string;
}

interface ApiLog {
  id: string;
  request_method: string;
  request_url: string;
  request_headers?: Record<string, unknown>;
  response_status: number;
  response_body?: string;
  timestamp: string;
}

const defaultSettings = [
  {
    setting_key: 'site_title',
    setting_value: 'Britannia Global Nexus',
    description: 'The title of the website'
  },
  {
    setting_key: 'contact_email',
    setting_value: 'kremi@britannia.co.kr',
    description: 'The main contact email for the website'
  },
  {
    setting_key: 'social_media',
    setting_value: {
      linkedin: 'https://linkedin.com'
    },
    description: 'Social media links'
  }
];

const WorkspaceSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<Setting[]>([]);
  const [wpSettings, setWpSettings] = useState<WordPressSettings>({
    api_url: '',
    admin_url: '',
    username: '',
    app_password: ''
  });
  const [apiLogs, setApiLogs] = useState<ApiLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [wpLoading, setWpLoading] = useState(true);
  const [logsLoading, setLogsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [wpSaving, setWpSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  
  useEffect(() => {
    fetchSettings();
    fetchWordPressConfig();
    fetchApiLogs();
    
    // Set up interval to refresh API logs every 30 seconds
    const logsInterval = setInterval(fetchApiLogs, 30000);
    
    return () => {
      clearInterval(logsInterval);
    };
  }, []);
  
  const fetchSettings = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .order('setting_key', { ascending: true });
        
      if (error) {
        console.error('Error fetching settings:', error);
        toast.error('Failed to load settings');
        return;
      }
      
      if (data && data.length > 0) {
        setSettings(data);
      } else {
        // Initialize with default settings if none exist
        initializeDefaultSettings();
      }
    } catch (error) {
      console.error('Error in fetchSettings:', error);
      toast.error('An error occurred while loading settings');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchWordPressConfig = async () => {
    try {
      setWpLoading(true);
      const settings = await getWordPressSettings();
      setWpSettings(settings);
    } catch (error) {
      console.error('Error fetching WordPress settings:', error);
      toast.error('Failed to load WordPress settings');
    } finally {
      setWpLoading(false);
    }
  };
  
  const fetchApiLogs = async () => {
    try {
      setLogsLoading(true);
      const logs = await fetchWordPressApiLogs();
      setApiLogs(logs);
    } catch (error) {
      console.error('Error fetching API logs:', error);
    } finally {
      setLogsLoading(false);
    }
  };
  
  const initializeDefaultSettings = async () => {
    try {
      const settingsToInsert = defaultSettings.map(setting => ({
        ...setting,
        updated_by: user?.id
      }));
      
      const { data, error } = await supabase
        .from('settings')
        .insert(settingsToInsert)
        .select();
        
      if (error) {
        console.error('Error initializing settings:', error);
        toast.error('Failed to initialize settings');
        return;
      }
      
      setSettings(data || []);
    } catch (error) {
      console.error('Error initializing settings:', error);
      toast.error('An error occurred while initializing settings');
    }
  };
  
  const updateSetting = async (settingId: string, newValue: any) => {
    const updatedSettings = settings.map(setting => {
      if (setting.id === settingId) {
        if (typeof setting.setting_value === 'object' && !Array.isArray(setting.setting_value)) {
          return {
            ...setting,
            setting_value: { ...setting.setting_value, ...newValue }
          };
        }
        return { ...setting, setting_value: newValue };
      }
      return setting;
    });
    
    setSettings(updatedSettings);
  };
  
  const handleWpInputChange = (field: keyof WordPressSettings, value: string) => {
    setWpSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const saveSettings = async () => {
    try {
      setSaving(true);
      
      for (const setting of settings) {
        const { error } = await supabase
          .from('settings')
          .update({
            setting_value: setting.setting_value,
            updated_by: user?.id,
            updated_at: new Date().toISOString()
          })
          .eq('id', setting.id);
          
        if (error) {
          console.error(`Error updating setting ${setting.setting_key}:`, error);
          toast.error(`Failed to save setting: ${setting.setting_key}`);
          return;
        }
      }
      
      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('An error occurred while saving settings');
    } finally {
      setSaving(false);
    }
  };
  
  const saveWordPressSettings = async () => {
    try {
      setWpSaving(true);
      const success = await updateWordPressSettings(wpSettings);
      
      if (success) {
        toast.success('WordPress settings updated successfully');
      }
    } catch (error) {
      console.error('Error saving WordPress settings:', error);
      toast.error('Failed to update WordPress settings');
    } finally {
      setWpSaving(false);
    }
  };
  
  const handleInputChange = (settingId: string, value: string) => {
    updateSetting(settingId, value);
  };
  
  const handleJsonChange = (settingId: string, key: string, value: string) => {
    const setting = settings.find(s => s.id === settingId);
    if (setting && typeof setting.setting_value === 'object') {
      const updatedValue = { ...setting.setting_value, [key]: value };
      updateSetting(settingId, updatedValue);
    }
  };
  
  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600';
    if (status >= 400 && status < 500) return 'text-amber-600';
    if (status >= 500) return 'text-red-600';
    return 'text-gray-600';
  };
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET': return 'bg-blue-100 text-blue-700';
      case 'POST': return 'bg-green-100 text-green-700';
      case 'PUT': return 'bg-amber-100 text-amber-700';
      case 'DELETE': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500 mt-2">Manage website settings and configurations.</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="wordpress">WordPress</TabsTrigger>
          <TabsTrigger value="logs">API Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-point" />
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {settings.map((setting) => (
                  <Card key={setting.id}>
                    <CardHeader>
                      <CardTitle className="capitalize">
                        {setting.setting_key.replace(/_/g, ' ')}
                      </CardTitle>
                      <CardDescription>{setting.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {typeof setting.setting_value === 'object' && !Array.isArray(setting.setting_value) ? (
                        <div className="space-y-4">
                          {Object.entries(setting.setting_value).map(([key, value]) => (
                            <div key={key} className="space-y-2">
                              <Label htmlFor={`${setting.id}-${key}`} className="capitalize">
                                {key.replace(/_/g, ' ')}
                              </Label>
                              <Input
                                id={`${setting.id}-${key}`}
                                value={value as string}
                                onChange={(e) => handleJsonChange(setting.id, key, e.target.value)}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Input
                            id={setting.id}
                            value={setting.setting_value}
                            onChange={(e) => handleInputChange(setting.id, e.target.value)}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-end pt-6">
                <Button 
                  onClick={saveSettings} 
                  disabled={saving}
                  className="bg-point hover:bg-point/90 text-white"
                >
                  {saving ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Settings
                    </span>
                  )}
                </Button>
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="wordpress" className="space-y-4">
          {wpLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-point" />
            </div>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" /> WordPress API Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure the connection to your WordPress site's REST API
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="wp-api-url">WordPress API URL</Label>
                      <Input
                        id="wp-api-url"
                        value={wpSettings.api_url}
                        onChange={(e) => handleWpInputChange('api_url', e.target.value)}
                        placeholder="https://britannia.co.kr/wp-json/wp/v2"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="wp-admin-url">WordPress Admin URL</Label>
                      <Input
                        id="wp-admin-url"
                        value={wpSettings.admin_url}
                        onChange={(e) => handleWpInputChange('admin_url', e.target.value)}
                        placeholder="https://britannia.co.kr/wp-admin"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="wp-username">WordPress Username</Label>
                      <Input
                        id="wp-username"
                        value={wpSettings.username}
                        onChange={(e) => handleWpInputChange('username', e.target.value)}
                        placeholder="gbadmin"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="wp-app-password">Application Password</Label>
                      <Input
                        id="wp-app-password"
                        value={wpSettings.app_password}
                        onChange={(e) => handleWpInputChange('app_password', e.target.value)}
                        placeholder="XXR3 nGgK olNF QmsQ V9oq 00dg"
                        type="password"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        This password is used to authenticate with the WordPress REST API.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    onClick={saveWordPressSettings} 
                    disabled={wpSaving}
                    className="bg-point hover:bg-point/90 text-white"
                  >
                    {wpSaving ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save WordPress Settings
                      </span>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>WordPress REST API Logs</CardTitle>
              <CardDescription>
                Logs of API requests between this application and WordPress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] overflow-y-auto border rounded-md">
                {logsLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-point" />
                  </div>
                ) : apiLogs.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No API logs available
                  </div>
                ) : (
                  <div className="divide-y">
                    {apiLogs.map((log) => (
                      <div key={log.id} className="p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-0.5 text-xs font-medium rounded ${getMethodColor(log.request_method)}`}>
                              {log.request_method}
                            </span>
                            <span className={`font-medium ${getStatusColor(log.response_status)}`}>
                              {log.response_status}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(log.timestamp)}
                          </span>
                        </div>
                        
                        <div className="text-sm mb-2 break-all">
                          <span className="font-medium">URL:</span> {log.request_url}
                        </div>
                        
                        {log.request_headers && (
                          <div className="mb-2">
                            <details>
                              <summary className="text-sm font-medium cursor-pointer">
                                Request Headers
                              </summary>
                              <pre className="text-xs bg-gray-50 p-2 mt-2 rounded overflow-x-auto">
                                {JSON.stringify(log.request_headers, null, 2)}
                              </pre>
                            </details>
                          </div>
                        )}
                        
                        {log.response_body && (
                          <div>
                            <details>
                              <summary className="text-sm font-medium cursor-pointer">
                                Response Body
                              </summary>
                              <pre className="text-xs bg-gray-50 p-2 mt-2 rounded overflow-x-auto">
                                {log.response_body.length > 500 
                                  ? log.response_body.substring(0, 500) + '...' 
                                  : log.response_body
                                }
                              </pre>
                            </details>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={fetchApiLogs}
                variant="outline"
              >
                Refresh Logs
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkspaceSettings;
