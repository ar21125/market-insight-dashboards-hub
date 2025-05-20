
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnalysisCapabilities } from '@/components/AnalysisCapabilities';
import { IndustryAnalysisOverview } from '@/components/IndustryAnalysisOverview';
import { ArrowRight, BarChart3, Boxes, Brain, FileBarChart2, Globe, LineChart } from "lucide-react";
import { MCPRecommendations } from '@/components/MCPRecommendations';

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-indigo-50 via-white to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950 pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Plataforma de Análisis Avanzado e Inteligencia Artificial
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Transforma tus datos en decisiones estratégicas y ventajas competitivas con nuestra plataforma integrada de análisis e IA
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" asChild>
              <Link to="/industries">Comenzar análisis</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/analysis-capabilities">Explorar capacidades</Link>
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {[
              { icon: BarChart3, label: "Análisis Predictivo" },
              { icon: Brain, label: "IA Avanzada" },
              { icon: LineChart, label: "Forecasting" },
              { icon: FileBarChart2, label: "Visualización" },
              { icon: Boxes, label: "Clustering" },
              { icon: Globe, label: "Análisis Geoespacial" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center p-3">
                <div className="bg-primary/10 p-3 rounded-full mb-2">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-center">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Industries Overview Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <IndustryAnalysisOverview />
      </section>
      
      {/* Analysis Capabilities Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Soluciones Analíticas de Vanguardia</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-3">
              Descubre cómo nuestras capacidades avanzadas de análisis pueden transformar tu negocio
            </p>
          </div>
          
          <div className="mb-8">
            <AnalysisCapabilities industries={['retail', 'finanzas', 'manufactura']} />
          </div>
          
          <div className="text-center mt-8">
            <Button asChild size="lg" className="gap-2">
              <Link to="/analysis-capabilities">
                Ver todas las capacidades <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Integration Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Integración Empresarial</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-3">
              Integra fácilmente los resultados de análisis con tus herramientas de negocio
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <MCPRecommendations modelType="Análisis Predictivo" />
            
            <div className="lg:col-span-2">
              <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-4">Ecosistema de integración</h3>
                <p className="text-muted-foreground mb-6">
                  Nuestra plataforma se integra con las herramientas de negocio más populares para que puedas aprovechar al máximo tus datos e insights.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {["Excel", "Power BI", "Tableau", "Google Sheets", "Looker", "R Studio"].map((tool, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                        {tool.charAt(0)}
                      </div>
                      <span>{tool}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <Button className="w-full">Ver detalles de integración</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Comienza ahora tu viaje analítico
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Transforma tus datos en insights valiosos y ventajas competitivas con nuestra plataforma integrada
          </p>
          <Button size="lg" asChild>
            <Link to="/industries">Comenzar análisis</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
