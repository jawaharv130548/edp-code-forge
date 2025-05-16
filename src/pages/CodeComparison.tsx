
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileCode } from 'lucide-react';
import { toast } from 'sonner';

const CodeComparison: React.FC = () => {
  const [leftPanelType, setLeftPanelType] = useState<'usecase' | 'code'>('usecase');
  const [rightPanelType, setRightPanelType] = useState<'usecase' | 'code'>('code');
  const [leftFileUploaded, setLeftFileUploaded] = useState(false);
  const [rightFileUploaded, setRightFileUploaded] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<string | null>(null);

  const handleLeftFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      toast.success(`${leftPanelType === 'usecase' ? 'Use case' : 'Code'} file uploaded successfully`);
      setLeftFileUploaded(true);
    }
  };

  const handleRightFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      toast.success(`${rightPanelType === 'usecase' ? 'Use case' : 'Code'} file uploaded successfully`);
      setRightFileUploaded(true);
    }
  };

  const handleCompare = () => {
    if (!leftFileUploaded || !rightFileUploaded) {
      toast.error('Please upload both files before comparing');
      return;
    }

    toast.info('Analyzing files...');
    
    // Simulate comparison delay
    setTimeout(() => {
      const result = `
## Comparison Analysis

### Requirements Coverage
- **90% of requirements** are implemented in the code
- **2 missing requirements** identified

### Missing Requirements
1. User role-based access control is not fully implemented
2. Password reset functionality is missing

### Code Quality Issues
- Error handling could be improved in user update functions
- Database queries may benefit from indexing for better performance

### Recommendations
1. Add role verification middleware to protected routes
2. Implement password reset functionality with email verification
3. Enhance error handling with more specific error messages
4. Consider adding database indices for frequently queried fields

### Overall Assessment
The code implementation is mostly aligned with the use case requirements, but there are some gaps in security features and error handling that should be addressed.
      `;
      
      setComparisonResult(result);
      toast.success('Comparison completed');
    }, 2000);
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Code Comparison</h1>
      <p className="text-muted-foreground mb-6">
        Compare code implementations against use case requirements
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Left Panel */}
        <Card className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Panel Type</label>
            <Select 
              value={leftPanelType} 
              onValueChange={(value) => setLeftPanelType(value as 'usecase' | 'code')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select panel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usecase">Use Case</SelectItem>
                <SelectItem value="code">Code</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-accent transition-colors">
            <input 
              type="file" 
              id="left-file-upload" 
              className="hidden" 
              onChange={handleLeftFileUpload} 
              accept={leftPanelType === 'usecase' ? '.txt,.md,.doc,.docx' : '.js,.jsx,.ts,.tsx,.py,.java,.cs'}
            />
            <label htmlFor="left-file-upload" className="cursor-pointer">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-base font-medium mb-1">
                Upload {leftPanelType === 'usecase' ? 'Use Case' : 'Code'} File
              </p>
              <p className="text-xs text-muted-foreground">
                {leftPanelType === 'usecase' 
                  ? 'Upload use case document (.txt, .md, .doc, .docx)' 
                  : 'Upload code file (.js, .jsx, .ts, .tsx, .py, .java, .cs)'}
              </p>
            </label>
          </div>
          
          {leftFileUploaded && (
            <div className="mt-4 bg-secondary p-3 rounded-md">
              <div className="flex items-center">
                <FileCode className="h-5 w-5 mr-2 text-accent" />
                <span className="text-sm">
                  {leftPanelType === 'usecase' ? 'requirements.txt' : 'UserController.ts'} uploaded
                </span>
              </div>
            </div>
          )}
        </Card>
        
        {/* Right Panel */}
        <Card className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Panel Type</label>
            <Select 
              value={rightPanelType} 
              onValueChange={(value) => setRightPanelType(value as 'usecase' | 'code')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select panel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usecase">Use Case</SelectItem>
                <SelectItem value="code">Code</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-accent transition-colors">
            <input 
              type="file" 
              id="right-file-upload" 
              className="hidden" 
              onChange={handleRightFileUpload} 
              accept={rightPanelType === 'usecase' ? '.txt,.md,.doc,.docx' : '.js,.jsx,.ts,.tsx,.py,.java,.cs'}
            />
            <label htmlFor="right-file-upload" className="cursor-pointer">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-base font-medium mb-1">
                Upload {rightPanelType === 'usecase' ? 'Use Case' : 'Code'} File
              </p>
              <p className="text-xs text-muted-foreground">
                {rightPanelType === 'usecase' 
                  ? 'Upload use case document (.txt, .md, .doc, .docx)' 
                  : 'Upload code file (.js, .jsx, .ts, .tsx, .py, .java, .cs)'}
              </p>
            </label>
          </div>
          
          {rightFileUploaded && (
            <div className="mt-4 bg-secondary p-3 rounded-md">
              <div className="flex items-center">
                <FileCode className="h-5 w-5 mr-2 text-accent" />
                <span className="text-sm">
                  {rightPanelType === 'usecase' ? 'requirements.txt' : 'UserController.ts'} uploaded
                </span>
              </div>
            </div>
          )}
        </Card>
      </div>
      
      <div className="flex justify-center mb-8">
        <Button 
          size="lg" 
          onClick={handleCompare}
          disabled={!leftFileUploaded || !rightFileUploaded}
        >
          Compare Files
        </Button>
      </div>
      
      {comparisonResult && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Comparison Results</h2>
          <div className="bg-secondary p-4 rounded-md overflow-auto">
            <div className="prose prose-invert max-w-none">
              {comparisonResult.split('\n').map((line, index) => {
                if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-xl font-bold mt-4 mb-2">{line.replace('## ', '')}</h2>;
                } else if (line.startsWith('### ')) {
                  return <h3 key={index} className="text-lg font-semibold mt-3 mb-2">{line.replace('### ', '')}</h3>;
                } else if (line.startsWith('- ')) {
                  return <div key={index} className="flex items-start mb-1">
                    <span className="mr-2">•</span>
                    <span>{line.replace('- ', '')}</span>
                  </div>;
                } else if (line.match(/^\d+\. /)) {
                  const num = line.match(/^\d+/)?.[0];
                  const text = line.replace(/^\d+\. /, '');
                  return <div key={index} className="flex items-start mb-1">
                    <span className="mr-2 font-medium">{num}.</span>
                    <span>{text}</span>
                  </div>;
                } else if (line.trim() === '') {
                  return <div key={index} className="h-4"></div>;
                } else {
                  return <p key={index} className="mb-2">{line}</p>;
                }
              })}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CodeComparison;
