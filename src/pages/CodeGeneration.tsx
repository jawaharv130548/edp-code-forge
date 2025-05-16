
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, RefreshCw, Code, Copy, Download, Save, FileCode } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Form, FormField, FormItem, FormControl, FormDescription } from '@/components/ui/form';

// Define types
interface GeneratedFile {
  id: string;
  name: string;
  language: 'typescript' | 'javascript' | 'html' | 'css' | 'java' | 'xml';
  code: string;
}

interface InputOption {
  label: string;
  value: string;
}

// Frontend component type options
const frontendComponentTypes: InputOption[] = [
  { label: 'HTML', value: 'html' },
  { label: 'Form Component', value: 'form' },
  { label: 'Service Component', value: 'service' },
  { label: 'Routing Component', value: 'routing' }
];

// Backend component type options
const backendComponentTypes: InputOption[] = [
  { label: 'Entity', value: 'entity' },
  { label: 'Controller', value: 'controller' },
  { label: 'Service', value: 'service' },
  { label: 'Repository', value: 'repository' },
  { label: 'Spring Configuration', value: 'config' }
];

const CodeGeneration: React.FC = () => {
  // Input source state
  const [inputSource, setInputSource] = useState<'upload' | 'index'>('upload');
  const [useCase, setUseCase] = useState('');
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isSummarized, setIsSummarized] = useState(false);

  // Code type and component selection states
  const [selectedCodeType, setSelectedCodeType] = useState<'frontend' | 'backend' | null>(null);
  const [selectedComponentType, setSelectedComponentType] = useState<string | null>(null);
  
  // Prompt and generation states
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [regenerationPrompt, setRegenerationPrompt] = useState('');
  const [regenerateFileName, setRegenerateFileName] = useState('');

  // Reset generated files when input options change
  useEffect(() => {
    setGeneratedFiles([]);
    setActiveFileId(null);
  }, [inputSource, selectedCodeType, selectedComponentType]);

  // Update prompt text when code type or component type changes
  useEffect(() => {
    if (selectedCodeType && selectedComponentType) {
      setPromptText(getDefaultPrompt());
    }
  }, [selectedCodeType, selectedComponentType]);

  // Get default prompt based on selected options
  const getDefaultPrompt = () => {
    if (!selectedCodeType || !selectedComponentType) return '';

    if (selectedCodeType === 'frontend') {
      switch (selectedComponentType) {
        case 'html':
          return "Generate Angular HTML code based on the specified use case.";
        case 'form':
          return "Generate Angular Form Component with TypeScript and HTML based on the specified use case. Include form validations and handle submissions.";
        case 'service':
          return "Generate Angular Service Component with TypeScript for API interactions based on the specified use case.";
        case 'routing':
          return "Generate Angular Routing Component with TypeScript based on the specified use case. Include route configurations and guards if needed.";
        default:
          return "Generate Angular TypeScript code based on the specified use case.";
      }
    } else {
      switch (selectedComponentType) {
        case 'entity':
          return "Generate Spring Boot Java Entity class based on the specified use case. Include JPA annotations and relationships.";
        case 'controller':
          return "Generate Spring Boot REST Controller class based on the specified use case. Include CRUD endpoints and exception handling.";
        case 'service':
          return "Generate Spring Boot Service class based on the specified use case. Include business logic and transaction management.";
        case 'repository':
          return "Generate Spring Boot Repository interface based on the specified use case. Include custom query methods.";
        case 'config':
          return "Generate Spring Boot Configuration class based on the specified use case. Include bean definitions and property configurations.";
        default:
          return "Generate Spring Boot Java code based on the specified use case.";
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Simulating file upload
      toast.success('File uploaded successfully');
      setIsFileUploaded(true);
      
      // Simulate AI summarization delay
      setTimeout(() => {
        toast.success('Content summarized successfully');
        setIsSummarized(true);
      }, 1500);
    }
  };

  const handleCodeTypeSelect = (type: 'frontend' | 'backend') => {
    setSelectedCodeType(type);
    setSelectedComponentType(null);
  };

  const handleComponentTypeSelect = (value: string) => {
    setSelectedComponentType(value);
    setPromptText(getDefaultPrompt());
  };

  const handleGenerateCode = () => {
    if (!selectedCodeType || !selectedComponentType) {
      toast.error('Please select component type');
      return;
    }

    // Simulate code generation
    toast.info('Generating code...');
    
    setTimeout(() => {
      const files: GeneratedFile[] = [];
      
      if (selectedCodeType === 'frontend') {
        if (selectedComponentType === 'html') {
          files.push({
            id: 'user-list-html',
            name: 'user-list.component.html',
            language: 'html',
            code: `<div class="user-list-container">
  <h2>User Management</h2>
  
  <div class="search-bar">
    <input 
      type="text" 
      placeholder="Search users..."
      [(ngModel)]="searchTerm"
      (input)="filterUsers()"
    />
  </div>
  
  <table class="user-table" *ngIf="filteredUsers.length > 0">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let user of filteredUsers">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role }}</td>
        <td>
          <button class="btn btn-edit" (click)="editUser(user)">Edit</button>
          <button class="btn btn-delete" (click)="deleteUser(user.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
  
  <div class="no-results" *ngIf="filteredUsers.length === 0">
    No users found matching your search.
  </div>
</div>`
          });
        } else if (selectedComponentType === 'form') {
          files.push({
            id: 'user-form-ts',
            name: 'user-form.component.ts',
            language: 'typescript',
            code: `import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId: number | null = null;
  submitted = false;
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.createForm();
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.userId = +params['id'];
        this.loadUserData();
      }
    });
  }
  
  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['USER', Validators.required],
      password: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]]
    });
  }
  
  loadUserData(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (user) => {
          // Remove password from the form in edit mode
          const { password, ...userWithoutPassword } = user;
          this.userForm.patchValue(userWithoutPassword);
        },
        error: (error) => {
          console.error('Error loading user data', error);
        }
      });
    }
  }
  
  onSubmit(): void {
    this.submitted = true;
    
    if (this.userForm.invalid) {
      return;
    }
    
    const userData = this.userForm.value;
    
    if (this.isEditMode && this.userId) {
      this.userService.updateUser(this.userId, userData).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error updating user', error);
        }
      });
    } else {
      this.userService.createUser(userData).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error creating user', error);
        }
      });
    }
  }
  
  get f() {
    return this.userForm.controls;
  }
}`
          });
          
          files.push({
            id: 'user-form-html',
            name: 'user-form.component.html',
            language: 'html',
            code: `<div class="user-form-container">
  <h2>{{ isEditMode ? 'Edit User' : 'Create User' }}</h2>
  
  <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
    <div class="form-group">
      <label for="name">Name</label>
      <input 
        type="text" 
        id="name" 
        formControlName="name" 
        [ngClass]="{ 'is-invalid': submitted && f['name'].errors }"
      />
      <div *ngIf="submitted && f['name'].errors" class="error-message">
        <span *ngIf="f['name'].errors['required']">Name is required</span>
        <span *ngIf="f['name'].errors['minlength']">Name must be at least 3 characters</span>
      </div>
    </div>
    
    <div class="form-group">
      <label for="email">Email</label>
      <input 
        type="email" 
        id="email" 
        formControlName="email" 
        [ngClass]="{ 'is-invalid': submitted && f['email'].errors }"
      />
      <div *ngIf="submitted && f['email'].errors" class="error-message">
        <span *ngIf="f['email'].errors['required']">Email is required</span>
        <span *ngIf="f['email'].errors['email']">Email is invalid</span>
      </div>
    </div>
    
    <div class="form-group">
      <label for="role">Role</label>
      <select 
        id="role" 
        formControlName="role"
        [ngClass]="{ 'is-invalid': submitted && f['role'].errors }"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="MANAGER">Manager</option>
      </select>
      <div *ngIf="submitted && f['role'].errors" class="error-message">
        <span *ngIf="f['role'].errors['required']">Role is required</span>
      </div>
    </div>
    
    <div class="form-group" *ngIf="!isEditMode">
      <label for="password">Password</label>
      <input 
        type="password" 
        id="password" 
        formControlName="password" 
        [ngClass]="{ 'is-invalid': submitted && f['password'].errors }"
      />
      <div *ngIf="submitted && f['password'].errors" class="error-message">
        <span *ngIf="f['password'].errors['required']">Password is required</span>
        <span *ngIf="f['password'].errors['minlength']">Password must be at least 6 characters</span>
      </div>
    </div>
    
    <div class="button-group">
      <button type="submit" class="btn btn-primary">Save</button>
      <button type="button" class="btn btn-secondary" routerLink="/users">Cancel</button>
    </div>
  </form>
</div>`
          });
        } else if (selectedComponentType === 'service') {
          files.push({
            id: 'user-service',
            name: 'user.service.ts',
            language: 'typescript',
            code: `import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Page } from '../models/page.model';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/users';
  
  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) {}
  
  /**
   * Get all users with pagination and optional filtering
   */
  getUsers(page = 0, size = 10, role?: string, search?: string): Observable<Page<User>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    if (role) {
      params = params.set('role', role);
    }
    
    if (search) {
      params = params.set('search', search);
    }
    
    return this.http.get<Page<User>>(this.apiUrl, { params })
      .pipe(catchError(this.errorHandlingService.handleError));
  }
  
  /**
   * Get a user by ID
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(\`\${this.apiUrl}/\${id}\`)
      .pipe(catchError(this.errorHandlingService.handleError));
  }
  
  /**
   * Create a new user
   */
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user)
      .pipe(catchError(this.errorHandlingService.handleError));
  }
  
  /**
   * Update an existing user
   */
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(\`\${this.apiUrl}/\${id}\`, user)
      .pipe(catchError(this.errorHandlingService.handleError));
  }
  
  /**
   * Delete a user by ID
   */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(\`\${this.apiUrl}/\${id}\`)
      .pipe(catchError(this.errorHandlingService.handleError));
  }
  
  /**
   * Get user profile (current authenticated user)
   */
  getCurrentUserProfile(): Observable<User> {
    return this.http.get<User>(\`\${this.apiUrl}/profile\`)
      .pipe(catchError(this.errorHandlingService.handleError));
  }
}`
          });
          
          files.push({
            id: 'user-model',
            name: 'user.model.ts',
            language: 'typescript',
            code: `export interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}`
          });
        } else if (selectedComponentType === 'routing') {
          files.push({
            id: 'user-routing',
            name: 'user-routing.module.ts',
            language: 'typescript',
            code: `import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { RoleGuard } from '../core/guards/role.guard';

const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: { title: 'User Management' }
  },
  {
    path: 'users/new',
    component: UserFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { 
      title: 'Create User',
      roles: ['ADMIN', 'MANAGER'] 
    }
  },
  {
    path: 'users/:id',
    component: UserDetailComponent,
    canActivate: [AuthGuard],
    data: { title: 'User Details' }
  },
  {
    path: 'users/:id/edit',
    component: UserFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { 
      title: 'Edit User',
      roles: ['ADMIN', 'MANAGER'] 
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

@NgModule({
  imports: [UserRoutingModule],
  declarations: []
})
export class UserModule { }`
          });
        }
      } else if (selectedCodeType === 'backend') {
        if (selectedComponentType === 'entity') {
          files.push({
            id: 'user-entity',
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
}`
          });
        } else if (selectedComponentType === 'controller') {
          files.push({
            id: 'user-controller',
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
    
    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getCurrentUserProfile() {
        UserDTO currentUser = userService.getCurrentUserProfile();
        return ResponseEntity.ok(currentUser);
    }
}`
          });
        } else if (selectedComponentType === 'service') {
          files.push({
            id: 'user-service',
            name: 'UserService.java',
            language: 'java',
            code: `package com.edp.usermanagement.service;

import com.edp.usermanagement.model.User;
import com.edp.usermanagement.repository.UserRepository;
import com.edp.usermanagement.dto.UserDTO;
import com.edp.usermanagement.mapper.UserMapper;
import com.edp.usermanagement.exception.ResourceNotFoundException;
import com.edp.usermanagement.security.SecurityUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final SecurityUtils securityUtils;

    @Autowired
    public UserService(
        UserRepository userRepository, 
        UserMapper userMapper, 
        PasswordEncoder passwordEncoder,
        SecurityUtils securityUtils
    ) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.securityUtils = securityUtils;
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
        
        return userRepository.findAll(spec, pageable)
            .map(userMapper::toDTO);
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
    
    @Transactional(readOnly = true)
    public UserDTO getCurrentUserProfile() {
        String currentUsername = securityUtils.getCurrentUserLogin()
            .orElseThrow(() -> new RuntimeException("Current user not found"));
            
        User user = userRepository.findByEmail(currentUsername)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            
        return userMapper.toDTO(user);
    }
}`
          });
        } else if (selectedComponentType === 'repository') {
          files.push({
            id: 'user-repository',
            name: 'UserRepository.java',
            language: 'java',
            code: `package com.edp.usermanagement.repository;

import com.edp.usermanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    
    /**
     * Find a user by email
     * 
     * @param email the email to search for
     * @return the user with the given email
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Check if a user with the given email exists
     * 
     * @param email the email to check
     * @return true if a user with the email exists
     */
    boolean existsByEmail(String email);
    
    /**
     * Find users by role
     * 
     * @param role the role to search for
     * @return list of users with the given role
     */
    List<User> findByRole(String role);
    
    /**
     * Find users with a name containing the given string (case insensitive)
     * 
     * @param name the name pattern to search for
     * @return list of users with matching names
     */
    @Query("SELECT u FROM User u WHERE LOWER(u.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<User> findByNameContainingIgnoreCase(@Param("name") String name);
    
    /**
     * Count users by role
     * 
     * @param role the role to count
     * @return number of users with the given role
     */
    long countByRole(String role);
}`
          });
        } else if (selectedComponentType === 'config') {
          files.push({
            id: 'spring-config',
            name: 'SecurityConfig.java',
            language: 'java',
            code: `package com.edp.usermanagement.config;

import com.edp.usermanagement.security.JwtAuthenticationFilter;
import com.edp.usermanagement.security.JwtAuthorizationFilter;
import com.edp.usermanagement.security.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    
    @Autowired
    private JwtAuthorizationFilter jwtAuthorizationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/users").hasAnyRole("ADMIN", "MANAGER")
                .antMatchers(HttpMethod.POST, "/api/users").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/users/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/users/**").hasRole("ADMIN")
                .antMatchers("/api/users/profile").authenticated()
                .anyRequest().authenticated()
            .and()
            .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setExposedHeaders(Arrays.asList("Authorization"));
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }
}`
          });
        }
      }
      
      if (files.length > 0) {
        setGeneratedFiles(files);
        setActiveFileId(files[0].id);
        toast.success('Code generated successfully');
      } else {
        toast.error('Failed to generate code');
      }
    }, 2000);
  };

  const handleRegenerateCode = () => {
    if (!regenerationPrompt.trim() || !regenerateFileName.trim()) {
      toast.error('Please enter both filename and regeneration instructions');
      return;
    }
    
    toast.info('Regenerating code...');
    
    setTimeout(() => {
      const updatedFiles = generatedFiles.map(file => {
        if (file.name === regenerateFileName) {
          let updatedCode = file.code;
          
          // Check language type
          if (['typescript', 'javascript', 'java'].includes(file.language)) {
            updatedCode = `// Regenerated based on feedback: ${regenerationPrompt}\n\n${file.code}`;
          } else if (file.language === 'html') {
            updatedCode = `<!-- Regenerated based on feedback: ${regenerationPrompt} -->\n\n${file.code}`;
          } else if (file.language === 'css') {
            updatedCode = `/* Regenerated based on feedback: ${regenerationPrompt} */\n\n${file.code}`;
          } else if (file.language === 'xml') {
            updatedCode = `<!-- Regenerated based on feedback: ${regenerationPrompt} -->\n\n${file.code}`;
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
      setRegenerateFileName('');
    }, 1500);
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
    toast.success('All files downloaded as zip');
  };

  const handleSaveCode = () => {
    if (generatedFiles.length > 0) {
      toast.success('Code saved successfully');
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Code Generation</h1>
      <p className="text-muted-foreground mb-6">
        Generate code from specifications using AI
      </p>

      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Step 1: Input Source</h2>
        
        <div className="mb-4 flex items-center gap-2">
          <RadioGroup 
            value={inputSource} 
            onValueChange={(value) => setInputSource(value as 'upload' | 'index')}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="upload" id="upload" />
              <Label htmlFor="upload">Upload Specification Document</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="index" id="index" />
              <Label htmlFor="index">Refer Uploaded Document Index</Label>
            </div>
          </RadioGroup>
        </div>

        {inputSource === 'index' ? (
          <div className="mb-4">
            <Label htmlFor="useCase" className="mb-2 block">Specify Use Case</Label>
            <Textarea 
              id="useCase"
              placeholder="Describe the use case you want to generate code for..."
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              className="min-h-32"
            />
          </div>
        ) : (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
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
        )}
      </Card>

      {(inputSource === 'index' || isSummarized) && (
        <>
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Step 2: Select Code Type</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                variant={selectedCodeType === 'frontend' ? 'default' : 'outline'}
                className="h-20 justify-start p-4"
                onClick={() => handleCodeTypeSelect('frontend')}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500/10 p-2 rounded">
                    <Code className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Frontend Code</p>
                    <p className="text-xs text-muted-foreground">Generate Angular TypeScript and HTML components</p>
                  </div>
                </div>
              </Button>

              <Button
                variant={selectedCodeType === 'backend' ? 'default' : 'outline'}
                className="h-20 justify-start p-4"
                onClick={() => handleCodeTypeSelect('backend')}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500/10 p-2 rounded">
                    <Code className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Backend Code</p>
                    <p className="text-xs text-muted-foreground">Generate Spring Boot Java components</p>
                  </div>
                </div>
              </Button>
            </div>
          </Card>

          {selectedCodeType && (
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Step 3: Select Component Type</h2>
              
              <div className="mb-4">
                <Label htmlFor="componentType" className="mb-2 block">Component Type</Label>
                <Select 
                  value={selectedComponentType || ''} 
                  onValueChange={handleComponentTypeSelect}
                >
                  <SelectTrigger id="componentType">
                    <SelectValue placeholder="Select component type" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCodeType === 'frontend' 
                      ? frontendComponentTypes.map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))
                      : backendComponentTypes.map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))
                    }
                  </SelectContent>
                </Select>
              </div>

              {selectedComponentType && (
                <>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Code generation prompt:</p>
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
                      {promptText}
                    </div>
                  )}

                  <Button className="mt-4" onClick={handleGenerateCode}>
                    Generate Code
                  </Button>
                </>
              )}
            </Card>
          )}

          {generatedFiles.length > 0 && (
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Step 4: Generated Code</h2>
              
              <Tabs defaultValue="code">
                <TabsList>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="code">
                  <div className="mb-4">
                    <div className="flex border-b border-border overflow-x-auto py-2 mb-4">
                      {generatedFiles.map((file) => (
                        <button
                          key={file.id}
                          className={`flex items-center px-3 py-2 text-sm font-medium whitespace-nowrap ${
                            file.id === activeFileId ? 'bg-secondary rounded-t border-b-2 border-blue-500' : 'text-muted-foreground'
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
                        <pre className="text-sm max-h-96 overflow-auto bg-secondary p-4 rounded-md">
                          <code>{generatedFiles.find(f => f.id === activeFileId)?.code}</code>
                        </pre>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="copy-button absolute top-2 right-2" 
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
              </Tabs>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Regenerate Code</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Provide additional instructions to improve or modify a specific file.
                </p>
                
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div>
                    <Label htmlFor="regenerateFileName" className="mb-2 block">File to Regenerate</Label>
                    <Select value={regenerateFileName} onValueChange={setRegenerateFileName}>
                      <SelectTrigger id="regenerateFileName">
                        <SelectValue placeholder="Select file to regenerate" />
                      </SelectTrigger>
                      <SelectContent>
                        {generatedFiles.map((file) => (
                          <SelectItem key={file.id} value={file.name}>{file.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="regenerationPrompt" className="mb-2 block">Regeneration Instructions</Label>
                    <Textarea 
                      id="regenerationPrompt"
                      placeholder="Example: Add pagination to the user list, improve error handling..."
                      value={regenerationPrompt}
                      onChange={(e) => setRegenerationPrompt(e.target.value)}
                    />
                  </div>
                </div>
                
                <Button onClick={handleRegenerateCode}>
                  <RefreshCw className="h-4 w-4 mr-2" /> Regenerate File
                </Button>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default CodeGeneration;
