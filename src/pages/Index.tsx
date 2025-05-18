
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BarChart, AreaChart, PieChart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-white border-b">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-primary">DataViz Pro</h1>
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
                <a href="#features" className="font-medium">Características</a>
              </li>
            </ul>
          </nav>
          <Button asChild>
            <Link to="/industries">Comenzar</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="gradient-bg py-20 px-6 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Analítica de datos especializada por industria</h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Transforme sus datos en insights accionables con paneles personalizados para su sector.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild variant="default" className="bg-white text-primary hover:bg-gray-100">
              <Link to="/industries">Ver industrias</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <a href="#features">Saber más</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Características principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <BarChart className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Dashboards por industria</h3>
                <p className="text-muted-foreground">
                  Dashboards personalizados según las métricas más importantes para su sector específico.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <AreaChart className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Plantillas descargables</h3>
                <p className="text-muted-foreground">
                  Plantillas Excel listas para usar que facilitan la captura y organización de sus datos.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <PieChart className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Integración con API</h3>
                <p className="text-muted-foreground">
                  API backend en FastAPI para procesar sus datos y generar visualizaciones dinámicas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para empezar?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Seleccione su industria y comience a visualizar sus datos con nuestras plantillas especializadas.
          </p>
          <Button size="lg" asChild>
            <Link to="/industries">Explorar industrias</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 px-6 border-t mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BarChart className="h-5 w-5 text-primary" />
              <span className="font-bold text-lg">DataViz Pro</span>
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

export default Index;
