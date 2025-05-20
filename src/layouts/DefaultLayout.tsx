
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Home, 
  Menu, 
  X, 
  Layers, 
  BrainCog, 
  FileBarChart, 
  User,
  MessageSquare
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationLinks = [
    { name: 'Inicio', path: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Industrias', path: '/industries', icon: <Layers className="h-5 w-5" /> },
    { name: 'Capacidades de Análisis', path: '/analysis-capabilities', icon: <FileBarChart className="h-5 w-5" /> },
    { name: 'Modelos de IA', path: '/ai-models', icon: <BrainCog className="h-5 w-5" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Analytics Platform</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm flex items-center gap-2 hover:text-primary transition-colors ${
                  isActive(link.path) ? 'text-primary font-medium' : 'text-foreground/80'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contacto
            </Button>
            <Button variant="default" size="sm" className="hidden md:flex">
              <User className="h-4 w-4 mr-2" />
              Solicitar Demo
            </Button>
            
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="py-4 border-b">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-6 w-6 text-primary" />
                        <span className="font-bold">Analytics Platform</span>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  
                  <nav className="flex-1 py-6">
                    <ul className="space-y-2">
                      {navigationLinks.map((link) => (
                        <li key={link.path}>
                          <Link
                            to={link.path}
                            className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-muted ${
                              isActive(link.path) ? 'bg-muted font-medium' : ''
                            }`}
                            onClick={() => setIsSheetOpen(false)}
                          >
                            {link.icon}
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  
                  <div className="py-6 border-t space-y-3">
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contacto
                    </Button>
                    <Button variant="default" className="w-full">
                      <User className="h-4 w-4 mr-2" />
                      Solicitar Demo
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t py-6 bg-background">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Analytics Platform</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Inicio</Link>
              <Link to="/industries" className="hover:text-foreground">Industrias</Link>
              <Link to="/analysis-capabilities" className="hover:text-foreground">Capacidades</Link>
              <Link to="/ai-models" className="hover:text-foreground">Modelos</Link>
              <Link to="/contact/general" className="hover:text-foreground">Contacto</Link>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 Analytics Platform. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DefaultLayout;
