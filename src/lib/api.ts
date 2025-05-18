// Simulación de API para los propósitos del demo
// En un entorno real, esto se conectaría a una API de backend (FastAPI, etc.)

import { toast } from "sonner";

// Tipos de datos
export interface ChartData {
  name: string;
  value?: number;
  [key: string]: any;
}

export interface IndustryData {
  salesData: ChartData[];
  performanceData: ChartData[];
  distributionData: ChartData[];
  trendsData: ChartData[];
  kpis: {
    [key: string]: {
      value: number;
      change: number;
      label: string;
    }
  }
}

// Datos simulados para diferentes industrias
const DATA: Record<string, IndustryData> = {
  retail: {
    salesData: [
      { name: 'Ene', value: 4000, actual: 4000, previo: 3500 },
      { name: 'Feb', value: 3000, actual: 3000, previo: 2700 },
      { name: 'Mar', value: 2000, actual: 2000, previo: 2200 },
      { name: 'Abr', value: 2780, actual: 2780, previo: 2500 },
      { name: 'May', value: 1890, actual: 1890, previo: 2000 },
      { name: 'Jun', value: 2390, actual: 2390, previo: 2300 },
      { name: 'Jul', value: 3490, actual: 3490, previo: 3200 },
    ],
    performanceData: [
      { name: 'Ene', value: 4000, serie1: 4000, serie2: 2400, serie3: 1200 },
      { name: 'Feb', value: 3000, serie1: 3000, serie2: 1398, serie3: 900 },
      { name: 'Mar', value: 2000, serie1: 2000, serie2: 9800, serie3: 1800 },
      { name: 'Abr', value: 2780, serie1: 2780, serie2: 3908, serie3: 2000 },
      { name: 'May', value: 1890, serie1: 1890, serie2: 4800, serie3: 1500 },
      { name: 'Jun', value: 2390, serie1: 2390, serie2: 3800, serie3: 1700 },
    ],
    distributionData: [
      { name: 'Electrónica', value: 400 },
      { name: 'Ropa', value: 300 },
      { name: 'Alimentos', value: 300 },
      { name: 'Hogar', value: 200 },
      { name: 'Juguetes', value: 100 },
    ],
    trendsData: [
      { name: 'Sem 1', value: 4000 },
      { name: 'Sem 2', value: 3000 },
      { name: 'Sem 3', value: 5000 },
      { name: 'Sem 4', value: 2780 },
      { name: 'Sem 5', value: 3890 },
      { name: 'Sem 6', value: 4490 },
    ],
    kpis: {
      ventas: { value: 1234567, change: 12, label: 'Ventas totales' },
      margen: { value: 23, change: 5, label: 'Margen de beneficio (%)' },
      conversion: { value: 3.2, change: -2, label: 'Tasa de conversión (%)' },
      ticket: { value: 78, change: 8, label: 'Ticket medio' },
    }
  },
  finanzas: {
    salesData: [
      { name: 'Ene', value: 6000, actual: 6000, previo: 5500 },
      { name: 'Feb', value: 5200, actual: 5200, previo: 4700 },
      { name: 'Mar', value: 4500, actual: 4500, previo: 4300 },
      { name: 'Abr', value: 5100, actual: 5100, previo: 5000 },
      { name: 'May', value: 5600, actual: 5600, previo: 5200 },
      { name: 'Jun', value: 5900, actual: 5900, previo: 5700 },
      { name: 'Jul', value: 6200, actual: 6200, previo: 5900 },
    ],
    performanceData: [
      { name: 'Ene', value: 5000, serie1: 5000, serie2: 3400, serie3: 2200 },
      { name: 'Feb', value: 5200, serie1: 5200, serie2: 3600, serie3: 2300 },
      { name: 'Mar', value: 5400, serie1: 5400, serie2: 3800, serie3: 2400 },
      { name: 'Abr', value: 5600, serie1: 5600, serie2: 4000, serie3: 2500 },
      { name: 'May', value: 5800, serie1: 5800, serie2: 4200, serie3: 2600 },
      { name: 'Jun', value: 6000, serie1: 6000, serie2: 4400, serie3: 2700 },
    ],
    distributionData: [
      { name: 'Inversiones', value: 500 },
      { name: 'Préstamos', value: 300 },
      { name: 'Seguros', value: 200 },
      { name: 'Hipotecas', value: 100 },
      { name: 'Otros', value: 50 },
    ],
    trendsData: [
      { name: 'Sem 1', value: 5000 },
      { name: 'Sem 2', value: 5200 },
      { name: 'Sem 3', value: 5400 },
      { name: 'Sem 4', value: 5600 },
      { name: 'Sem 5', value: 5800 },
      { name: 'Sem 6', value: 6000 },
    ],
    kpis: {
      activos: { value: 25600000, change: 8, label: 'Activos totales' },
      roi: { value: 15, change: 3, label: 'ROI (%)' },
      clientes: { value: 12500, change: 10, label: 'Total clientes' },
      adquisicion: { value: 1200, change: 20, label: 'Coste adquisición cliente' },
    }
  },
  // Agregar datos para las demás industrias
  salud: {
    salesData: [
      { name: 'Ene', value: 3200, actual: 3200, previo: 3000 },
      { name: 'Feb', value: 3400, actual: 3400, previo: 3200 },
      { name: 'Mar', value: 3300, actual: 3300, previo: 3100 },
      { name: 'Abr', value: 3500, actual: 3500, previo: 3300 },
      { name: 'May', value: 3700, actual: 3700, previo: 3500 },
      { name: 'Jun', value: 3600, actual: 3600, previo: 3400 },
      { name: 'Jul', value: 3800, actual: 3800, previo: 3600 },
    ],
    performanceData: [
      { name: 'Ene', value: 1000, serie1: 1000, serie2: 800, serie3: 500 },
      { name: 'Feb', value: 1200, serie1: 1200, serie2: 1000, serie3: 600 },
      { name: 'Mar', value: 1100, serie1: 1100, serie2: 900, serie3: 550 },
      { name: 'Abr', value: 1300, serie1: 1300, serie2: 1100, serie3: 650 },
      { name: 'May', value: 1500, serie1: 1500, serie2: 1300, serie3: 750 },
      { name: 'Jun', value: 1400, serie1: 1400, serie2: 1200, serie3: 700 },
    ],
    distributionData: [
      { name: 'Consultas', value: 400 },
      { name: 'Cirugías', value: 300 },
      { name: 'Urgencias', value: 200 },
      { name: 'Pediatría', value: 150 },
      { name: 'Otros', value: 100 },
    ],
    trendsData: [
      { name: 'Sem 1', value: 1000 },
      { name: 'Sem 2', value: 1200 },
      { name: 'Sem 3', value: 1100 },
      { name: 'Sem 4', value: 1300 },
      { name: 'Sem 5', value: 1500 },
      { name: 'Sem 6', value: 1400 },
    ],
    kpis: {
      pacientes: { value: 12500, change: 5, label: 'Pacientes totales' },
      ocupacion: { value: 87, change: 3, label: 'Ocupación (%)' },
      satisfaccion: { value: 4.7, change: 0.2, label: 'Satisfacción (1-5)' },
      espera: { value: 25, change: -5, label: 'Tiempo espera promedio (min)' },
    }
  },
  manufactura: {
    salesData: [
      { name: 'Ene', value: 8000, actual: 8000, previo: 7800 },
      { name: 'Feb', value: 8200, actual: 8200, previo: 8000 },
      { name: 'Mar', value: 8100, actual: 8100, previo: 7900 },
      { name: 'Abr', value: 8300, actual: 8300, previo: 8100 },
      { name: 'May', value: 8500, actual: 8500, previo: 8300 },
      { name: 'Jun', value: 8400, actual: 8400, previo: 8200 },
      { name: 'Jul', value: 8600, actual: 8600, previo: 8400 },
    ],
    performanceData: [
      { name: 'Ene', value: 2000, serie1: 2000, serie2: 1800, serie3: 1500 },
      { name: 'Feb', value: 2200, serie1: 2200, serie2: 2000, serie3: 1700 },
      { name: 'Mar', value: 2100, serie1: 2100, serie2: 1900, serie3: 1600 },
      { name: 'Abr', value: 2300, serie1: 2300, serie2: 2100, serie3: 1800 },
      { name: 'May', value: 2500, serie1: 2500, serie2: 2300, serie3: 2000 },
      { name: 'Jun', value: 2400, serie1: 2400, serie2: 2200, serie3: 1900 },
    ],
    distributionData: [
      { name: 'Producto A', value: 500 },
      { name: 'Producto B', value: 400 },
      { name: 'Producto C', value: 300 },
      { name: 'Producto D', value: 200 },
      { name: 'Otros', value: 100 },
    ],
    trendsData: [
      { name: 'Sem 1', value: 2000 },
      { name: 'Sem 2', value: 2200 },
      { name: 'Sem 3', value: 2100 },
      { name: 'Sem 4', value: 2300 },
      { name: 'Sem 5', value: 2500 },
      { name: 'Sem 6', value: 2400 },
    ],
    kpis: {
      produccion: { value: 25000, change: 4, label: 'Unidades producidas' },
      eficiencia: { value: 92, change: 2, label: 'Eficiencia línea (%)' },
      defectos: { value: 1.2, change: -0.3, label: 'Tasa defectos (%)' },
      tiempo: { value: 18, change: -2, label: 'Tiempo ciclo (min)' },
    }
  },
  tecnologia: {
    salesData: [
      { name: 'Ene', value: 10000, actual: 10000, previo: 9000 },
      { name: 'Feb', value: 11000, actual: 11000, previo: 10000 },
      { name: 'Mar', value: 12000, actual: 12000, previo: 11000 },
      { name: 'Abr', value: 13000, actual: 13000, previo: 12000 },
      { name: 'May', value: 14000, actual: 14000, previo: 13000 },
      { name: 'Jun', value: 15000, actual: 15000, previo: 14000 },
      { name: 'Jul', value: 16000, actual: 16000, previo: 15000 },
    ],
    performanceData: [
      { name: 'Ene', value: 5000, serie1: 5000, serie2: 4000, serie3: 3000 },
      { name: 'Feb', value: 5500, serie1: 5500, serie2: 4500, serie3: 3500 },
      { name: 'Mar', value: 6000, serie1: 6000, serie2: 5000, serie3: 4000 },
      { name: 'Abr', value: 6500, serie1: 6500, serie2: 5500, serie3: 4500 },
      { name: 'May', value: 7000, serie1: 7000, serie2: 6000, serie3: 5000 },
      { name: 'Jun', value: 7500, serie1: 7500, serie2: 6500, serie3: 5500 },
    ],
    distributionData: [
      { name: 'Software', value: 600 },
      { name: 'Hardware', value: 400 },
      { name: 'Servicios', value: 300 },
      { name: 'Cloud', value: 250 },
      { name: 'Otros', value: 150 },
    ],
    trendsData: [
      { name: 'Sem 1', value: 5000 },
      { name: 'Sem 2', value: 5500 },
      { name: 'Sem 3', value: 6000 },
      { name: 'Sem 4', value: 6500 },
      { name: 'Sem 5', value: 7000 },
      { name: 'Sem 6', value: 7500 },
    ],
    kpis: {
      usuarios: { value: 250000, change: 15, label: 'Usuarios activos' },
      retencion: { value: 85, change: 3, label: 'Tasa retención (%)' },
      conversion: { value: 2.8, change: 0.5, label: 'Tasa conversión (%)' },
      churn: { value: 5, change: -1, label: 'Churn rate (%)' },
    }
  },
  educacion: {
    salesData: [
      { name: 'Ene', value: 2000, actual: 2000, previo: 1800 },
      { name: 'Feb', value: 2100, actual: 2100, previo: 1900 },
      { name: 'Mar', value: 2200, actual: 2200, previo: 2000 },
      { name: 'Abr', value: 2300, actual: 2300, previo: 2100 },
      { name: 'May', value: 2400, actual: 2400, previo: 2200 },
      { name: 'Jun', value: 2500, actual: 2500, previo: 2300 },
      { name: 'Jul', value: 2600, actual: 2600, previo: 2400 },
    ],
    performanceData: [
      { name: 'Ene', value: 1000, serie1: 1000, serie2: 800, serie3: 600 },
      { name: 'Feb', value: 1100, serie1: 1100, serie2: 900, serie3: 700 },
      { name: 'Mar', value: 1200, serie1: 1200, serie2: 1000, serie3: 800 },
      { name: 'Abr', value: 1300, serie1: 1300, serie2: 1100, serie3: 900 },
      { name: 'May', value: 1400, serie1: 1400, serie2: 1200, serie3: 1000 },
      { name: 'Jun', value: 1500, serie1: 1500, serie2: 1300, serie3: 1100 },
    ],
    distributionData: [
      { name: 'Pregrado', value: 400 },
      { name: 'Posgrado', value: 300 },
      { name: 'Continua', value: 200 },
      { name: 'Online', value: 150 },
      { name: 'Otros', value: 100 },
    ],
    trendsData: [
      { name: 'Sem 1', value: 1000 },
      { name: 'Sem 2', value: 1100 },
      { name: 'Sem 3', value: 1200 },
      { name: 'Sem 4', value: 1300 },
      { name: 'Sem 5', value: 1400 },
      { name: 'Sem 6', value: 1500 },
    ],
    kpis: {
      estudiantes: { value: 8500, change: 7, label: 'Total estudiantes' },
      retencion: { value: 92, change: 2, label: 'Retención (%)' },
      satisfaccion: { value: 4.5, change: 0.3, label: 'Satisfacción (1-5)' },
      graduacion: { value: 88, change: 3, label: 'Tasa graduación (%)' },
    }
  }
};

// Función para obtener los datos de una industria
export const getIndustryData = async (industry: string): Promise<IndustryData> => {
  // Simulando una llamada a API
  return new Promise((resolve) => {
    setTimeout(() => {
      // Si la industria existe en nuestros datos, devolvemos esos datos
      // Si no, usamos los datos de retail como fallback
      resolve(DATA[industry] || DATA.retail);
    }, 500);
  });
};

// Función para obtener una plantilla Excel para una industria específica
export const getExcelTemplate = (industry: string): string => {
  // En un entorno real, esto generaría un Excel real o devolvería una URL para descarga
  // Para este demo, simplemente retornamos un blob URL simulado
  
  // Notificamos al usuario que se inició la descarga
  toast.success("Descargando plantilla de Excel");
  
  // En una implementación real, aquí se generaría un archivo Excel real
  const templates: Record<string, string> = {
    retail: "Plantilla_Retail_DataViz.xlsx",
    finanzas: "Plantilla_Finanzas_DataViz.xlsx",
    salud: "Plantilla_Salud_DataViz.xlsx",
    manufactura: "Plantilla_Manufactura_DataViz.xlsx",
    tecnologia: "Plantilla_Tecnologia_DataViz.xlsx",
    educacion: "Plantilla_Educacion_DataViz.xlsx",
  };
  
  return templates[industry] || templates.retail;
};

// Función para formatear números para su visualización
export const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)} M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)} K`;
  }
  return value.toString();
};
