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
  // Simulación de llamada a la API
  return new Promise((resolve) => {
    setTimeout(() => {
      if (industry in DATA) {
        resolve(DATA[industry]);
      } else {
        console.warn(`No hay datos para la industria: ${industry}, usando retail por defecto`);
        resolve(DATA.retail);
      }
    }, 800);
  });
};

// Definición de campos para plantillas Excel
export interface ExcelField {
  name: string;
  description: string;
  example: string;
  required?: boolean;
  type?: string;
}

// Estructura del template Excel por industria e tipo de modelo
interface ExcelTemplate {
  fileName: string;
  description: string;
  fields: ExcelField[];
}

const EXCEL_TEMPLATES: Record<string, Record<string, ExcelTemplate>> = {
  retail: {
    general: {
      fileName: "Plantilla_Retail_General.xlsx",
      description: "Template estándar para análisis de datos de retail",
      fields: [
        { name: "Fecha", description: "Fecha de la venta (YYYY-MM-DD)", example: "2025-01-15", required: true, type: "date" },
        { name: "Producto", description: "Nombre del producto", example: "Camiseta básica", required: true, type: "string" },
        { name: "Categoria", description: "Categoría del producto", example: "Ropa", required: true, type: "string" },
        { name: "Cantidad", description: "Cantidad vendida", example: "5", required: true, type: "number" },
        { name: "Precio_Unitario", description: "Precio por unidad", example: "29.99", required: true, type: "number" },
        { name: "Total", description: "Valor total de la venta", example: "149.95", required: true, type: "number" },
        { name: "Tienda", description: "Identificador de la tienda", example: "T001", required: true, type: "string" },
        { name: "Cliente_ID", description: "ID del cliente (opcional)", example: "C12345", required: false, type: "string" }
      ]
    },
    sarima: {
      fileName: "Plantilla_Retail_SARIMA.xlsx",
      description: "Template para análisis de series temporales con SARIMA",
      fields: [
        { name: "Fecha", description: "Fecha de la observación (YYYY-MM-DD)", example: "2025-01-15", required: true, type: "date" },
        { name: "Ventas", description: "Valor de ventas", example: "12500", required: true, type: "number" },
        { name: "Periodo_Estacional", description: "Período estacional (7=semanal, 12=mensual, etc)", example: "12", required: true, type: "number" },
        { name: "Promocion", description: "Indicador de promoción (1=Sí, 0=No)", example: "1", required: false, type: "binary" },
        { name: "Evento_Especial", description: "Descripción de evento especial", example: "Black Friday", required: false, type: "string" }
      ]
    },
    arima: {
      fileName: "Plantilla_Retail_ARIMA.xlsx",
      description: "Template para análisis de series temporales con ARIMA",
      fields: [
        { name: "Fecha", description: "Fecha del registro (YYYY-MM-DD)", example: "2025-01-15", required: true, type: "date" },
        { name: "Valor", description: "Valor de la serie temporal", example: "12500", required: true, type: "number" },
        { name: "Diferenciacion", description: "Orden de diferenciación sugerido (opcional)", example: "1", required: false, type: "number" },
        { name: "AutoCorr", description: "Valor de autocorrelación (opcional)", example: "0.75", required: false, type: "number" }
      ]
    },
    prophet: {
      fileName: "Plantilla_Retail_Prophet.xlsx",
      description: "Template para pronósticos con Prophet",
      fields: [
        { name: "ds", description: "Fecha (YYYY-MM-DD) - Formato requerido por Prophet", example: "2025-01-15", required: true, type: "date" },
        { name: "y", description: "Valor a pronosticar - Formato requerido por Prophet", example: "12500", required: true, type: "number" },
        { name: "evento", description: "Nombre del evento especial", example: "Black Friday", required: false, type: "string" },
        { name: "promocion", description: "Factor promocional (opcional)", example: "1.5", required: false, type: "number" }
      ]
    },
    kmeans: {
      fileName: "Plantilla_Retail_Kmeans.xlsx",
      description: "Template para segmentación con K-means",
      fields: [
        { name: "Cliente_ID", description: "Identificador del cliente", example: "C1001", required: true, type: "string" },
        { name: "Frec_Compra", description: "Frecuencia de compra (días)", example: "15", required: true, type: "number" },
        { name: "Gasto_Promedio", description: "Gasto promedio por compra", example: "125.50", required: true, type: "number" },
        { name: "Ultima_Compra", description: "Días desde última compra", example: "7", required: true, type: "number" },
        { name: "Antiguedad", description: "Días como cliente", example: "365", required: true, type: "number" },
        { name: "Num_Clusters", description: "Número sugerido de clusters", example: "4", required: false, type: "number" }
      ]
    },
    randomForest: {
      fileName: "Plantilla_Retail_RandomForest.xlsx",
      description: "Template para análisis con Random Forest",
      fields: [
        { name: "Cliente_ID", description: "Identificador del cliente", example: "C1001", required: true, type: "string" },
        { name: "Edad", description: "Edad del cliente", example: "35", required: true, type: "number" },
        { name: "Genero", description: "Género del cliente", example: "F", required: true, type: "string" },
        { name: "Antiguedad", description: "Años como cliente", example: "3.5", required: true, type: "number" },
        { name: "Compras_Ultimas", description: "Número de compras en últimos 6 meses", example: "12", required: true, type: "number" },
        { name: "Gasto_Total", description: "Gasto total en últimos 6 meses", example: "1580", required: true, type: "number" },
        { name: "Devolucion", description: "Ha realizado devoluciones (1=Sí, 0=No)", example: "0", required: true, type: "binary" },
        { name: "Objetivo", description: "Variable objetivo a predecir", example: "1", required: true, type: "target" }
      ]
    },
    xgboost: {
      fileName: "Plantilla_Retail_XGBoost.xlsx",
      description: "Template para análisis con XGBoost",
      fields: [
        { name: "Cliente_ID", description: "Identificador del cliente", example: "C1001", required: true, type: "string" },
        { name: "Caracteristica_1", description: "Primera característica", example: "35", required: true, type: "number" },
        { name: "Caracteristica_2", description: "Segunda característica", example: "12", required: true, type: "number" },
        { name: "Caracteristica_3", description: "Tercera característica", example: "1580", required: true, type: "number" },
        { name: "Objetivo", description: "Variable objetivo a predecir", example: "1", required: true, type: "target" },
        { name: "Tipo_Objetivo", description: "Clasificación binaria, multiclase o regresión", example: "binario", required: true, type: "string" }
      ]
    },
    lstm: {
      fileName: "Plantilla_Retail_LSTM.xlsx",
      description: "Template para análisis con redes LSTM",
      fields: [
        { name: "Fecha", description: "Fecha de la observación (secuencial)", example: "2025-01-15", required: true, type: "date" },
        { name: "Variable_1", description: "Primera variable secuencial", example: "1250", required: true, type: "number" },
        { name: "Variable_2", description: "Segunda variable secuencial", example: "350", required: false, type: "number" },
        { name: "Variable_3", description: "Tercera variable secuencial", example: "45", required: false, type: "number" },
        { name: "Ventana", description: "Tamaño de ventana para análisis", example: "30", required: true, type: "number" },
        { name: "Horizonte", description: "Horizonte de predicción", example: "7", required: true, type: "number" }
      ]
    },
    svm: {
      fileName: "Plantilla_Retail_SVM.xlsx",
      description: "Template para clasificación con SVM",
      fields: [
        { name: "ID", description: "Identificador de la observación", example: "1001", required: true, type: "string" },
        { name: "Atributo_1", description: "Primer atributo", example: "25.5", required: true, type: "number" },
        { name: "Atributo_2", description: "Segundo atributo", example: "12.3", required: true, type: "number" },
        { name: "Atributo_3", description: "Tercer atributo", example: "7", required: true, type: "number" },
        { name: "Clase", description: "Etiqueta de clase", example: "A", required: true, type: "target" },
        { name: "Kernel", description: "Tipo de kernel (rbf, linear, poly)", example: "rbf", required: false, type: "string" }
      ]
    },
    anova: {
      fileName: "Plantilla_Retail_ANOVA.xlsx",
      description: "Template para análisis ANOVA",
      fields: [
        { name: "ID", description: "Identificador de la observación", example: "E001", required: true, type: "string" },
        { name: "Grupo", description: "Grupo o categoría", example: "Grupo_A", required: true, type: "string" },
        { name: "Valor", description: "Valor observado", example: "85.2", required: true, type: "number" },
        { name: "Factor_1", description: "Primer factor", example: "Ubicación", required: false, type: "string" },
        { name: "Factor_2", description: "Segundo factor", example: "Temporada", required: false, type: "string" },
        { name: "Nivel_Significancia", description: "Nivel de significancia", example: "0.05", required: false, type: "number" }
      ]
    }
  },
  finanzas: {
    general: {
      fileName: "Plantilla_Finanzas_DataViz.xlsx",
      description: "Template estándar para análisis de datos financieros",
      fields: [
        { name: "Fecha", description: "Fecha de la transacción", example: "2025-01-15", required: true, type: "date" },
        { name: "Cliente_ID", description: "Identificador del cliente", example: "C2001", required: true },
        { name: "Tipo_Transaccion", description: "Tipo de transacción", example: "Depósito", required: true },
        { name: "Producto", description: "Producto financiero", example: "Cuenta Corriente", required: true },
        { name: "Monto", description: "Monto de la transacción", example: "5000", required: true, type: "number" },
        { name: "Canal", description: "Canal de la transacción", example: "Móvil", required: true },
        { name: "Sucursal_ID", description: "ID de la sucursal (si aplica)", example: "S105", required: false },
        { name: "Empleado_ID", description: "Identificador del empleado (si aplica)", example: "E082", required: false },
        { name: "Comision", description: "Comisión generada", example: "25.50", required: false, type: "number" },
        { name: "Margen", description: "Margen de beneficio (%)", example: "2.5", required: false, type: "Porcentaje" },
        { name: "Costo_Operacion", description: "Costo operativo de la transacción", example: "1.25", required: false, type: "Moneda" },
        { name: "Moneda", description: "Moneda de la transacción", example: "EUR", required: false },
        { name: "Conversion_Tasa", description: "Tasa de conversión (si aplica)", example: "1.05", required: false, type: "Número" }
      ]
    },
    sarima: {
      fileName: "Plantilla_Finanzas_SARIMA.xlsx",
      description: "Template para análisis de series temporales financieras",
      fields: [
        { name: "Fecha", description: "Fecha del registro (YYYY-MM-DD)", example: "2025-01-15", required: true, type: "date" },
        { name: "Valor_Activo", description: "Valor del activo/índice", example: "1250.75", required: true, type: "number" },
        { name: "Volumen", description: "Volumen de transacciones", example: "1500000", required: false, type: "number" },
        { name: "Volatilidad", description: "Volatilidad del período", example: "0.025", required: false, type: "number" },
        { name: "Tasa_Interes", description: "Tasa de interés de referencia", example: "0.0275", required: false, type: "number" },
        { name: "Spread", description: "Diferencial de rendimiento", example: "0.0125", required: false, type: "number" },
        { name: "Apertura", description: "Valor de apertura", example: "1248.50", required: false, type: "number" },
        { name: "Cierre", description: "Valor de cierre", example: "1252.25", required: false, type: "number" },
        { name: "Maximo", description: "Valor máximo del período", example: "1255.75", required: false, type: "number" },
        { name: "Minimo", description: "Valor mínimo del período", example: "1245.25", required: false, type: "number" }
      ]
    },
    prophet: {
      fileName: "Plantilla_Finanzas_Prophet.xlsx",
      description: "Template para predicción de indicadores financieros",
      fields: [
        { name: "ds", description: "Fecha (YYYY-MM-DD) - Formato requerido por Prophet", example: "2025-01-15", required: true, type: "date" },
        { name: "y", description: "Valor a predecir - Formato requerido por Prophet", example: "1250.75", required: true, type: "number" },
        { name: "cap", description: "Límite superior (opcional)", example: "2000", required: false, type: "number" },
        { name: "floor", description: "Límite inferior (opcional)", example: "800", required: false, type: "number" },
        { name: "Activo", description: "Identificador del activo", example: "EURUSD", required: false },
        { name: "Mercado", description: "Mercado del activo", example: "Forex", required: false }
      ]
    },
    kmeans: {
      fileName: "Plantilla_Finanzas_Kmeans.xlsx",
      description: "Template para segmentación de clientes financieros",
      fields: [
        { name: "Cliente_ID", description: "Identificador del cliente", example: "C2001", required: true, type: "string" },
        { name: "Edad", description: "Edad del cliente", example: "42", required: true, type: "number" },
        { name: "Ingresos", description: "Ingresos mensuales", example: "7500", required: true, type: "Moneda" },
        { name: "Valor_Activos", description: "Valor total activos", example: "350000", required: true, type: "Moneda" },
        { name: "Pasivos", description: "Total pasivos", example: "120000", required: true, type: "Moneda" },
        { name: "Riesgo_Credito", description: "Puntuación de riesgo", example: "720", required: true, type: "Número" },
        { name: "Antiguedad", description: "Años como cliente", example: "8.5", required: true, type: "number" },
        { name: "Productos", description: "Número de productos", example: "5", required: true, type: "number" },
        { name: "Transacciones_Mens", description: "Transacciones mensuales", example: "35", required: true, type: "number" },
        { name: "Rentabilidad", description: "Rentabilidad anual (%)", example: "8.5", required: false, type: "Porcentaje" },
        { name: "Saldo_Promedio", description: "Saldo promedio", example: "15000", required: false, type: "Moneda" },
        { name: "Inversiones_Pct", description: "% de cartera en inversiones", example: "45", required: false, type: "Porcentaje" },
        { name: "Seguros_Num", description: "Número de seguros", example: "2", required: false, type: "Número" },
        { name: "Creditos_Num", description: "Número de créditos activos", example: "1", required: false, type: "Número" },
        { name: "Digital_Uso", description: "% uso de canales digitales", example: "85", required: false, type: "Porcentaje" },
        { name: "Reclamaciones", description: "Número de reclamaciones", example: "0", required: false, type: "Número" },
        { name: "NPS", description: "Net Promoter Score", example: "9", required: false, type: "Número" }
      ]
    }
  },
  // Definir templates para otras industrias siguiendo el mismo patrón
};

// Función para obtener una plantilla Excel para una industria específica
export const getExcelTemplate = (industry: string, type = 'general'): string => {
  if (industry in EXCEL_TEMPLATES && type in EXCEL_TEMPLATES[industry]) {
    return EXCEL_TEMPLATES[industry][type].fileName;
  } else {
    console.info(`Plantilla tipo ${type} no encontrada para ${industry}, usando general`);
    
    // Si no existe el tipo específico pero sí la industria, usar el general de esa industria
    if (industry in EXCEL_TEMPLATES && 'general' in EXCEL_TEMPLATES[industry]) {
      return EXCEL_TEMPLATES[industry].general.fileName;
    }
    
    // Si no existe ni la industria ni el tipo, usar el general de retail
    return EXCEL_TEMPLATES.retail.general.fileName;
  }
};

export const getExcelFields = (industry: string, type = 'general'): ExcelField[] | null => {
  if (industry in EXCEL_TEMPLATES && type in EXCEL_TEMPLATES[industry]) {
    return EXCEL_TEMPLATES[industry][type].fields;
  } else {
    console.info(`Campos para plantilla tipo ${type} no encontrados para ${industry}, usando general`);
    
    // Si no existe el tipo específico pero sí la industria, usar el general de esa industria
    if (industry in EXCEL_TEMPLATES && 'general' in EXCEL_TEMPLATES[industry]) {
      return EXCEL_TEMPLATES[industry].general.fields;
    }
    
    // Si no existe ni la industria ni el tipo, usar el general de retail
    return EXCEL_TEMPLATES.retail.general.fields;
  }
};

// Función para formatear números para su visualización
export const formatNumber = (value: number): string => {
  // Si es mayor a 1000, formatea con separadores de miles
  if (Math.abs(value) >= 1000) {
    return new Intl.NumberFormat('es-ES').format(value);
  }
  
  // Si tiene decimales, muestra solo 2 decimales
  if (value % 1 !== 0) {
    return value.toFixed(2);
  }
  
  // Caso base: devuelve el número como cadena
  return value.toString();
};
