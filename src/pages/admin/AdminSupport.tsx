import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { MessageCircle, User, Mail, Clock, CheckCircle, X, Send, FileText, Users } from 'lucide-react';

interface Concern {
  id: string;
  userId: string;
  name: string;
  email: string;
  subject: string;
  status: 'pending' | 'active' | 'closed';
  createdAt: string;
  messages: Message[];
  closedReason?: string;
  closedSummary?: string;
  closedAt?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'admin';
  content: string;
  timestamp: string;
}

const AdminSupport = () => {
  const [currentView, setCurrentView] = useState<'main' | 'new-concerns' | 'concern-history'>('main');
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedConcern, setSelectedConcern] = useState<Concern | null>(null);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [closeReason, setCloseReason] = useState('');
  const [closeSummary, setCloseSummary] = useState('');
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  // Mock data
  const [concerns, setConcerns] = useState<Concern[]>([
    {
      id: '1',
      userId: 'USR001',
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Payment Issue',
      status: 'pending',
      createdAt: '2024-01-15T10:30:00Z',
      messages: [
        { id: '1', sender: 'user', content: 'I am having issues with my payment processing', timestamp: '2024-01-15T10:30:00Z' }
      ]
    },
    {
      id: '2',
      userId: 'USR002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Account Access',
      status: 'active',
      createdAt: '2024-01-14T15:20:00Z',
      messages: [
        { id: '1', sender: 'user', content: 'Cannot access my account', timestamp: '2024-01-14T15:20:00Z' },
        { id: '2', sender: 'admin', content: 'Hi Jane, I can help you with that. Can you provide your user ID?', timestamp: '2024-01-14T15:25:00Z' },
        { id: '3', sender: 'user', content: 'My user ID is USR002', timestamp: '2024-01-14T15:30:00Z' }
      ]
    },
    {
      id: '3',
      userId: 'USR003',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      subject: 'Feature Request',
      status: 'closed',
      createdAt: '2024-01-10T09:15:00Z',
      closedAt: '2024-01-12T14:30:00Z',
      closedReason: 'concern-solved',
      closedSummary: 'Feature request was forwarded to development team and user was satisfied with the response.',
      messages: [
        { id: '1', sender: 'user', content: 'Can you add dark mode?', timestamp: '2024-01-10T09:15:00Z' }
      ]
    }
  ]);

  const pendingConcerns = concerns.filter(c => c.status === 'pending');
  const activeConcerns = concerns.filter(c => c.status === 'active');
  const closedConcerns = concerns.filter(c => c.status === 'closed');

  const acceptConcern = (concernId: string) => {
    setConcerns(prev => prev.map(c => 
      c.id === concernId ? { ...c, status: 'active' } : c
    ));
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConcern) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'admin',
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    setConcerns(prev => prev.map(c => 
      c.id === selectedConcern.id 
        ? { ...c, messages: [...c.messages, message] }
        : c
    ));

    setSelectedConcern(prev => prev ? {
      ...prev,
      messages: [...prev.messages, message]
    } : null);

    setNewMessage('');
  };

  const closeConcern = () => {
    if (!selectedConcern || !closeReason || !closeSummary) return;

    setConcerns(prev => prev.map(c => 
      c.id === selectedConcern.id 
        ? { 
            ...c, 
            status: 'closed', 
            closedReason: closeReason,
            closedSummary: closeSummary,
            closedAt: new Date().toISOString()
          } 
        : c
    ));

    setShowCloseDialog(false);
    setSelectedConcern(null);
    setCloseReason('');
    setCloseSummary('');
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      active: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const closeReasons = [
    { value: 'user-not-responding', label: 'User Not Responding' },
    { value: 'concern-solved', label: 'Concern Solved' },
    { value: 'duplicate-request', label: 'Duplicate Request' },
    { value: 'out-of-scope', label: 'Out of Scope' }
  ];

  // Main navigation view
  if (currentView === 'main') {
    return (
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Support Management</h1>
          <p className="text-gray-600 mt-2">Handle customer support tickets and inquiries.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* New Concerns Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
            onClick={() => setCurrentView('new-concerns')}
          >
            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">New Concerns</h2>
                <p className="text-gray-600">Manage pending and active support requests</p>
                <div className="flex space-x-4 text-sm">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                    {pendingConcerns.length} Pending
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    {activeConcerns.length} Active
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Concern History Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
            onClick={() => setCurrentView('concern-history')}
          >
            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-gray-200">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <FileText className="h-8 w-8 text-gray-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Concern History</h2>
                <p className="text-gray-600">View closed support cases and their summaries</p>
                <div className="flex space-x-4 text-sm">
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                    {closedConcerns.length} Closed Cases
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // New Concerns view
  if (currentView === 'new-concerns') {
    return (
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <Button
              variant="outline"
              onClick={() => setCurrentView('main')}
              className="mb-4"
            >
              ← Back to Support
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">New Concerns</h1>
            <p className="text-gray-600 mt-2">Handle pending and active support requests.</p>
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending">
              Pending Requests ({pendingConcerns.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active Concerns ({activeConcerns.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-4">
            <div className="grid gap-4">
              {pendingConcerns.map(concern => (
                <Card key={concern.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{concern.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{concern.name}</h3>
                        <p className="text-sm text-gray-600">{concern.email}</p>
                        <p className="text-sm text-gray-500">UID: {concern.userId}</p>
                        <p className="font-medium mt-1">{concern.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusBadge(concern.status)}>
                        {concern.status}
                      </Badge>
                      <Button 
                        onClick={() => acceptConcern(concern.id)}
                        size="sm"
                      >
                        Accept
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              {pendingConcerns.length === 0 && (
                <Card className="p-8 text-center">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No pending concerns</p>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="active" className="mt-4">
            <div className="grid md:grid-cols-3 gap-4 h-[600px]">
              {/* Chat List */}
              <div className="md:col-span-1">
                <Card className="h-full">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Active Conversations</h3>
                  </div>
                  <div className="overflow-y-auto max-h-[520px]">
                    {activeConcerns.map(concern => (
                      <div
                        key={concern.id}
                        onClick={() => setSelectedConcern(concern)}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                          selectedConcern?.id === concern.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{concern.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{concern.name}</h4>
                            <p className="text-sm text-gray-600 truncate">{concern.email}</p>
                            <p className="text-xs text-gray-500">UID: {concern.userId}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Chat Interface with Professional Background */}
              <div className="md:col-span-2">
                {selectedConcern ? (
                  <Card className="h-full flex flex-col relative overflow-hidden">
                    {/* Professional Gradient Background */}
                    <div 
                      className="absolute inset-0 opacity-10"
                      style={{
                        background: `linear-gradient(135deg, 
                          rgba(59, 130, 246, 0.05) 0%, 
                          rgba(147, 51, 234, 0.05) 25%, 
                          rgba(236, 72, 153, 0.05) 50%, 
                          rgba(245, 158, 11, 0.05) 75%, 
                          rgba(34, 197, 94, 0.05) 100%),
                          url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m25 25 50 0 0 50-50 0z' fill='none' stroke='%23e5e7eb' stroke-width='0.5'/%3E%3Cpath d='m0 0 25 25m25 0 25 25m25 0 25 25' stroke='%23e5e7eb' stroke-width='0.3'/%3E%3C/svg%3E")`,
                        backgroundSize: '100px 100px, 50px 50px'
                      }}
                    />

                    {/* Subtle Dot Pattern Overlay */}
                    <div 
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
                        backgroundSize: '20px 20px'
                      }}
                    />

                    {/* Chat Header */}
                    <div className="p-4 border-b flex items-center justify-between bg-white/80 backdrop-blur-sm relative z-10">
                      <div 
                        className="flex items-center gap-3 cursor-pointer hover:bg-gray-50/50 rounded-lg p-2 -m-2 transition-colors"
                        onClick={() => setShowUserInfo(true)}
                      >
                        <Avatar className="ring-2 ring-blue-100">
                          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                            {selectedConcern.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900">{selectedConcern.name}</h3>
                          <p className="text-sm text-gray-600">{selectedConcern.subject}</p>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setShowCloseDialog(true)}
                        className="shadow-sm"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Close Case
                      </Button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
                      {selectedConcern.messages.map(message => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] p-3 rounded-lg shadow-sm ${
                              message.sender === 'admin'
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                                : 'bg-white text-gray-900 border border-gray-200'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <p className={`text-xs mt-2 ${
                              message.sender === 'admin' ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {new Date(message.timestamp).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t bg-white/80 backdrop-blur-sm relative z-10">
                      <div className="flex gap-3 items-end">
                        <div className="flex-1">
                          <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage();
                              }
                            }}
                            className="rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                            multiline
                          />
                        </div>
                        <Button
                          onClick={sendMessage}
                          disabled={!newMessage.trim()}
                          size="sm"
                          className="rounded-full h-10 w-10 p-0 bg-blue-500 hover:bg-blue-600 shadow-sm"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-gray-600 font-medium">Select a conversation to start chatting</p>
                      <p className="text-sm text-gray-500 mt-1">Choose from active conversations on the left</p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Concern History view
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <Button
          variant="outline"
          onClick={() => setCurrentView('main')}
          className="mb-4"
        >
          ← Back to Support
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Concern History</h1>
        <p className="text-gray-600 mt-2">View closed support cases and their summaries.</p>
      </motion.div>

      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Closed Concerns</h3>
          <div className="space-y-4">
            {closedConcerns.map(concern => (
              <div key={concern.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{concern.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{concern.name}</h4>
                      <p className="text-sm text-gray-600">{concern.email}</p>
                      <p className="text-sm text-gray-500">UID: {concern.userId}</p>
                    </div>
                  </div>
                  <Badge className={getStatusBadge(concern.status)}>
                    Closed
                  </Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Subject:</strong> {concern.subject}</p>
                    <p><strong>Created:</strong> {new Date(concern.createdAt).toLocaleDateString()}</p>
                    <p><strong>Closed:</strong> {concern.closedAt ? new Date(concern.closedAt).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  <div>
                    <p><strong>Reason:</strong> {closeReasons.find(r => r.value === concern.closedReason)?.label || 'N/A'}</p>
                    <p><strong>Summary:</strong> {concern.closedSummary || 'N/A'}</p>
                  </div>
                </div>
              </div>
            ))}
            {closedConcerns.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No closed concerns yet</p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* User Info Dialog */}
      <Dialog open={showUserInfo} onOpenChange={setShowUserInfo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Information</DialogTitle>
          </DialogHeader>
          {selectedConcern && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">
                    {selectedConcern.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedConcern.name}</h3>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {selectedConcern.email}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    UID: {selectedConcern.userId}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Close Case Dialog */}
      <Dialog open={showCloseDialog} onOpenChange={setShowCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Close Case</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Reason for closing</label>
              <Select value={closeReason} onValueChange={setCloseReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  {closeReasons.map(reason => (
                    <SelectItem key={reason.value} value={reason.value}>
                      {reason.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Summary of closing</label>
              <Textarea
                value={closeSummary}
                onChange={(e) => setCloseSummary(e.target.value)}
                placeholder="Provide a brief summary of the resolution..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCloseDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={closeConcern}
              disabled={!closeReason || !closeSummary}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSupport;
