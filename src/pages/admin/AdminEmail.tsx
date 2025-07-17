
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, Plus, RefreshCw } from 'lucide-react';
import EmailCompose from '../../components/admin/email/EmailCompose';
import EmailInbox from '../../components/admin/email/EmailInbox';

const AdminEmail = () => {
  const [currentView, setCurrentView] = useState<'inbox' | 'compose'>('inbox');

  const handleRefresh = () => {
    // Refresh emails functionality
    window.location.reload();
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-3">
          <Mail className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">Gmail</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button
            onClick={() => setCurrentView('compose')}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Compose
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {currentView === 'inbox' ? (
          <EmailInbox onCompose={() => setCurrentView('compose')} />
        ) : (
          <EmailCompose onBack={() => setCurrentView('inbox')} />
        )}
      </div>
    </div>
  );
};

export default AdminEmail;
