
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
import { Loader2, Save } from 'lucide-react';

interface Setting {
  id: string;
  setting_key: string;
  setting_value: any;
  description: string;
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    fetchSettings();
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
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500 mt-2">Manage website settings and configurations.</p>
      </div>
      
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
    </div>
  );
};

export default WorkspaceSettings;
