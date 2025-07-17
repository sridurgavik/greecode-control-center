
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Archive, 
  Star, 
  Reply, 
  Forward, 
  Trash2, 
  MoreVertical,
  Paperclip,
  Mail,
  MailOpen,
  ArrowLeft
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EmailInboxProps {
  onCompose: () => void;
}

const EmailInbox = ({ onCompose }: EmailInboxProps) => {
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const mockEmails = [
    {
      id: 1,
      sender: 'John Doe',
      email: 'john.doe@company.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      subject: 'Welcome to our platform!',
      preview: 'Thank you for joining our platform. We are excited to have you on board and look forward to helping you achieve your goals.',
      body: 'Dear User,\n\nThank you for joining our platform. We are excited to have you on board and look forward to helping you achieve your goals.\n\nIf you have any questions, please don\'t hesitate to reach out to our support team.\n\nBest regards,\nThe Team',
      time: '10:30 AM',
      isRead: false,
      isStarred: true,
      hasAttachment: false
    },
    {
      id: 2,
      sender: 'Marketing Team',
      email: 'marketing@company.com',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
      subject: 'Weekly Newsletter - New Features',
      preview: 'Check out our latest features and updates in this weeks newsletter. We have some exciting announcements to share.',
      body: 'Hello!\n\nCheck out our latest features and updates in this weeks newsletter. We have some exciting announcements to share including new integrations and improved performance.\n\nRead more in our blog post.\n\nBest,\nMarketing Team',
      time: '9:15 AM',
      isRead: true,
      isStarred: false,
      hasAttachment: true
    },
    {
      id: 3,
      sender: 'Support Team',
      email: 'support@company.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      subject: 'Your ticket has been resolved',
      preview: 'We are happy to inform you that your support ticket #12345 has been successfully resolved.',
      body: 'Dear Customer,\n\nWe are happy to inform you that your support ticket #12345 has been successfully resolved. Our team has addressed your concerns and implemented the necessary fixes.\n\nIf you need any further assistance, please feel free to contact us.\n\nBest regards,\nSupport Team',
      time: 'Yesterday',
      isRead: false,
      isStarred: false,
      hasAttachment: false
    }
  ];

  const filteredEmails = mockEmails.filter(email => {
    return email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
           email.subject.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleEmailAction = (action: string, emailId: number) => {
    switch (action) {
      case 'star':
        toast({
          title: "Email Starred",
          description: "Email has been added to starred items.",
        });
        break;
      case 'archive':
        toast({
          title: "Email Archived",
          description: "Email has been moved to archive.",
        });
        break;
      case 'delete':
        toast({
          title: "Email Deleted",
          description: "Email has been moved to trash.",
        });
        break;
      case 'reply':
        onCompose();
        break;
      case 'forward':
        onCompose();
        break;
    }
  };

  const selectedEmailData = selectedEmail ? mockEmails.find(e => e.id === selectedEmail) : null;

  return (
    <div className="h-full flex flex-col">
      {selectedEmail ? (
        /* Email Detail View */
        <div className="flex-1 flex flex-col">
          {/* Email Header */}
          <div className="flex items-center justify-between p-4 border-b bg-card">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedEmail(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedEmailData?.avatar} />
                  <AvatarFallback>{selectedEmailData?.sender.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedEmailData?.sender}</div>
                  <div className="text-sm text-muted-foreground">{selectedEmailData?.email}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => handleEmailAction('star', selectedEmail)}>
                <Star className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleEmailAction('archive', selectedEmail)}>
                <Archive className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleEmailAction('delete', selectedEmail)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Email Content */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="mb-4">
              <h1 className="text-xl font-semibold mb-2">{selectedEmailData?.subject}</h1>
              <div className="text-sm text-muted-foreground">{selectedEmailData?.time}</div>
            </div>
            <Separator className="my-4" />
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {selectedEmailData?.body}
            </div>
          </div>

          {/* Reply Actions */}
          <div className="p-4 border-t bg-card">
            <div className="flex gap-2">
              <Button onClick={() => handleEmailAction('reply', selectedEmail)} className="flex items-center gap-2">
                <Reply className="h-4 w-4" />
                Reply
              </Button>
              <Button variant="outline" onClick={() => handleEmailAction('forward', selectedEmail)} className="flex items-center gap-2">
                <Forward className="h-4 w-4" />
                Forward
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Paperclip className="h-4 w-4" />
                Attach
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Email List View */
        <div className="flex-1 flex flex-col">
          {/* Search Bar */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search mail"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Email List */}
          <div className="flex-1 overflow-auto">
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                className={`flex items-center gap-4 p-4 border-b cursor-pointer hover:bg-accent/50 transition-colors ${
                  !email.isRead ? 'bg-accent/20' : ''
                }`}
                onClick={() => setSelectedEmail(email.id)}
              >
                <div className="flex items-center gap-2">
                  {email.isStarred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                  {email.hasAttachment && <Paperclip className="h-4 w-4 text-muted-foreground" />}
                </div>
                
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={email.avatar} />
                  <AvatarFallback>{email.sender.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className={`font-medium truncate ${!email.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {email.sender}
                    </div>
                    <div className="text-sm text-muted-foreground flex-shrink-0">
                      {email.time}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {email.email}
                  </div>
                  <div className={`text-sm font-medium mb-1 ${!email.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {email.subject}
                  </div>
                  <div className="text-sm text-muted-foreground truncate">
                    {email.preview}
                  </div>
                </div>
                
                {!email.isRead && (
                  <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailInbox;
