import React from 'react';
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, ChevronRight, Users, TrendingUp, BarChart3, FileBarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface IndustryStats {
  [key: string]: {
    title: string;
    growth: string;
    adoption: string;
    roi: string;
    mainBenefit: string;
  };
}

export function IndustryAnalysisOverview() {
  const navigate = useNavigate();
  
  const industryStats: IndustryStats = {
    retail: {
      title: "Retail y E-commerce",
      growth: "+21%",
      adoption: "73%",
      roi: "287%",
      mainBenefit: "Incremento en ventas mediante personalización"
    },
    finanzas: {
      title: "Servicios Financieros",
      growth: "+32%",
      adoption: "81%",
      roi: "342%",
      mainBenefit: "Reducción de riesgos y detección de fraude"
    },
    salud: {
      title: "Sector Salud",
      growth: "+27%",
      adoption: "64%",
      roi: "318%",
      mainBenefit: "Mejora en diagnósticos y resultados clínicos"
    },
    manufactura: {
      title: "Manufactura e Industria",
      growth: "+18%",
      adoption: "69%",
      roi: "253%",
      mainBenefit: "Optimización de producción y mantenimiento"
    },
    turismo: {
      title: "Turismo y Hostelería",
      growth: "+24%",
      adoption: "58%",
      roi: "276%",
      mainBenefit: "Personalización de experiencias y optimización de precios"
    },
    tecnologia: {
      title: "Tecnología y Software",
      growth: "+36%",
      adoption: "86%",
      roi: "392%",
      mainBenefit: "Desarrollo optimizado y mejor experiencia de usuario"
    },
    educacion: {
      title: "Educación y E-learning",
      growth: "+29%",
      adoption: "62%",
      roi: "241%",
      mainBenefit: "Aprendizaje personalizado y mejor retención"
    }
  };

  const handleIndustrySelect = (industry: string) => {
    navigate(`/dashboard/${industry}`);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Soluciones por Industria</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Nuestras soluciones analíticas están diseñadas específicamente para los desafíos y oportunidades de cada sector
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(industryStats).map(([industry, stats]) => (
          <Card key={industry} className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle>{stats.title}</CardTitle>
              <CardDescription>
                Crecimiento anual: <span className="text-green-600 font-medium">{stats.growth}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Adopción</p>
                  <p className="font-medium">{stats.adoption}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">ROI Promedio</p>
                  <p className="font-medium">{stats.roi}</p>
                </div>
              </div>
              <Badge variant="outline" className="w-full justify-center py-1">
                {stats.mainBenefit}
              </Badge>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleIndustrySelect(industry)} 
                className="w-full"
                variant="outline"
              >
                Ver soluciones <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-900/30 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              ROI de Analytics
            </CardTitle>
            <CardDescription className="text-base">
              El impacto financiero mensurable de implementar análisis avanzados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-3 bg-white/80 dark:bg-gray-900/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileBarChart className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Optimización de Inventario</p>
                    <p className="text-sm text-muted-foreground">Retail</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">+287% ROI</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/80 dark:bg-gray-900/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Detección de Fraude</p>
                    <p className="text-sm text-muted-foreground">Finanzas</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">+342% ROI</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/80 dark:bg-gray-900/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Mantenimiento Predictivo</p>
                    <p className="text-sm text-muted-foreground">Manufactura</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">+253% ROI</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <span>Ver calculadora de ROI</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Calculadora de ROI</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-muted-foreground">
                    Nuestra calculadora de ROI te permite estimar el retorno de inversión para tu proyecto de análisis específico. ¡Próximamente!
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/30 dark:to-emerald-900/30 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Users className="h-6 w-6" />
              Casos de Éxito
            </CardTitle>
            <CardDescription className="text-base">
              Empresas que han transformado su operación con nuestras soluciones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative p-4 bg-white/80 dark:bg-gray-900/50 rounded-lg">
              <div className="absolute -top-2 -left-2 bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 text-xs font-medium rounded-full px-2 py-0.5">
                Retail
              </div>
              <p className="mb-2 font-medium pt-2">"Incrementamos ventas en un 32% gracias a la segmentación avanzada"</p>
              <p className="text-sm text-muted-foreground">- Director de Marketing, Cadena Nacional de Tiendas</p>
            </div>
            
            <div className="relative p-4 bg-white/80 dark:bg-gray-900/50 rounded-lg">
              <div className="absolute -top-2 -left-2 bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-medium rounded-full px-2 py-0.5">
                Manufactura
              </div>
              <p className="mb-2 font-medium pt-2">"Redujimos los tiempos de inactividad no planificados en un 78%"</p>
              <p className="text-sm text-muted-foreground">- Jefe de Operaciones, Planta Automotriz</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="gap-2">
              <span>Ver todos los casos de éxito</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
