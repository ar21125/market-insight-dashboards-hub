
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  BarChart, 
  BrainCog
} from 'lucide-react';
import DefaultLayout from '@/layouts/DefaultLayout';
import { IndustryAnalysisOverview } from '@/components/IndustryAnalysisOverview';

const Index = () => {
  return (
    <DefaultLayout>
      <section className="hero bg-muted py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Impulsa tu negocio con análisis de datos
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Descubre insights valiosos y toma decisiones informadas con nuestra plataforma de análisis.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild>
              <Link to="/analysis-capabilities" className="flex items-center gap-2">
                Explorar capacidades <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/ai-models" className="flex items-center gap-2">
                Modelos de IA <BrainCog className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <IndustryAnalysisOverview />
      </section>

      <section className="bg-secondary py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Listo para transformar tus datos en resultados?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Comienza hoy mismo y descubre el poder del análisis de datos para tu empresa.
          </p>
          <Button size="lg" asChild>
            <Link to="/industries" className="flex items-center gap-2">
              Seleccionar industria <BarChart className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Index;
