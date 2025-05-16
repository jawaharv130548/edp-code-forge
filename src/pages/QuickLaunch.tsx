
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, FileCode, FileUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const QuickLaunch: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Welcome to EDP Code Gen</h1>
      <p className="text-muted-foreground mb-8">
        Generate and analyze code with the power of AI. Choose an option below to get started.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border border-border hover:border-accent transition-colors cursor-pointer" onClick={() => navigate('/code-generation')}>
          <CardHeader className="pb-2">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
              <Code className="text-accent h-6 w-6" />
            </div>
            <CardTitle>Code Generation</CardTitle>
            <CardDescription>
              Generate code from use cases and design specifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
              <li>Upload specification documents</li>
              <li>Generate frontend or backend code</li>
              <li>Edit and regenerate code as needed</li>
            </ul>
            <Button className="w-full" onClick={() => navigate('/code-generation')}>
              Launch Code Generation
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-border hover:border-accent transition-colors cursor-pointer" onClick={() => navigate('/code-comparison')}>
          <CardHeader className="pb-2">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
              <FileCode className="text-accent h-6 w-6" />
            </div>
            <CardTitle>Code Comparison</CardTitle>
            <CardDescription>
              Compare generated code against use cases and requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
              <li>Upload use cases and code files</li>
              <li>AI-powered comparison and analysis</li>
              <li>View detailed differences and suggestions</li>
            </ul>
            <Button className="w-full" onClick={() => navigate('/code-comparison')}>
              Launch Code Comparison
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-border hover:border-accent transition-colors cursor-pointer" onClick={() => navigate('/usecase-generation')}>
          <CardHeader className="pb-2">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
              <FileUp className="text-accent h-6 w-6" />
            </div>
            <CardTitle>Use Case Generation</CardTitle>
            <CardDescription>
              Generate use cases from existing code files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
              <li>Upload .NET code files</li>
              <li>Extract functionalities and specifications</li>
              <li>Generate detailed use case documentation</li>
            </ul>
            <Button className="w-full" onClick={() => navigate('/usecase-generation')}>
              Launch Use Case Generation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickLaunch;
