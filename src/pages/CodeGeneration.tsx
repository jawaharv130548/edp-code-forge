
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Upload, RefreshCw, Code, Copy, Download, Save, FileCode } from 'lucide-react';
import { toast } from 'sonner';

// Interface for generated file
interface GeneratedFile {
  id: string;
  name: string;
  language: 'typescript' | 'html' | 'css' | 'java' | 'xml';
  code: string;
}

const CodeGeneration: React.FC = () => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isSummarized, setIsSummarized] = useState(false);
  const [useSummarizedInput, setUseSummarizedInput] = useState(false);
  const [selectedCodeType, setSelectedCodeType] = useState<'frontend' | 'backend' | null>(null);
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [regenerationPrompt, setRegenerationPrompt] = useState('');

  const defaultPrompts = {
    frontend: "Generate React TypeScript and HTML frontend code based on the summarized use case and design specifications. Include responsive UI components, form validations, and API calls.",
    backend: "Generate Spring Boot Java backend code based on the summarized use case and database design. Include RESTful API endpoints, service layers, repository implementations, and entity models."
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
      const files: GeneratedFile[] = [];
      
      if (selectedCodeType === 'frontend') {
        files.push({
          id: 'component-ts',
          name: 'UserList.tsx',
          language: 'typescript',
          code: `import React, { useState, useEffect } from 'react';
import './UserList.css';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="user-list-container">
      <h2>User Management</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <table className="user-table">
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
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {filteredUsers.length === 0 && (
        <div className="no-results">No users found matching your search.</div>
      )}
    </div>
  );
};
`
        });
        
        files.push({
          id: 'component-css',
          name: 'UserList.css',
          language: 'css',
          code: `.user-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.user-table th {
  background-color: #f5f5f5;
  font-weight: 600;
}

.user-table tr:hover {
  background-color: #f9f9f9;
}

.btn {
  padding: 6px 12px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-edit {
  background-color: #4a90e2;
  color: white;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  padding: 40px 0;
  font-size: 18px;
  color: #666;
}

.error-message {
  padding: 20px;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 4px;
  margin-bottom: 20px;
}

.no-results {
  padding: 20px;
  text-align: center;
  color: #666;
  background-color: #f5f5f5;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .user-table {
    font-size: 14px;
  }
  
  .user-table th,
  .user-table td {
    padding: 8px;
  }
  
  .btn {
    padding: 4px 8px;
    font-size: 12px;
  }
}
`
        });
        
        files.push({
          id: 'html-template',
          name: 'index.html',
          language: 'html',
          code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>User Management System</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav class="navbar">
      <div class="logo">User Management</div>
      <ul class="nav-links">
        <li><a href="#" class="active">Users</a></li>
        <li><a href="#">Roles</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
      <div class="user-profile">
        <img src="avatar.png" alt="User Avatar">
        <span>Admin</span>
      </div>
    </nav>
  </header>

  <main>
    <div id="root">
      <!-- React App will mount here -->
    </div>
  </main>

  <footer>
    <p>&copy; 2025 User Management System. All rights reserved.</p>
  </footer>

  <script src="bundle.js"></script>
</body>
</html>
`
        });
      } else {
        files.push({
          id: 'controller',
          name: 'UserController.java',
          language: 'java',
          code: `package com.edp.usermanagement.controller;

import com.edp.usermanagement.model.User;
import com.edp.usermanagement.service.UserService;
import com.edp.usermanagement.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<Page<UserDTO>> getAllUsers(
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String search,
            Pageable pageable) {
        
        Page<UserDTO> users = userService.findUsers(role, search, pageable);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserDTO userDTO) {
        UserDTO createdUser = userService.createUser(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserDTO userDTO) {
        
        return userService.updateUser(id, userDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.deleteUser(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
`
        });
        
        files.push({
          id: 'service',
          name: 'UserService.java',
          language: 'java',
          code: `package com.edp.usermanagement.service;

import com.edp.usermanagement.model.User;
import com.edp.usermanagement.repository.UserRepository;
import com.edp.usermanagement.dto.UserDTO;
import com.edp.usermanagement.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public Page<UserDTO> findUsers(String role, String search, Pageable pageable) {
        Specification<User> spec = Specification.where(null);
        
        if (role != null && !role.isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("role"), role));
        }
        
        if (search != null && !search.isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.or(
                cb.like(cb.lower(root.get("name")), "%" + search.toLowerCase() + "%"),
                cb.like(cb.lower(root.get("email")), "%" + search.toLowerCase() + "%")
            ));
        }
        
        return userRepository.findAll(spec, pageable).map(userMapper::toDTO);
    }

    public Optional<UserDTO> findById(Long id) {
        return userRepository.findById(id)
                .map(userMapper::toDTO);
    }

    @Transactional
    public UserDTO createUser(UserDTO userDTO) {
        User user = userMapper.toEntity(userDTO);
        
        // Encrypt password
        if (userDTO.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }
        
        // Set default role if not provided
        if (user.getRole() == null) {
            user.setRole("USER");
        }
        
        User savedUser = userRepository.save(user);
        return userMapper.toDTO(savedUser);
    }

    @Transactional
    public Optional<UserDTO> updateUser(Long id, UserDTO userDTO) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    // Update user fields
                    userMapper.updateUserFromDTO(userDTO, existingUser);
                    
                    // Update password if provided
                    if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
                        existingUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
                    }
                    
                    User updatedUser = userRepository.save(existingUser);
                    return userMapper.toDTO(updatedUser);
                });
    }

    @Transactional
    public boolean deleteUser(Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    userRepository.delete(user);
                    return true;
                })
                .orElse(false);
    }
}
`
        });
        
        files.push({
          id: 'entity',
          name: 'User.java',
          language: 'java',
          code: `package com.edp.usermanagement.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String role;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
`
        });
        
        files.push({
          id: 'repository',
          name: 'UserRepository.java',
          language: 'java',
          code: `package com.edp.usermanagement.repository;

import com.edp.usermanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
`
        });
      }
      
      setGeneratedFiles(files);
      setActiveFileId(files[0].id);
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
      // Simulates updating the first file based on regeneration prompt
      if (activeFileId && generatedFiles.length > 0) {
        const updatedFiles = generatedFiles.map(file => {
          if (file.id === activeFileId) {
            let updatedCode = file.code;
            
            // Add a comment about the regeneration
            if (file.language === 'typescript' || file.language === 'javascript' || file.language === 'java') {
              updatedCode = `// Regenerated based on feedback: ${regenerationPrompt}\n\n${file.code}`;
            } else if (file.language === 'html') {
              updatedCode = `<!-- Regenerated based on feedback: ${regenerationPrompt} -->\n\n${file.code}`;
            } else if (file.language === 'css') {
              updatedCode = `/* Regenerated based on feedback: ${regenerationPrompt} */\n\n${file.code}`;
            }
            
            return {
              ...file,
              code: updatedCode
            };
          }
          return file;
        });
        
        setGeneratedFiles(updatedFiles);
        toast.success('Code regenerated successfully');
        setRegenerationPrompt('');
      }
    }, 2000);
  };

  const handleCopyCode = () => {
    const activeFile = generatedFiles.find(file => file.id === activeFileId);
    if (activeFile) {
      navigator.clipboard.writeText(activeFile.code);
      toast.success(`${activeFile.name} copied to clipboard`);
    }
  };

  const handleDownloadCode = () => {
    const activeFile = generatedFiles.find(file => file.id === activeFileId);
    if (activeFile) {
      const blob = new Blob([activeFile.code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = activeFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(`${activeFile.name} downloaded successfully`);
    }
  };

  const handleDownloadAllFiles = () => {
    // In a real application this would be a zip file
    // For this demo we'll just show a success message
    toast.success('All files downloaded as zip');
  };

  const handleSaveCode = () => {
    if (generatedFiles.length > 0) {
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
                    <p className="text-xs text-muted-foreground">Generate Spring Boot API and models</p>
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

          {generatedFiles.length > 0 && (
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Step 4: Generated Code</h2>
              
              <Tabs defaultValue="code">
                <TabsList>
                  <TabsTrigger value="code">Code</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="code">
                  <div className="mb-4">
                    <div className="flex border-b border-border overflow-x-auto py-2 mb-4">
                      {generatedFiles.map((file) => (
                        <button
                          key={file.id}
                          className={`flex items-center px-3 py-2 text-sm font-medium whitespace-nowrap ${
                            file.id === activeFileId ? 'bg-secondary rounded-t border-b-2 border-accent' : 'text-muted-foreground'
                          }`}
                          onClick={() => setActiveFileId(file.id)}
                        >
                          <FileCode className="h-4 w-4 mr-2" />
                          {file.name}
                        </button>
                      ))}
                    </div>
                    
                    {activeFileId && (
                      <div className="code-block mb-4">
                        <pre className="text-sm max-h-96">
                          <code>{generatedFiles.find(f => f.id === activeFileId)?.code}</code>
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
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" onClick={handleCopyCode}>
                      <Copy className="h-4 w-4 mr-2" /> Copy Current File
                    </Button>
                    <Button variant="outline" onClick={handleDownloadCode}>
                      <Download className="h-4 w-4 mr-2" /> Download Current File
                    </Button>
                    <Button variant="outline" onClick={handleDownloadAllFiles}>
                      <Download className="h-4 w-4 mr-2" /> Download All Files
                    </Button>
                    <Button variant="outline" onClick={handleSaveCode}>
                      <Save className="h-4 w-4 mr-2" /> Save Project
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
                  Provide additional instructions to improve or modify the current file.
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
