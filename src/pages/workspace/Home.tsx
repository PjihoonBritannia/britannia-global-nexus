
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, Settings } from 'lucide-react';

const WorkspaceHome = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Workspace</h1>
        <p className="text-gray-500 mt-2">Welcome to the Britannia Global Nexus administration panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="p-6">
          <div className="flex flex-col h-full">
            <div className="rounded-full bg-blue-100 p-3 w-fit mb-4">
              <Users className="h-6 w-6 text-blue-700" />
            </div>
            <h2 className="text-xl font-semibold mb-2">User Management</h2>
            <p className="text-gray-500 mb-4 flex-grow">Manage user accounts, create new users, and adjust permissions.</p>
            <Button onClick={() => navigate('/workspace/accounts')} className="w-full">
              Manage Accounts
            </Button>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex flex-col h-full">
            <div className="rounded-full bg-green-100 p-3 w-fit mb-4">
              <FileText className="h-6 w-6 text-green-700" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Content Management</h2>
            <p className="text-gray-500 mb-4 flex-grow">Create and edit website content, manage media files and pages.</p>
            <Button onClick={() => navigate('/workspace/contents')} className="w-full">
              Manage Content
            </Button>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex flex-col h-full">
            <div className="rounded-full bg-purple-100 p-3 w-fit mb-4">
              <Settings className="h-6 w-6 text-purple-700" />
            </div>
            <h2 className="text-xl font-semibold mb-2">System Settings</h2>
            <p className="text-gray-500 mb-4 flex-grow">Configure system settings, manage API integrations, and more.</p>
            <Button onClick={() => navigate('/workspace/settings')} className="w-full">
              Manage Settings
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WorkspaceHome;
