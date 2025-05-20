
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BarChart, Mail, Phone, ArrowLeft, Send } from 'lucide-react';
import { toast } from "sonner";

const ContactPage = () => {
  const { industry } = useParams<{ industry: string }>();
  
  const industryNames: Record<string, string> = {
    agricultura: "Agricultura",
    energia: "Energía",
    retail: "Retail",
    finanzas: "Servicios Financieros",
    salud: "Salud",
    manufactura: "Manufactura",
    tecnologia: "Tecnología",
    educacion: "Educación"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Solicitud enviada correctamente. Nos pondremos en contacto pronto.");
  };

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
      <main className="flex-grow py-10 px-6">
        <div className="container mx-auto max-w-4xl">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link to="/industries" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver a industrias
            </Link>
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Solicitar demostración</CardTitle>
                <CardDescription>
                  {industry ? `Complete el formulario para solicitar una demostración personalizada para ${industryNames[industry]}` : 'Complete el formulario para solicitar una demostración personalizada'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input id="name" placeholder="Juan Pérez" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input id="company" placeholder="Su empresa" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input id="email" type="email" placeholder="correo@empresa.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" placeholder="+34 600 000 000" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Cuéntenos más sobre sus necesidades específicas..." 
                      rows={4} 
                      required
                      defaultValue={industry ? `Estoy interesado en una demostración para soluciones de ${industryNames[industry]}.` : ''}
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" onClick={handleSubmit}>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar solicitud
                </Button>
              </CardFooter>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información de contacto</CardTitle>
                  <CardDescription>Otras vías para ponerse en contacto con nosotros</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Correo electrónico</h4>
                      <p className="text-sm text-muted-foreground">contacto@datavizpro.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Teléfono</h4>
                      <p className="text-sm text-muted-foreground">+34 900 123 456</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                <CardContent className="pt-6">
                  <h3 className="font-medium text-lg mb-2">¿Por qué solicitar una demostración?</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Solución personalizada a sus necesidades específicas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Análisis detallado del ROI esperado para su caso</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Resolución de dudas por parte de nuestros expertos</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 px-6 border-t mt-auto">
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

export default ContactPage;
