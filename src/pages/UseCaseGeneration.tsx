
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileCode, Download, Copy } from 'lucide-react';
import { toast } from 'sonner';

const UseCaseGeneration: React.FC = () => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUseCase, setGeneratedUseCase] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Simulating file upload logic
      toast.success('Files uploaded successfully');
      setIsFileUploaded(true);
    }
  };

  const handleGenerateUseCase = () => {
    setIsGenerating(true);
    toast.info('Generating use case documentation...');
    
    // Simulate use case generation with a delay
    setTimeout(() => {
      const sampleUseCase = `
# User Management System Use Case Documentation

## Overview
This module provides functionality for user account management, including registration, authentication, profile management, and role-based authorization.

## Core Functionalities
1. User Registration
   - Create new user accounts with validation
   - Email verification process
   - Password strength requirements

2. Authentication
   - Secure login with JWT tokens
   - Session management
   - Password reset capabilities

3. User Profile Management
   - View and update personal information
   - Profile picture management
   - Account preferences

4. Role-based Authorization
   - Admin, Manager, and User role definitions
   - Permission-based access control
   - Role assignment capabilities

## Technical Implementation
- ASP.NET Core Identity framework
- Entity Framework Core for data access
- Repository pattern implementation
- Service layer abstractions

## API Endpoints
- GET /api/users - Retrieve users with pagination
- GET /api/users/{id} - Get specific user details
- POST /api/users - Create new user
- PUT /api/users/{id} - Update user
- DELETE /api/users/{id} - Remove user

## Database Schema
- Users table with relationships to Roles, Permissions
- Normalized data model following best practices
- Indexing strategy for optimal query performance

## Security Considerations
- Password hashing with modern algorithms
- Input validation and sanitization
- Protection against common attack vectors
- HTTPS enforcement
      `;
      
      setGeneratedUseCase(sampleUseCase);
      setIsGenerating(false);
      toast.success('Use case documentation generated successfully');
    }, 2000);
  };

  const handleCopyUseCase = () => {
    if (generatedUseCase) {
      navigator.clipboard.writeText(generatedUseCase);
      toast.success('Use case documentation copied to clipboard');
    }
  };

  const handleDownloadUseCase = () => {
    if (generatedUseCase) {
      const blob = new Blob([generatedUseCase], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'usecase-documentation.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Use case documentation downloaded');
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Use Case Generation</h1>
      <p className="text-muted-foreground mb-6">
        Generate detailed use case documentation from existing code files
      </p>

      {!isFileUploaded ? (
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Upload Code Files</h2>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-accent transition-colors">
            <input 
              type="file" 
              id="code-file-upload" 
              className="hidden" 
              onChange={handleFileUpload} 
              multiple
              accept=".cs,.vb,.xml,.config"
            />
            <label htmlFor="code-file-upload" className="cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-1">Upload .NET Code Files</p>
              <p className="text-sm text-muted-foreground">
                Upload your C#, VB.NET, XML, or config files for analysis
              </p>
            </label>
          </div>
        </Card>
      ) : (
        <>
          <Card className="p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Code Files</h2>
              <Button variant="secondary" size="sm" onClick={() => setIsFileUploaded(false)}>
                Change Files
              </Button>
            </div>
            <div className="bg-secondary p-4 rounded-md mb-4">
              <ul className="text-sm space-y-1">
                <li className="flex items-center">
                  <FileCode className="h-4 w-4 mr-2" />
                  <span>UserController.cs</span>
                </li>
                <li className="flex items-center">
                  <FileCode className="h-4 w-4 mr-2" />
                  <span>UserService.cs</span>
                </li>
                <li className="flex items-center">
                  <FileCode className="h-4 w-4 mr-2" />
                  <span>UserRepository.cs</span>
                </li>
                <li className="flex items-center">
                  <FileCode className="h-4 w-4 mr-2" />
                  <span>User.cs</span>
                </li>
                <li className="flex items-center">
                  <FileCode className="h-4 w-4 mr-2" />
                  <span>WebConfig.xml</span>
                </li>
              </ul>
            </div>
            {!generatedUseCase && (
              <Button 
                onClick={handleGenerateUseCase} 
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Use Case Documentation'}
              </Button>
            )}
          </Card>

          {generatedUseCase && (
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Generated Use Case Documentation</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyUseCase}>
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownloadUseCase}>
                    <Download className="h-4 w-4 mr-2" /> Download
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="markdown">
                <TabsList>
                  <TabsTrigger value="markdown">Markdown</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="markdown">
                  <div className="code-block">
                    <pre className="text-sm whitespace-pre-wrap p-4 bg-secondary rounded-md overflow-x-auto">
                      <code>{generatedUseCase}</code>
                    </pre>
                  </div>
                </TabsContent>
                <TabsContent value="preview">
                  <div className="prose prose-invert max-w-none p-4 bg-secondary rounded-md overflow-x-auto">
                    <h1>User Management System Use Case Documentation</h1>
                    <h2>Overview</h2>
                    <p>This module provides functionality for user account management, including registration, authentication, profile management, and role-based authorization.</p>
                    
                    <h2>Core Functionalities</h2>
                    <ol>
                      <li>
                        <strong>User Registration</strong>
                        <ul>
                          <li>Create new user accounts with validation</li>
                          <li>Email verification process</li>
                          <li>Password strength requirements</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Authentication</strong>
                        <ul>
                          <li>Secure login with JWT tokens</li>
                          <li>Session management</li>
                          <li>Password reset capabilities</li>
                        </ul>
                      </li>
                    </ol>
                    
                    <h2>Technical Implementation</h2>
                    <ul>
                      <li>ASP.NET Core Identity framework</li>
                      <li>Entity Framework Core for data access</li>
                      <li>Repository pattern implementation</li>
                      <li>Service layer abstractions</li>
                    </ul>
                    
                    <p><em>... and more details ...</em></p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default UseCaseGeneration;
