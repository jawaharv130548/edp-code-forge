
import React from 'react';
import { Code } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-edp-blue border-b border-border p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Code className="h-6 w-6 text-accent" />
        <h1 className="font-bold text-xl text-foreground">EDP Code Gen</h1>
      </div>
      <div className="text-sm text-muted-foreground">AI-Powered Code Generation</div>
    </header>
  );
};

export default Header;
