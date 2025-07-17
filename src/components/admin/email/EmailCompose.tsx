
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Send, FileText, Palette, ArrowLeft, Eye, Settings, Paperclip } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EmailComposeProps {
  onBack: () => void;
}

const EmailCompose = ({ onBack }: EmailComposeProps) => {
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
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-xl font-semibold">Compose Email</h1>
          <span className="text-sm text-muted-foreground">Create and send your email campaign</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleSendEmail} className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Send Campaign
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Email Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Details</CardTitle>
                  <p className="text-sm text-muted-foreground">Configure your email campaign</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="subject">Subject Line</Label>
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
                      placeholder="Write your email message here... Use {{name}} and {{email}} for personalization"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-1 min-h-[300px]"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Use variables: {'{{ name }}'}, {'{{ email }}'} for personalization
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Advanced Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Advanced Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Sender Name</Label>
                      <Input placeholder="Your Company" className="mt-1" />
                    </div>
                    <div>
                      <Label>Sender Email</Label>
                      <Input placeholder="noreply@company.com" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label>Reply-To Email</Label>
                    <Input placeholder="support@company.com" className="mt-1" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Paperclip className="h-4 w-4" />
                      Add Attachment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Recipients & Templates */}
            <div className="space-y-6">
              {/* Recipients */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Recipients
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Upload CSV File</Label>
                    <Label htmlFor="csv-upload" className="cursor-pointer mt-1 block">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 hover:border-muted-foreground/50 transition-colors text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload CSV</p>
                        {csvFile && (
                          <p className="text-xs text-primary mt-1 font-medium">
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
                    <div className="mt-2 p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground font-medium">CSV format: name, email</p>
                      <p className="text-xs text-muted-foreground">Example:</p>
                      <p className="text-xs text-muted-foreground">John Doe, john@example.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Templates */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Email Templates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Choose Template</Label>
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
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-2">Template Preview:</p>
                      <p className="text-xs text-muted-foreground">
                        {emailTemplates.find(t => t.id === selectedTemplate)?.name}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Campaign Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subject:</span>
                    <span className="font-medium">{subject || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Recipients:</span>
                    <span className="font-medium">{csvFile ? '1 file uploaded' : '0'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Template:</span>
                    <span className="font-medium">{selectedTemplate ? emailTemplates.find(t => t.id === selectedTemplate)?.name : 'Plain'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium text-primary">Ready to send</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailCompose;
