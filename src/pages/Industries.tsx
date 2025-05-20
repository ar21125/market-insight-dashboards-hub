
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, PieChart, AreaChart, ArrowRight, Leaf, Wind } from "lucide-react";

// Definición de industrias con sus datos relevantes
const industries = [
  {
    id: "retail",
    name: "Retail",
    description: "Análisis de ventas, inventario y comportamiento del consumidor para tiendas físicas y en línea.",
    icon: BarChart,
    charts: ["Ventas por categoría", "Rotación de inventario", "Análisis de lealtad del cliente"],
    color: "bg-blue-100 text-blue-700",
    implementationPath: "/dashboard/retail"
  },
  {
    id: "finanzas",
    name: "Servicios Financieros",
    description: "Seguimiento de indicadores financieros, análisis de riesgo y comportamiento de inversión.",
    icon: PieChart,
    charts: ["Rendimiento de inversiones", "Análisis de riesgo", "Segmentación de clientes"],
    color: "bg-green-100 text-green-700",
    implementationPath: "/dashboard/finanzas"
  },
  {
    id: "salud",
    name: "Salud",
    description: "Seguimiento de pacientes, análisis operacional y métricas básicas para centros médicos.",
    icon: AreaChart,
    charts: ["Ocupación hospitalaria", "Tiempo de espera", "Análisis de tratamientos"],
    color: "bg-red-100 text-red-700",
    implementationPath: "/dashboard/salud"
  },
  {
    id: "manufactura",
    name: "Manufactura",
    description: "Control de producción, eficiencia operativa y gestión de la cadena de suministro.",
    icon: BarChart,
    charts: ["Rendimiento de línea de producción", "Control de calidad", "Inventario y logística"],
    color: "bg-amber-100 text-amber-700",
    implementationPath: "/dashboard/manufactura"
  },
  {
    id: "tecnologia",
    name: "Tecnología",
    description: "Métricas de producto, análisis de uso y rendimiento de aplicaciones.",
    icon: PieChart,
    charts: ["Engagement de usuarios", "Retención", "Conversión y embudo"],
    color: "bg-purple-100 text-purple-700",
    implementationPath: "/dashboard/tecnologia"
  },
  {
    id: "educacion",
    name: "Educación",
    description: "Rendimiento estudiantil, análisis de cursos y métricas administrativas para instituciones educativas.",
    icon: AreaChart,
    charts: ["Rendimiento académico", "Asistencia y retención", "Eficacia de programas"],
    color: "bg-indigo-100 text-indigo-700",
    implementationPath: "/dashboard/educacion"
  },
  {
    id: "agricultura",
    name: "Agricultura",
    description: "Análisis de producción agrícola, optimización de cultivos y monitoreo de condiciones ambientales.",
    icon: Leaf,
    charts: ["Rendimiento de cultivos", "Predicción climática", "Uso de recursos"],
    color: "bg-green-100 text-green-700",
    implementationPath: "/implementation/agricultura"
  },
  {
    id: "energia",
    name: "Energía",
    description: "Análisis de consumo energético, predicción de demanda y optimización de recursos renovables.",
    icon: Wind,
    charts: ["Predicción de demanda", "Eficiencia energética", "Análisis de producción renovable"],
    color: "bg-blue-100 text-blue-700",
    implementationPath: "/implementation/energia"
  }
];

const Industries = () => {
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
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-10 px-6">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Seleccione su industria</h1>
            <p className="text-lg text-muted-foreground">
              Elija el sector que mejor se adapte a su organización para acceder a dashboards y plantillas especializadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <Card key={industry.id} className="card-hover overflow-hidden">
                <CardHeader>
                  <div className={`p-2 rounded-md w-fit mb-4 ${industry.color}`}>
                    <industry.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl">{industry.name}</CardTitle>
                  <CardDescription>{industry.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-2">Gráficos comunes:</h4>
                  <ul className="space-y-1 list-disc list-inside text-sm text-muted-foreground">
                    {industry.charts.map((chart, index) => (
                      <li key={index}>{chart}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to={industry.implementationPath} className="flex items-center justify-center gap-2">
                      Ver análisis
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
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

export default Industries;
