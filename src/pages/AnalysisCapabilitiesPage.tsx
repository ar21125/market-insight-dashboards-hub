
import React from 'react';
import { AnalysisCapabilities } from '@/components/AnalysisCapabilities';

export default function AnalysisCapabilitiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 pt-16 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Plataforma de Análisis e IA
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Soluciones analíticas avanzadas diseñadas para transformar tus datos en ventajas competitivas
          </p>
        </div>
        
        <AnalysisCapabilities />
      </div>
    </div>
  );
}
