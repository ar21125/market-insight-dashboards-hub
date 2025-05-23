
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { AIModelCatalog } from '@/components/AIModelCatalog';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  Brain, 
  School, 
  BarChart3, 
  Database, 
  Factory, 
  Building, 
  Store, 
  Wallet, 
  FlaskConical, 
  LineChart
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function AIModelsPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  
  const industries = [
    { id: "retail", name: "Retail", icon: Store },
    { id: "finanzas", name: "Finanzas", icon: Wallet },
    { id: "salud", name: "Salud", icon: FlaskConical },
    { id: "manufactura", name: "Manufactura", icon: Factory },
    { id: "tecnologia", name: "Tecnología", icon: Brain },
    { id: "educacion", name: "Educación", icon: School },
    { id: "agricultura", name: "Agricultura", icon: Building },
    { id: "energia", name: "Energía", icon: Database }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link to="/"><ChevronLeft className="h-4 w-4 mr-2" /> Volver</Link>
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Catálogo de Modelos IA
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Explore nuestro catálogo de modelos de inteligencia artificial y análisis avanzado
            </p>
          </div>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Filtrar por Industria</h2>
          <Tabs defaultValue="all" value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <TabsList className="mb-8">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Todas</span>
              </TabsTrigger>
              {industries.map((industry) => (
                <TabsTrigger 
                  key={industry.id} 
                  value={industry.id}
                  className="flex items-center gap-2"
                >
                  <industry.icon className="h-4 w-4" />
                  <span>{industry.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={selectedIndustry} className="mt-0">
              <AIModelCatalog 
                industry={selectedIndustry === 'all' ? undefined : selectedIndustry}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-16 p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">¿Necesita un Modelo Personalizado?</h2>
          <p className="text-lg mb-6">
            Nuestra plataforma ofrece servicios de consultoría para desarrollar soluciones analíticas adaptadas a sus necesidades específicas.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link to="/analysis-capabilities">Explorar Capacidades Analíticas</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/industries">Ver Soluciones por Industria</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
