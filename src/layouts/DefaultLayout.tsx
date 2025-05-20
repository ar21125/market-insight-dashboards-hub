
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart } from 'lucide-react';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-white border-b">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart className="h-6 w-6 text-primary" />
            <Link to="/" className="text-2xl font-bold text-primary">DataViz Pro</Link>
          </div>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link to="/" className="font-medium">Inicio</Link>
              </li>
              <li>
                <Link to="/industries" className="font-medium">Industrias</Link>
              </li>
              <li>
                <Link to="/analysis-capabilities" className="font-medium">Capacidades</Link>
              </li>
              <li>
                <Link to="/ai-models" className="font-medium">Modelos IA</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 px-6 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BarChart className="h-5 w-5 text-primary" />
              <span className="font-bold">DataViz Pro</span>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} DataViz Pro. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DefaultLayout;
