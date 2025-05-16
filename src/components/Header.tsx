
import React from 'react';
import { Code, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Switch } from './ui/switch';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-card border-b border-border p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center space-x-2">
        <Code className="h-6 w-6 text-blue-500" />
        <h1 className="font-bold text-xl text-foreground">EDP Code Gen</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground hidden sm:block">AI-Powered Code Generation</div>
        <div className="flex items-center space-x-2">
          <Sun className={`h-4 w-4 ${theme === 'light' ? 'text-blue-500' : 'text-muted-foreground'}`} />
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
            aria-label="Toggle theme"
          />
          <Moon className={`h-4 w-4 ${theme === 'dark' ? 'text-blue-500' : 'text-muted-foreground'}`} />
        </div>
      </div>
    </header>
  );
};

export default Header;
