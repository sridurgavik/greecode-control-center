
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Send, Inbox } from 'lucide-react';
import EmailCompose from '../../components/admin/email/EmailCompose';
import EmailInbox from '../../components/admin/email/EmailInbox';

const AdminEmail = () => {
  const [activeTab, setActiveTab] = useState('inbox');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto space-y-6"
    >
      <div className="flex items-center gap-3">
        <Mail className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Email Management</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email Center</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="inbox" className="flex items-center gap-2">
                <Inbox className="h-4 w-4" />
                Inbox
              </TabsTrigger>
              <TabsTrigger value="compose" className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Compose
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="inbox" className="mt-6">
              <EmailInbox />
            </TabsContent>
            
            <TabsContent value="compose" className="mt-6">
              <EmailCompose />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminEmail;
