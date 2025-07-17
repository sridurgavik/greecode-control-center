
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Mail, 
  Search, 
  Star, 
  Archive, 
  Trash2, 
  Reply, 
  Forward,
  MoreHorizontal,
  Paperclip,
  Clock
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  hasAttachment: boolean;
  category: 'primary' | 'social' | 'promotions' | 'updates';
}

const EmailInbox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('primary');

  // Mock email data
  const mockEmails: Email[] = [
    {
      id: '1',
      sender: 'John Doe',
      senderEmail: 'john@example.com',
      subject: 'Project Update - Q4 2024',
      preview: 'Here is the latest update on our Q4 project progress...',
      content: 'Hello,\n\nI wanted to share the latest update on our Q4 project progress. We have successfully completed 80% of the milestones and are on track to finish by December 31st.\n\nBest regards,\nJohn',
      timestamp: '2 hours ago',
      isRead: false,
      isStarred: true,
      hasAttachment: true,
      category: 'primary'
    },
    {
      id: '2',
      sender: 'Sarah Wilson',
      senderEmail: 'sarah@company.com',
      subject: 'Meeting Reminder - Tomorrow 2PM',
      preview: 'Just a friendly reminder about our meeting scheduled for tomorrow...',
      content: 'Hi there,\n\nJust a friendly reminder about our meeting scheduled for tomorrow at 2PM. Please review the agenda I sent earlier.\n\nThanks,\nSarah',
      timestamp: '5 hours ago',
      isRead: true,
      isStarred: false,
      hasAttachment: false,
      category: 'primary'
    },
    {
      id: '3',
      sender: 'LinkedIn',
      senderEmail: 'notifications@linkedin.com',
      subject: 'You have 3 new connection requests',
      preview: 'People you may know are waiting to connect with you...',
      content: 'People you may know are waiting to connect with you on LinkedIn. Check out these connection requests.',
      timestamp: '1 day ago',
      isRead: true,
      isStarred: false,
      hasAttachment: false,
      category: 'social'
    },
    {
      id: '4',
      sender: 'Amazon',
      senderEmail: 'deals@amazon.com',
      subject: 'Limited Time Offer - 50% Off Electronics',
      preview: 'Dont miss out on our biggest electronics sale of the year...',
      content: 'Dont miss out on our biggest electronics sale of the year. Shop now and save up to 50% on selected items.',
      timestamp: '2 days ago',
      isRead: false,
      isStarred: false,
      hasAttachment: false,
      category: 'promotions'
    }
  ];

  const filteredEmails = mockEmails.filter(email => 
    email.category === selectedCategory &&
    (email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
     email.subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories = [
    { id: 'primary', name: 'Primary', count: mockEmails.filter(e => e.category === 'primary').length },
    { id: 'social', name: 'Social', count: mockEmails.filter(e => e.category === 'social').length },
    { id: 'promotions', name: 'Promotions', count: mockEmails.filter(e => e.category === 'promotions').length },
    { id: 'updates', name: 'Updates', count: mockEmails.filter(e => e.category === 'updates').length }
  ];

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    // Mark as read logic would go here
  };

  return (
    <div className="h-[600px] flex">
      {/* Email List */}
      <div className="w-1/2 border-r border-gray-200 flex flex-col">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex border-b border-gray-200">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {category.name}
              {category.count > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.count}
                </Badge>
              )}
            </button>
          ))}
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          {filteredEmails.map((email) => (
            <div
              key={email.id}
              onClick={() => handleEmailClick(email)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                !email.isRead ? 'bg-blue-50' : ''
              } ${selectedEmail?.id === email.id ? 'bg-blue-100' : ''}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${!email.isRead ? 'bg-blue-500' : 'bg-transparent'}`} />
                  <span className={`font-medium ${!email.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                    {email.sender}
                  </span>
                  {email.isStarred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                  {email.hasAttachment && <Paperclip className="h-4 w-4 text-gray-400" />}
                </div>
                <span className="text-xs text-gray-500">{email.timestamp}</span>
              </div>
              <div className={`text-sm mb-1 ${!email.isRead ? 'font-semibold' : 'font-normal'}`}>
                {email.subject}
              </div>
              <div className="text-sm text-gray-600 truncate">
                {email.preview}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Content */}
      <div className="w-1/2 flex flex-col">
        {selectedEmail ? (
          <>
            {/* Email Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">{selectedEmail.subject}</h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Star className={`h-4 w-4 ${selectedEmail.isStarred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                      <DropdownMenuItem>Move to folder</DropdownMenuItem>
                      <DropdownMenuItem>Block sender</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="font-medium">{selectedEmail.sender}</span>
                <span>&lt;{selectedEmail.senderEmail}&gt;</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {selectedEmail.timestamp}
                </div>
              </div>
            </div>

            {/* Email Content */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="whitespace-pre-wrap text-gray-800">
                {selectedEmail.content}
              </div>
            </div>

            {/* Email Actions */}
            <div className="p-4 border-t border-gray-200 flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Reply className="h-4 w-4" />
                Reply
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Forward className="h-4 w-4" />
                Forward
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">Select an email to read</p>
              <p className="text-sm">Choose an email from the list to view its content</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailInbox;
