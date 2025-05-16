
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code, FileCode, Home, FileUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon, active }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all",
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="bg-sidebar h-full w-64 p-4 border-r border-border flex flex-col overflow-y-auto">
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-4 mt-4">Navigation</div>
      <nav className="space-y-2 flex-1 flex flex-col justify-center">
        <NavItem
          to="/"
          label="Quick Launch"
          icon={<Home className="h-5 w-5" />}
          active={currentPath === '/'}
        />
        <NavItem
          to="/code-generation"
          label="Code Generation"
          icon={<Code className="h-5 w-5" />}
          active={currentPath === '/code-generation'}
        />
        <NavItem
          to="/code-comparison"
          label="Code Comparison"
          icon={<FileCode className="h-5 w-5" />}
          active={currentPath === '/code-comparison'}
        />
        <NavItem
          to="/usecase-generation"
          label="Use Case Generation"
          icon={<FileUp className="h-5 w-5" />}
          active={currentPath === '/usecase-generation'}
        />
      </nav>
      <div className="mt-auto text-xs text-muted-foreground">
        <div className="border-t border-border pt-4 mt-4">
          <p>EDP Code Gen v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
