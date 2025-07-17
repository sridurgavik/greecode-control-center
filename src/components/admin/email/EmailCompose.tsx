
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Send, FileText, Palette } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const EmailCompose = () => {
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const emailTemplates = [
    { 
      id: 'welcome', 
      name: 'Welcome Email',
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Welcome to Greecode!</h1>
        <p>Thank you for joining our community. We're excited to have you on board.</p>
        <p>Best regards,<br>The Greecode Team</p>
      </div>`
    },
    { 
      id: 'newsletter', 
      name: 'Newsletter',
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">Monthly Newsletter</h2>
        <p>Here are the latest updates and news from our platform.</p>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Latest Features</h3>
          <p>Discover what's new this month...</p>
        </div>
      </div>`
    },
    { 
      id: 'promotional', 
      name: 'Promotional Email',
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #dc2626;">Special Offer!</h1>
        <p style="font-size: 18px;">Don't miss out on our limited-time promotion.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="background: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px;">Shop Now</a>
        </div>
      </div>`
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    const template = emailTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setMessage(template.html);
    }
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      toast({
        title: "CSV Uploaded",
        description: `File "${file.name}" uploaded successfully.`,
      });
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload a valid CSV file.",
        variant: "destructive"
      });
    }
  };

  const handleSendEmail = () => {
    if (!recipients && !csvFile) {
      toast({
        title: "Recipients Required",
        description: "Please add recipients or upload a CSV file.",
        variant: "destructive"
      });
      return;
    }

    if (!subject || !message) {
      toast({
        title: "Missing Information",
        description: "Please fill in subject and message.",
        variant: "destructive"
      });
      return;
    }

    // Here you would integrate with your email service
    toast({
      title: "Email Sent",
      description: "Your email has been sent successfully!",
    });

    // Reset form
    setRecipients('');
    setSubject('');
    setMessage('');
    setSelectedTemplate('');
    setCsvFile(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recipients Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recipients
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="recipients">Email Addresses</Label>
              <Textarea
                id="recipients"
                placeholder="Enter email addresses separated by commas..."
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">OR</p>
              <Label htmlFor="csv-upload" className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Upload CSV File</p>
                  {csvFile && (
                    <p className="text-xs text-green-600 mt-1">
                      {csvFile.name} uploaded
                    </p>
                  )}
                </div>
                <Input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleCsvUpload}
                  className="hidden"
                />
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Template Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Email Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="template-select">Choose Template</Label>
                <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a template..." />
                  </SelectTrigger>
                  <SelectContent>
                    {emailTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedTemplate && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Template selected: {emailTemplates.find(t => t.id === selectedTemplate)?.name}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Content */}
      <Card>
        <CardHeader>
          <CardTitle>Email Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Enter email subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Enter your message or HTML content..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 min-h-[200px]"
            />
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSendEmail} className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Send Email
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailCompose;
