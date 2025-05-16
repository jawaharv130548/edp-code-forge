
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Upload, RefreshCw, Code, Copy, Download, Save } from 'lucide-react';
import { toast } from 'sonner';

const CodeGeneration: React.FC = () => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isSummarized, setIsSummarized] = useState(false);
  const [useSummarizedInput, setUseSummarizedInput] = useState(false);
  const [selectedCodeType, setSelectedCodeType] = useState<'frontend' | 'backend' | null>(null);
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [regenerationPrompt, setRegenerationPrompt] = useState('');

  const defaultPrompts = {
    frontend: "Generate React TypeScript frontend code based on the summarized use case and design specifications. Include responsive UI components, form validations, and API calls.",
    backend: "Generate Node.js TypeScript backend code based on the summarized use case and database design. Include API endpoints, database models, authentication, and validation."
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Simulating file upload
      toast.success('File uploaded successfully');
      setIsFileUploaded(true);
      
      if (!useSummarizedInput) {
        // Simulate AI summarization delay
        setTimeout(() => {
          toast.success('Content summarized successfully');
          setIsSummarized(true);
          
          if (selectedCodeType) {
            setPromptText(defaultPrompts[selectedCodeType]);
          }
        }, 1500);
      } else {
        setIsSummarized(true);
      }
    }
  };

  const handleCodeTypeSelect = (type: 'frontend' | 'backend') => {
    setSelectedCodeType(type);
    setPromptText(defaultPrompts[type]);
  };

  const handleGenerateCode = () => {
    // Simulate code generation
    toast.info('Generating code...');
    
    setTimeout(() => {
      const sampleCode = selectedCodeType === 'frontend' 
        ? `// React TypeScript Component
import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError('Error fetching users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};`
        : `// Node.js Express API with TypeScript
import express, { Request, Response } from 'express';
import { User, IUser } from '../models/User';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Get all users
router.get('/users', authenticate, async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Get user by ID
router.get('/users/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Create new user
router.post('/users', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user
    user = new User({
      name,
      email,
      password,
    });
    
    // Hash password and save user
    await user.save();
    
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;`;
      
      setGeneratedCode(sampleCode);
      toast.success('Code generated successfully');
    }, 2000);
  };

  const handleRegenerateCode = () => {
    if (!regenerationPrompt.trim()) {
      toast.error('Please enter regeneration instructions');
      return;
    }
    
    toast.info('Regenerating code...');
    
    setTimeout(() => {
      const newCode = selectedCodeType === 'frontend'
        ? `// Regenerated React TypeScript Component based on feedback
import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from './components/ui';

interface User {
  id: number;
  name: string;
  email: string;
  role: string; // Added role field based on feedback
}

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Added search functionality as requested
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError('Error fetching users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Spinner />;
  if (error) return <Alert variant="error">{error}</Alert>;

  return (
    <div className="user-list-container">
      <div className="header">
        <h2>User Management</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="primary" size="sm">Edit</Button>
                <Button variant="danger" size="sm">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      {filteredUsers.length === 0 && (
        <div className="no-results">No users found matching your search.</div>
      )}
    </div>
  );
};`
        : `// Regenerated Node.js Express API with TypeScript
import express, { Request, Response } from 'express';
import { User, IUser } from '../models/User';
import { authenticate, authorize } from '../middleware/auth'; // Added role-based authorization
import { validateUserInput } from '../validation/userValidation'; // Added validation

const router = express.Router();

// Get all users with pagination and filtering
router.get('/users', authenticate, async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const role = req.query.role as string;
    const search = req.query.search as string;
    
    const query: any = {};
    
    // Apply filters if provided
    if (role) {
      query.role = role;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const users = await User.find(query)
      .select('-password')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
      
    const total = await User.countDocuments(query);
    
    return res.status(200).json({
      users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Get user by ID
router.get('/users/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Create new user with validation
router.post('/users', validateUserInput, async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user with role
    user = new User({
      name,
      email,
      password,
      role: role || 'user', // Default role if not provided
    });
    
    // Hash password and save user
    await user.save();
    
    // Return user without password
    const newUser = await User.findById(user._id).select('-password');
    
    return res.status(201).json({ 
      message: 'User created successfully',
      user: newUser
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Added user update endpoint
router.put('/users/:id', authenticate, authorize(['admin']), validateUserInput, async (req: Request, res: Response) => {
  try {
    const { name, email, role } = req.body;
    
    // Find and update user
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      { name, email, role }, 
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.status(200).json({ 
      message: 'User updated successfully',
      user 
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;`;
      
      setGeneratedCode(newCode);
      toast.success('Code regenerated successfully');
      setRegenerationPrompt('');
    }, 2000);
  };

  const handleCopyCode = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      toast.success('Code copied to clipboard');
    }
  };

  const handleDownloadCode = () => {
    if (generatedCode) {
      const blob = new Blob([generatedCode], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedCodeType === 'frontend' ? 'frontend' : 'backend'}_code.${selectedCodeType === 'frontend' ? 'tsx' : 'ts'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Code downloaded successfully');
    }
  };

  const handleSaveCode = () => {
    if (generatedCode) {
      // Simulating saving code
      toast.success('Code saved successfully');
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Code Generation</h1>
      <p className="text-muted-foreground mb-6">
        Generate code from specifications using AI
      </p>

      {!isSummarized ? (
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Step 1: Upload Specification</h2>
          <div className="mb-4 flex items-center gap-2">
            <Checkbox 
              id="use-summarized" 
              checked={useSummarizedInput}
              onCheckedChange={(checked) => setUseSummarizedInput(checked as boolean)}
            />
            <Label htmlFor="use-summarized">File is already summarized (skip AI summarization)</Label>
          </div>
          
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-accent transition-colors">
            <input 
              type="file" 
              id="file-upload" 
              className="hidden" 
              onChange={handleFileUpload} 
              accept=".txt,.md,.doc,.docx"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-1">Upload Specification Document</p>
              <p className="text-sm text-muted-foreground">
                Upload your use case, design, and database design document (.txt, .md, .doc, .docx)
              </p>
            </label>
          </div>
        </Card>
      ) : (
        <>
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Step 1: Summarized Specification</h2>
            <div className="bg-secondary p-4 rounded-md max-h-64 overflow-auto mb-4">
              <p className="text-sm">
                This module is designed to manage user accounts in the system. Key requirements include:
                <br /><br />
                <strong>Use Case:</strong> Allow administrators to create, view, update, and delete user accounts. Regular users can view their own profile and update certain fields.
                <br /><br />
                <strong>Design Requirements:</strong> The UI should provide a clean interface for user management with search and filter capabilities. Authentication should be implemented using JWT tokens.
                <br /><br />
                <strong>DB Design:</strong> The User model includes fields for id, name, email, password (hashed), role, and timestamps for creation and update.
              </p>
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Step 2: Select Code Type</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                variant={selectedCodeType === 'frontend' ? 'default' : 'outline'}
                className="h-20 justify-start p-4"
                onClick={() => handleCodeTypeSelect('frontend')}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded">
                    <Code className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Frontend Code</p>
                    <p className="text-xs text-muted-foreground">Generate React TypeScript UI components</p>
                  </div>
                </div>
              </Button>

              <Button
                variant={selectedCodeType === 'backend' ? 'default' : 'outline'}
                className="h-20 justify-start p-4"
                onClick={() => handleCodeTypeSelect('backend')}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded">
                    <Code className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Backend Code</p>
                    <p className="text-xs text-muted-foreground">Generate Node.js API and database models</p>
                  </div>
                </div>
              </Button>
            </div>
          </Card>

          {selectedCodeType && (
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Step 3: Customize Prompt</h2>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Default prompt for {selectedCodeType} code generation:</p>
                <div className="flex items-center gap-2">
                  <RadioGroup defaultValue="default" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value="default" 
                        id="default" 
                        checked={!isEditingPrompt} 
                        onClick={() => setIsEditingPrompt(false)} 
                      />
                      <Label htmlFor="default">Use Default</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value="custom" 
                        id="custom" 
                        checked={isEditingPrompt} 
                        onClick={() => setIsEditingPrompt(true)} 
                      />
                      <Label htmlFor="custom">Customize</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {isEditingPrompt ? (
                <Textarea 
                  className="min-h-32"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                />
              ) : (
                <div className="bg-secondary p-4 rounded-md text-sm">
                  {defaultPrompts[selectedCodeType]}
                </div>
              )}

              <Button className="mt-4" onClick={handleGenerateCode}>
                Generate Code
              </Button>
            </Card>
          )}

          {generatedCode && (
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Step 4: Generated Code</h2>
              
              <Tabs defaultValue="code">
                <TabsList>
                  <TabsTrigger value="code">Code</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="code">
                  <div className="code-block mb-4">
                    <pre className="text-sm">
                      <code>{generatedCode}</code>
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="copy-button" 
                      onClick={handleCopyCode}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" onClick={handleCopyCode}>
                      <Copy className="h-4 w-4 mr-2" /> Copy Code
                    </Button>
                    <Button variant="outline" onClick={handleDownloadCode}>
                      <Download className="h-4 w-4 mr-2" /> Download
                    </Button>
                    <Button variant="outline" onClick={handleSaveCode}>
                      <Save className="h-4 w-4 mr-2" /> Save
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="preview">
                  <div className="bg-secondary p-4 rounded-md">
                    <p className="text-muted-foreground text-center">Preview not available in this demo</p>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Regenerate Code</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Provide additional instructions to improve or modify the generated code.
                </p>
                
                <div className="flex gap-2">
                  <Textarea 
                    placeholder="Example: Add pagination to the user list, improve error handling..."
                    className="flex-1"
                    value={regenerationPrompt}
                    onChange={(e) => setRegenerationPrompt(e.target.value)}
                  />
                  <Button onClick={handleRegenerateCode}>
                    <RefreshCw className="h-4 w-4 mr-2" /> Regenerate
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default CodeGeneration;
