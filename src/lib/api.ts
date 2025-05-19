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

// Estructura del template Excel por industria
interface ExcelColumnDefinition {
  name: string;
  description: string;
  example: string;
  required?: boolean;
  format?: string;
}

interface ExcelSheetDefinition {
  name: string;
  description: string;
  columns: ExcelColumnDefinition[];
  instructions?: string;
}

interface ExcelTemplate {
  fileName: string;
  description: string;
  sheets: ExcelSheetDefinition[];
  usage?: string;
  integration?: string;
}

const EXCEL_TEMPLATES: Record<string, Record<string, ExcelTemplate>> = {
  retail: {
    general: {
      fileName: "Plantilla_Retail_DataViz.xlsx",
      description: "Template estándar para análisis de datos de retail",
      sheets: [
        {
          name: "Ventas",
          description: "Datos de ventas por producto, categoría y período",
          instructions: "Complete esta hoja con los datos históricos de ventas. Incluya todas las transacciones con sus respectivos productos y canales. Esta información será la base para los análisis de tendencias y segmentación.",
          columns: [
            { name: "Fecha", description: "Fecha de la venta (YYYY-MM-DD)", example: "2025-01-15", required: true, format: "Fecha" },
            { name: "Producto_ID", description: "Identificador único del producto", example: "P1001", required: true },
            { name: "Categoria", description: "Categoría del producto", example: "Electrónica", required: true },
            { name: "Subcategoria", description: "Subcategoría específica", example: "Smartphones", required: false },
            { name: "Unidades", description: "Cantidad vendida", example: "5", required: true, format: "Número" },
            { name: "Precio_Unitario", description: "Precio por unidad", example: "299.99", required: true, format: "Moneda" },
            { name: "Descuento", description: "Descuento aplicado (%)", example: "10", required: false, format: "Porcentaje" },
            { name: "Total", description: "Total de la venta", example: "1499.95", required: true, format: "Moneda" },
            { name: "Tienda_ID", description: "Identificador de la tienda", example: "T103", required: true },
            { name: "Canal", description: "Canal de venta (online/físico)", example: "Online", required: true },
            { name: "Cliente_ID", description: "Identificador del cliente (si aplica)", example: "C5042", required: false },
            { name: "Region", description: "Región geográfica", example: "Noreste", required: false },
            { name: "Promocion", description: "Código de promoción aplicada", example: "VERANO25", required: false }
          ]
        },
        {
          name: "Inventario",
          description: "Datos de inventario y stock",
          instructions: "Registre los movimientos de inventario para cada producto. Esta información permitirá optimizar niveles de stock y reducir costos de almacenamiento.",
          columns: [
            { name: "Fecha", description: "Fecha del registro", example: "2025-01-15", required: true, format: "Fecha" },
            { name: "Producto_ID", description: "Identificador único del producto", example: "P1001", required: true },
            { name: "Stock_Inicial", description: "Stock al inicio del periodo", example: "100", required: true, format: "Número" },
            { name: "Entradas", description: "Unidades añadidas al inventario", example: "50", required: true, format: "Número" },
            { name: "Salidas", description: "Unidades vendidas o retiradas", example: "35", required: true, format: "Número" },
            { name: "Devoluciones", description: "Unidades devueltas", example: "2", required: false, format: "Número" },
            { name: "Stock_Final", description: "Stock al final del periodo", example: "117", required: true, format: "Número" },
            { name: "Almacen_ID", description: "Identificador del almacén", example: "A02", required: true },
            { name: "Costo_Unitario", description: "Costo por unidad", example: "150.50", required: false, format: "Moneda" },
            { name: "Valor_Inventario", description: "Valor total del inventario", example: "17608.50", required: false, format: "Moneda" },
            { name: "Dias_Rotacion", description: "Días promedio de rotación", example: "12", required: false, format: "Número" }
          ]
        },
        {
          name: "Clientes",
          description: "Información de clientes para análisis",
          instructions: "Registre los datos demográficos y de comportamiento de sus clientes para segmentación y análisis de valor.",
          columns: [
            { name: "Cliente_ID", description: "Identificador único del cliente", example: "C5042", required: true },
            { name: "Fecha_Registro", description: "Fecha de registro del cliente", example: "2024-06-15", required: false, format: "Fecha" },
            { name: "Edad", description: "Edad del cliente", example: "34", required: false, format: "Número" },
            { name: "Genero", description: "Género del cliente", example: "F", required: false },
            { name: "Ciudad", description: "Ciudad de residencia", example: "Madrid", required: false },
            { name: "Compras_Total", description: "Número total de compras", example: "28", required: false, format: "Número" },
            { name: "Valor_Total", description: "Valor total de compras históricas", example: "4325.50", required: false, format: "Moneda" },
            { name: "Ultima_Compra", description: "Fecha de última compra", example: "2025-04-20", required: false, format: "Fecha" },
            { name: "Canal_Preferido", description: "Canal preferido de compra", example: "Online", required: false },
            { name: "Programa_Fidelidad", description: "¿Pertenece a programa de fidelidad?", example: "Sí", required: false },
            { name: "NPS", description: "Net Promoter Score (si disponible)", example: "8", required: false, format: "Número" }
          ]
        }
      ],
      usage: "Esta plantilla permite visualizar tendencias de ventas, rotación de inventario y segmentación básica de clientes.",
      integration: "Los datos pueden importarse desde sistemas POS, ERP o CRM existentes mediante la función de importación de Excel."
    },
    sarima: {
      fileName: "Plantilla_Retail_SARIMA.xlsx",
      description: "Template para análisis de series temporales con SARIMA",
      sheets: [
        {
          name: "Datos_Historicos",
          description: "Serie temporal de ventas históricas para análisis SARIMA",
          instructions: "Proporcione datos históricos con granularidad consistente (diaria, semanal, mensual). Se requieren al menos 2-3 ciclos estacionales completos para resultados óptimos.",
          columns: [
            { name: "Fecha", description: "Fecha del registro (YYYY-MM-DD)", example: "2025-01-15", required: true, format: "Fecha" },
            { name: "Ventas", description: "Valor de ventas del período", example: "15000", required: true, format: "Número" },
            { name: "Temporada", description: "Temporada (verano, navidad, etc)", example: "Navidad", required: false },
            { name: "Promocion", description: "¿Hubo promoción? (1=Sí, 0=No)", example: "1", required: false, format: "Número" },
            { name: "Precio_Promedio", description: "Precio promedio de productos", example: "45.50", required: false, format: "Moneda" },
            { name: "Competidores_Activos", description: "Número de competidores activos", example: "5", required: false, format: "Número" },
            { name: "Categoria", description: "Categoría de producto (si análisis específico)", example: "Electrónica", required: false },
            { name: "Inventario_Inicial", description: "Nivel de inventario al inicio del período", example: "500", required: false, format: "Número" },
            { name: "Dias_Promocion", description: "Número de días con promoción activa", example: "7", required: false, format: "Número" },
            { name: "Trafico_Tienda", description: "Tráfico total de clientes", example: "1200", required: false, format: "Número" }
          ]
        },
        {
          name: "Variables_Externas",
          description: "Variables externas que pueden afectar el modelo",
          instructions: "Las variables externas pueden mejorar significativamente la precisión del modelo SARIMA capturando factores que influyen en la demanda.",
          columns: [
            { name: "Fecha", description: "Fecha del registro (YYYY-MM-DD)", example: "2025-01-15", required: true, format: "Fecha" },
            { name: "Desempleo", description: "Tasa de desempleo local (%)", example: "5.2", required: false, format: "Porcentaje" },
            { name: "Inflacion", description: "Tasa de inflación mensual (%)", example: "0.3", required: false, format: "Porcentaje" },
            { name: "Confianza_Consumidor", description: "Índice de confianza del consumidor", example: "98.5", required: false, format: "Número" },
            { name: "Temp_Promedio", description: "Temperatura promedio (°C)", example: "22.5", required: false, format: "Número" },
            { name: "Precipitacion", description: "Nivel de precipitación (mm)", example: "15.2", required: false, format: "Número" },
            { name: "Evento_Local", description: "Evento local importante (1=Sí, 0=No)", example: "1", required: false, format: "Número" },
            { name: "Gasto_Marketing", description: "Gasto en marketing del período", example: "25000", required: false, format: "Moneda" },
            { name: "Ind_Sector", description: "Índice sectorial relevante", example: "1250.75", required: false, format: "Número" }
          ]
        },
        {
          name: "Parametros_SARIMA",
          description: "Configuración para el modelo SARIMA",
          instructions: "Complete esta sección si tiene conocimientos avanzados de series temporales. Si no, el sistema determinará automáticamente los parámetros óptimos.",
          columns: [
            { name: "Serie", description: "Nombre de la serie temporal", example: "Ventas_Electronica", required: true },
            { name: "p", description: "Orden autorregresivo", example: "1", required: false, format: "Número" },
            { name: "d", description: "Orden de diferenciación", example: "1", required: false, format: "Número" },
            { name: "q", description: "Orden de media móvil", example: "1", required: false, format: "Número" },
            { name: "P", description: "Orden autorregresivo estacional", example: "1", required: false, format: "Número" },
            { name: "D", description: "Orden de diferenciación estacional", example: "1", required: false, format: "Número" },
            { name: "Q", description: "Orden de media móvil estacional", example: "1", required: false, format: "Número" },
            { name: "S", description: "Longitud del ciclo estacional", example: "12", required: false, format: "Número" },
            { name: "Transformacion", description: "Transformación aplicada (log, sqrt, none)", example: "log", required: false }
          ]
        }
      ],
      usage: "Esta plantilla permite predecir ventas futuras considerando patrones estacionales, ideal para planificación de inventario y recursos.",
      integration: "Los resultados pueden integrarse con sistemas de planificación de recursos y gestión de inventario."
    },
    prophet: {
      fileName: "Plantilla_Retail_Prophet.xlsx",
      description: "Template para pronósticos con Prophet",
      sheets: [
        {
          name: "Datos_Serie",
          description: "Datos históricos para Prophet",
          instructions: "Proporcione datos históricos con formato específico requerido por Prophet. La columna 'ds' debe contener fechas y 'y' los valores a predecir.",
          columns: [
            { name: "ds", description: "Fecha (YYYY-MM-DD)", example: "2025-01-15", required: true, format: "Fecha" },
            { name: "y", description: "Valor a predecir (ventas, inventario, etc)", example: "15000", required: true, format: "Número" },
            { name: "cap", description: "Capacidad máxima (opcional)", example: "30000", required: false, format: "Número" },
            { name: "floor", description: "Valor mínimo (opcional)", example: "5000", required: false, format: "Número" },
            { name: "Categoria", description: "Categoría de producto si es análisis segmentado", example: "Electrónica", required: false },
            { name: "Tienda_ID", description: "Identificador de tienda si es análisis por ubicación", example: "T103", required: false },
            { name: "Canal", description: "Canal de ventas para análisis separado", example: "Online", required: false }
          ]
        },
        {
          name: "Eventos_Especiales",
          description: "Eventos que afectan la demanda",
          instructions: "Registre eventos especiales que impactan significativamente la demanda (promociones, festivos, etc.) para mejorar la precisión del modelo.",
          columns: [
            { name: "ds", description: "Fecha del evento (YYYY-MM-DD)", example: "2025-12-25", required: true, format: "Fecha" },
            { name: "holiday", description: "Nombre del evento", example: "Navidad", required: true },
            { name: "lower_window", description: "Días antes del impacto", example: "-3", required: true, format: "Número" },
            { name: "upper_window", description: "Días después del impacto", example: "1", required: true, format: "Número" },
            { name: "prior_scale", description: "Escala de importancia del evento", example: "10", required: false, format: "Número" },
            { name: "Descripcion", description: "Descripción detallada del evento", example: "Campaña navideña con 25% descuento", required: false }
          ]
        },
        {
          name: "Regresores",
          description: "Variables adicionales que afectan el modelo",
          instructions: "Incluya variables externas que influyen en las ventas o la demanda para mejorar la precisión del modelo Prophet.",
          columns: [
            { name: "ds", description: "Fecha (YYYY-MM-DD)", example: "2025-01-15", required: true, format: "Fecha" },
            { name: "precio", description: "Precio promedio", example: "45.5", required: false, format: "Moneda" },
            { name: "marketing", description: "Gasto en marketing", example: "5000", required: false, format: "Moneda" },
            { name: "competencia", description: "Actividad competidores (1-10)", example: "7", required: false, format: "Número" },
            { name: "clima_temp", description: "Temperatura promedio", example: "22.5", required: false, format: "Número" },
            { name: "clima_lluvia", description: "Precipitación (mm)", example: "5.2", required: false, format: "Número" },
            { name: "descuento", description: "Porcentaje de descuento promedio", example: "15", required: false, format: "Porcentaje" },
            { name: "trafico_web", description: "Tráfico web (visitas)", example: "25000", required: false, format: "Número" }
          ]
        },
        {
          name: "Config_Prophet",
          description: "Configuración avanzada del modelo",
          instructions: "Parámetros avanzados para personalizar el comportamiento del modelo Prophet.",
          columns: [
            { name: "parametro", description: "Nombre del parámetro", example: "seasonality_mode", required: true },
            { name: "valor", description: "Valor del parámetro", example: "multiplicative", required: true },
            { name: "descripcion", description: "Descripción del parámetro", example: "Modo de estacionalidad multiplicativo", required: false }
          ]
        }
      ],
      usage: "Ideal para predicciones que incorporan múltiples factores estacionales y eventos especiales como promociones o festivos.",
      integration: "Los resultados pueden visualizarse en dashboards empresariales y utilizarse para planificación automática."
    },
    kmeans: {
      fileName: "Plantilla_Retail_Kmeans.xlsx",
      description: "Template para segmentación con K-means",
      sheets: [
        {
          name: "Clientes",
          description: "Datos de clientes para segmentación",
          instructions: "Incluya todas las variables relevantes para segmentar a sus clientes. Estas variables deberían reflejar comportamiento, valor y características demográficas.",
          columns: [
            { name: "Cliente_ID", description: "Identificador único del cliente", example: "C1001", required: true },
            { name: "Frecuencia", description: "Número de compras en último año", example: "12", required: true, format: "Número" },
            { name: "Recencia", description: "Días desde última compra", example: "30", required: true, format: "Número" },
            { name: "Monetario", description: "Valor total de compras último año", example: "1500", required: true, format: "Moneda" },
            { name: "Edad", description: "Edad del cliente", example: "35", required: false, format: "Número" },
            { name: "Genero", description: "Género (para análisis demográfico)", example: "F", required: false },
            { name: "Ciudad", description: "Ciudad o región del cliente", example: "Barcelona", required: false },
            { name: "Productos_Unicos", description: "Número de productos distintos comprados", example: "8", required: false, format: "Número" },
            { name: "Compra_Online", description: "% de compras online", example: "75", required: false, format: "Porcentaje" },
            { name: "Devolucion_Ratio", description: "% de productos devueltos", example: "5.2", required: false, format: "Porcentaje" },
            { name: "Valor_Medio_Compra", description: "Valor medio por compra", example: "125", required: false, format: "Moneda" },
            { name: "Descuento_Promedio", description: "% descuento promedio recibido", example: "12.5", required: false, format: "Porcentaje" },
            { name: "Tiempo_Navegacion", description: "Tiempo promedio en tienda/web (min)", example: "15.5", required: false, format: "Número" },
            { name: "Soporte_Contactos", description: "Número de contactos con soporte", example: "3", required: false, format: "Número" },
            { name: "NPS", description: "Net Promoter Score", example: "8", required: false, format: "Número" }
          ]
        },
        {
          name: "Productos",
          description: "Datos de productos para segmentación",
          instructions: "Complete esta hoja si desea realizar segmentación de productos. Los grupos resultantes pueden ayudar a optimizar estrategias de inventario y promociones.",
          columns: [
            { name: "Producto_ID", description: "Identificador único del producto", example: "P1001", required: true },
            { name: "Precio", description: "Precio del producto", example: "199.99", required: true, format: "Moneda" },
            { name: "Rotacion", description: "Índice de rotación (1-10)", example: "8", required: true, format: "Número" },
            { name: "Margen", description: "Margen de beneficio (%)", example: "35", required: true, format: "Porcentaje" },
            { name: "Categoria", description: "Categoría principal", example: "Electrónica", required: false },
            { name: "Subcategoria", description: "Subcategoría", example: "Audio", required: false },
            { name: "Devoluciones", description: "Tasa de devolución (%)", example: "2.5", required: false, format: "Porcentaje" },
            { name: "Espacio_Estanteria", description: "Espacio ocupado (m²)", example: "0.5", required: false, format: "Número" },
            { name: "Dias_Inventario", description: "Días promedio en inventario", example: "15", required: false, format: "Número" },
            { name: "Proveedor_Lead_Time", description: "Tiempo de entrega del proveedor (días)", example: "12", required: false, format: "Número" },
            { name: "Temporada", description: "¿Producto estacional? (1=Sí, 0=No)", example: "1", required: false, format: "Número" },
            { name: "Complementarios", description: "Número de productos complementarios", example: "3", required: false, format: "Número" },
            { name: "Calificacion_Promedio", description: "Calificación promedio (1-5)", example: "4.2", required: false, format: "Número" }
          ]
        },
        {
          name: "Config_KMeans",
          description: "Configuración del algoritmo K-means",
          instructions: "Parámetros para configurar el algoritmo de clustering K-means. Si no está seguro, deje esta sección en blanco y el sistema utilizará valores predeterminados optimizados.",
          columns: [
            { name: "Dimension", description: "Dimensión a segmentar (clientes/productos)", example: "clientes", required: true },
            { name: "Num_Clusters", description: "Número de clusters deseado (k)", example: "5", required: false, format: "Número" },
            { name: "Metodo_Inicializacion", description: "Método de inicialización", example: "k-means++", required: false },
            { name: "Normalizacion", description: "Método de normalización de datos", example: "z-score", required: false },
            { name: "Max_Iteraciones", description: "Número máximo de iteraciones", example: "300", required: false, format: "Número" },
            { name: "Tolerancia", description: "Tolerancia de convergencia", example: "0.0001", required: false, format: "Número" },
            { name: "Random_State", description: "Semilla aleatoria para reproducibilidad", example: "42", required: false, format: "Número" }
          ]
        }
      ],
      usage: "Esta plantilla permite segmentar clientes o productos en grupos con características similares para estrategias personalizadas.",
      integration: "Los segmentos generados pueden exportarse a sistemas CRM o utilizarse para campañas de marketing segmentadas."
    }
  },
  finanzas: {
    general: {
      fileName: "Plantilla_Finanzas_DataViz.xlsx",
      description: "Template estándar para análisis de datos financieros",
      sheets: [
        {
          name: "Transacciones",
          description: "Datos de transacciones financieras",
          instructions: "Registre todas las transacciones financieras incluyendo detalles del cliente, producto y canal. Esta información permite análisis detallados de comportamiento y rentabilidad.",
          columns: [
            { name: "Fecha", description: "Fecha de la transacción", example: "2025-01-15", required: true, format: "Fecha" },
            { name: "Cliente_ID", description: "Identificador del cliente", example: "C2001", required: true },
            { name: "Tipo_Transaccion", description: "Tipo de transacción", example: "Depósito", required: true },
            { name: "Producto", description: "Producto financiero", example: "Cuenta Corriente", required: true },
            { name: "Monto", description: "Monto de la transacción", example: "5000", required: true, format: "Moneda" },
            { name: "Canal", description: "Canal de la transacción", example: "Móvil", required: true },
            { name: "Sucursal_ID", description: "ID de la sucursal (si aplica)", example: "S105", required: false },
            { name: "Empleado_ID", description: "Identificador del empleado (si aplica)", example: "E082", required: false },
            { name: "Comision", description: "Comisión generada", example: "25.50", required: false, format: "Moneda" },
            { name: "Margen", description: "Margen de beneficio (%)", example: "2.5", required: false, format: "Porcentaje" },
            { name: "Costo_Operacion", description: "Costo operativo de la transacción", example: "1.25", required: false, format: "Moneda" },
            { name: "Moneda", description: "Moneda de la transacción", example: "EUR", required: false },
            { name: "Conversion_Tasa", description: "Tasa de conversión (si aplica)", example: "1.05", required: false, format: "Número" }
          ]
        },
        {
          name: "Clientes",
          description: "Datos de clientes",
          instructions: "Complete esta hoja con información detallada de los clientes, incluyendo datos demográficos y financieros para análisis de segmentación y valor.",
          columns: [
            { name: "Cliente_ID", description: "Identificador del cliente", example: "C2001", required: true },
            { name: "Segmento", description: "Segmento del cliente", example: "Premium", required: true },
            { name: "Fecha_Alta", description: "Fecha de inicio como cliente", example: "2020-05-12", required: false, format: "Fecha" },
            { name: "Antiguedad", description: "Años como cliente", example: "5.2", required: true, format: "Número" },
            { name: "Edad", description: "Edad del cliente", example: "42", required: false, format: "Número" },
            { name: "Ingresos_Anuales", description: "Ingresos anuales estimados", example: "85000", required: false, format: "Moneda" },
            { name: "Productos", description: "Número de productos", example: "3", required: true, format: "Número" },
            { name: "Valor_Cartera", description: "Valor total de la cartera", example: "250000", required: true, format: "Moneda" },
            { name: "Riesgo", description: "Puntuación de riesgo (1-10)", example: "3", required: true, format: "Número" },
            { name: "Rentabilidad", description: "Rentabilidad anual (%)", example: "8.5", required: false, format: "Porcentaje" },
            { name: "Canal_Preferido", description: "Canal preferido", example: "Digital", required: false },
            { name: "NPS", description: "Net Promoter Score", example: "9", required: false, format: "Número" },
            { name: "Potencial_Crecimiento", description: "Potencial de crecimiento (1-10)", example: "8", required: false, format: "Número" }
          ]
        },
        {
          name: "Productos",
          description: "Información de productos financieros",
          instructions: "Detalle todos los productos financieros con sus características. Esta información ayudará en análisis de rendimiento y optimización de cartera.",
          columns: [
            { name: "Producto_ID", description: "Identificador del producto", example: "P105", required: true },
            { name: "Nombre", description: "Nombre del producto", example: "Cuenta de Ahorro Premium", required: true },
            { name: "Categoria", description: "Categoría del producto", example: "Ahorro", required: true },
            { name: "Fecha_Lanzamiento", description: "Fecha de lanzamiento", example: "2024-01-10", required: false, format: "Fecha" },
            { name: "Tasa_Interes", description: "Tasa de interés (%)", example: "2.5", required: false, format: "Porcentaje" },
            { name: "Comision", description: "Comisión asociada (%)", example: "0.5", required: false, format: "Porcentaje" },
            { name: "Plazo", description: "Plazo en meses (si aplica)", example: "36", required: false, format: "Número" },
            { name: "Riesgo", description: "Nivel de riesgo (1-10)", example: "4", required: false, format: "Número" },
            { name: "Clientes_Activos", description: "Número de clientes activos", example: "2500", required: false, format: "Número" },
            { name: "Valor_Cartera", description: "Valor total en cartera", example: "15000000", required: false, format: "Moneda" },
            { name: "Margen_Promedio", description: "Margen promedio (%)", example: "3.2", required: false, format: "Porcentaje" },
            { name: "Cross_Selling", description: "Índice de venta cruzada (1-10)", example: "7", required: false, format: "Número" }
          ]
        }
      ],
      usage: "Esta plantilla permite analizar el rendimiento de productos financieros, comportamiento de clientes y rentabilidad.",
      integration: "Los datos pueden exportarse desde sistemas bancarios o CRM financieros mediante la función de exportación."
    },
    sarima: {
      fileName: "Plantilla_Finanzas_SARIMA.xlsx",
      description: "Template para análisis de series temporales financieras",
      sheets: [
        {
          name: "Serie_Temporal",
          description: "Datos históricos para análisis SARIMA",
          instructions: "Registre los datos históricos de la serie financiera con granularidad consistente. Se recomiendan al menos 2-3 años de datos para capturar estacionalidad.",
          columns: [
            { name: "Fecha", description: "Fecha del registro (YYYY-MM-DD)", example: "2025-01-15", required: true, format: "Fecha" },
            { name: "Valor_Activo", description: "Valor del activo/índice", example: "1250.75", required: true, format: "Número" },
            { name: "Volumen", description: "Volumen de transacciones", example: "1500000", required: false, format: "Número" },
            { name: "Volatilidad", description: "Volatilidad del período", example: "0.025", required: false, format: "Número" },
            { name: "Tasa_Interes", description: "Tasa de interés de referencia", example: "0.0275", required: false, format: "Número" },
            { name: "Spread", description: "Diferencial de rendimiento", example: "0.0125", required: false, format: "Número" },
            { name: "Apertura", description: "Valor de apertura", example: "1248.50", required: false, format: "Número" },
            { name: "Cierre", description: "Valor de cierre", example: "1252.25", required: false, format: "Número" },
            { name: "Maximo", description: "Valor máximo del período", example: "1255.75", required: false, format: "Número" },
            { name: "Minimo", description: "Valor mínimo del período", example: "1245.25", required: false, format: "Número" }
          ]
        },
        {
          name: "Indicadores_Macro",
          description: "Indicadores macroeconómicos",
          instructions: "Incluya variables macroeconómicas que puedan influir en la serie temporal. Estos indicadores mejorarán la precisión del modelo SARIMA.",
          columns: [
            { name: "Fecha", description: "Fecha del registro", example: "2025-01-15", required: true, format: "Fecha" },
            { name: "PIB_Var", description: "Variación del PIB (%)", example: "0.8", required: false, format: "Porcentaje" },
            { name: "Inflacion", description: "Tasa de inflación (%)", example: "0.3", required: false, format: "Porcentaje" },
            { name: "Desempleo", description: "Tasa de desempleo (%)", example: "5.2", required: false, format: "Porcentaje" },
            { name: "Moneda_Ref", description: "Tipo de cambio principal", example: "1.15", required: false, format: "Número" },
            { name: "Indice_Manufactura", description: "Índice de actividad manufacturera", example: "52.5", required: false, format: "Número" },
            { name: "Confianza_Consumidor", description: "Índice de confianza del consumidor", example: "98.5", required: false, format: "Número" },
            { name: "Precio_Materias_Primas", description: "Índice de materias primas", example: "125.75", required: false, format: "Número" },
            { name: "Balance_Fiscal", description: "Balance fiscal como % del PIB", example: "-2.5", required: false, format: "Porcentaje" }
          ]
        },
        {
          name: "Parametros_SARIMA",
          description: "Parámetros para el modelo SARIMA",
          instructions: "Complete esta hoja si desea especificar parámetros personalizados para el modelo. Si se deja vacía, se determinarán automáticamente los parámetros óptimos.",
          columns: [
            { name: "Activo", description: "Nombre del activo o serie", example: "EUR/USD", required: true },
            { name: "p", description: "Orden autorregresivo", example: "2", required: false, format: "Número" },
            { name: "d", description: "Orden de diferenciación", example: "1", required: false, format: "Número" },
            { name: "q", description: "Orden de media móvil", example: "2", required: false, format: "Número" },
            { name: "P", description: "Orden autorregresivo estacional", example: "1", required: false, format: "Número" },
            { name: "D", description: "Orden de diferenciación estacional", example: "1", required: false, format: "Número" },
            { name: "Q", description: "Orden de media móvil estacional", example: "1", required: false, format: "Número" },
            { name: "S", description: "Período estacional", example: "12", required: false, format: "Número" },
            { name: "Transformacion", description: "Transformación de datos (log, none)", example: "log", required: false },
            { name: "Metrica_Evaluacion", description: "Métrica para evaluación (AIC, BIC, RMSE)", example: "AIC", required: false }
          ]
        }
      ],
      usage: "Esta plantilla permite modelar y predecir series temporales financieras considerando estacionalidad y tendencias.",
      integration: "Los modelos SARIMA pueden integrarse con sistemas de trading algorítmico o plataformas de análisis financiero."
    },
    prophet: {
      fileName: "Plantilla_Finanzas_Prophet.xlsx",
      description: "Template para predicción de indicadores financieros",
      sheets: [
        {
          name: "Serie_Principal",
          description: "Datos históricos para Prophet",
          instructions: "Proporcione datos históricos con formato específico requerido por Prophet. La columna 'ds' debe contener fechas y 'y' los valores a predecir.",
          columns: [
            { name: "ds", description: "Fecha (YYYY-MM-DD)", example: "2025-01-15", required: true, format: "Fecha" },
            { name: "y", description: "Valor a predecir", example: "1250.75", required: true, format: "Número" },
            { name: "cap", description: "Límite superior (opcional)", example: "2000", required: false, format: "Número" },
            { name: "floor", description: "Límite inferior (opcional)", example: "800", required: false, format: "Número" },
            { name: "Activo", description: "Identificador del activo", example: "EURUSD", required: false },
            { name: "Mercado", description: "Mercado del activo", example: "Forex", required: false }
          ]
        },
        {
          name: "Eventos_Mercado",
          description: "Eventos significativos del mercado",
          instructions: "Registre eventos importantes que puedan afectar significativamente al mercado, como anuncios de bancos centrales, publicaciones económicas, etc.",
          columns: [
            { name: "ds", description: "Fecha del evento", example: "2025-03-15", required: true, format: "Fecha" },
            { name: "holiday", description: "Descripción del evento", example: "Anuncio Fed", required: true },
            { name: "lower_window", description: "Días antes del impacto", example: "-1", required: true, format: "Número" },
            { name: "upper_window", description: "Días después del impacto", example: "3", required: true, format: "Número" },
            { name: "prior_scale", description: "Importancia del evento (1-10)", example: "8", required: false, format: "Número" },
            { name: "Descripcion", description: "Descripción detallada", example: "Anuncio de tasas de interés de la Reserva Federal", required: false }
          ]
        },
        {
          name: "Regresores",
          description: "Variables adicionales para el modelo",
          instructions: "Incluya variables externas que puedan influir en el comportamiento del activo financiero para mejorar la precisión del modelo.",
          columns: [
            { name: "ds", description: "Fecha", example: "2025-01-15", required: true, format: "Fecha" },
            { name: "tasa_ref", description: "Tasa de referencia", example: "0.0275", required: false, format: "Número" },
            { name: "spread", description: "Diferencial de rendimiento", example: "0.015", required: false, format: "Número" },
            { name: "volatilidad", description: "Índice de volatilidad", example: "18.5", required: false, format: "Número" },
            { name: "volumen", description: "Volumen de transacciones", example: "1250000", required: false, format: "Número" },
            { name: "sentiment", description: "Índice de sentimiento (-1 a 1)", example: "0.35", required: false, format: "Número" },
            { name: "indice_ref", description: "Índice de referencia", example: "3580.25", required: false, format: "Número" },
            { name: "precio_oro", description: "Precio del oro (USD/oz)", example: "1850.75", required: false, format: "Número" }
          ]
        },
        {
          name: "Config_Prophet",
          description: "Configuración avanzada del modelo",
          instructions: "Parámetros avanzados para personalizar el comportamiento del modelo Prophet.",
          columns: [
            { name: "parametro", description: "Nombre del parámetro", example: "seasonality_mode", required: true },
            { name: "valor", description: "Valor del parámetro", example: "multiplicative", required: true },
            { name: "descripcion", description: "Descripción del parámetro", example: "Modo de estacionalidad multiplicativo", required: false }
          ]
        }
      ],
      usage: "Esta plantilla permite predecir el comportamiento de activos financieros considerando eventos especiales y variables externas.",
      integration: "Los resultados pueden integrarse con sistemas de trading o plataformas de análisis financiero."
    },
    kmeans: {
      fileName: "Plantilla_Finanzas_Kmeans.xlsx",
      description: "Template para segmentación de clientes financieros",
      sheets: [
        {
          name: "Clientes",
          description: "Datos de clientes para segmentación",
          instructions: "Complete esta hoja con datos detallados de clientes para realizar una segmentación efectiva basada en valor, riesgo y comportamiento.",
          columns: [
            { name: "Cliente_ID", description: "Identificador del cliente", example: "C2001", required: true },
            { name: "Edad", description: "Edad del cliente", example: "42", required: true, format: "Número" },
            { name: "Ingresos", description: "Ingresos mensuales", example: "7500", required: true, format: "Moneda" },
            { name: "Valor_Activos", description: "Valor total activos", example: "350000", required: true, format: "Moneda" },
            { name: "Pasivos", description: "Total pasivos", example: "120000", required: true, format: "Moneda" },
            { name: "Riesgo_Credito", description: "Puntuación de riesgo", example: "720", required: true, format: "Número" },
            { name: "Antiguedad", description: "Años como cliente", example: "8.5", required: true, format: "Número" },
            { name: "Productos", description: "Número de productos", example: "5", required: true, format: "Número" },
            { name: "Transacciones_Mens", description: "Transacciones mensuales", example: "35", required: true, format: "Número" },
            { name: "Rentabilidad", description: "Rentabilidad anual (%)", example: "8.5", required: false, format: "Porcentaje" },
            { name: "Saldo_Promedio", description: "Saldo promedio", example: "15000", required: false, format: "Moneda" },
            { name: "Inversiones_Pct", description: "% de cartera en inversiones", example: "45", required: false, format: "Porcentaje" },
            { name: "Seguros_Num", description: "Número de seguros", example: "2", required: false, format: "Número" },
            { name: "Creditos_Num", description: "Número de créditos activos", example: "1", required: false, format: "Número" },
            { name: "Digital_Uso", description: "% uso de canales digitales", example: "85", required: false, format: "Porcentaje" },
            { name: "Reclamaciones", description: "Número de reclamaciones", example: "0", required: false, format: "Número" },
            { name: "NPS", description: "Net Promoter Score", example: "9", required: false, format: "Número" }
          ]
        },
        {
          name: "Comportamiento",
          description: "Comportamiento financiero de clientes",
          instructions: "Registre datos de comportamiento financiero para enriquecer la segmentación con patrones de uso y preferencias.",
          columns: [
            { name: "Cliente_ID", description: "Identificador del cliente", example: "C2001", required: true },
            { name: "Uso_Banca_Online", description: "% uso de banca online", example: "85", required: true, format: "Porcentaje" },
            { name: "Uso_Credito", description: "% utilización de crédito", example: "65", required: true, format: "Porcentaje" },
            { name: "Morosidad", description: "Días de morosidad último año", example: "0", required: true, format: "Número" },
            { name: "Inversiones", description: "% cartera en inversiones", example: "40", required: true, format: "Porcentaje" },
            { name: "Ahorro", description: "% cartera en ahorro", example: "35", required: true, format: "Porcentaje" },
            { name: "Seguros", description: "Número de seguros contratados", example: "3", required: true, format: "Número" },
            { name: "Frecuencia_Login", description: "Logins mensuales promedio", example: "22", required: false, format: "Número" },
            { name: "Operaciones_Internacionales", description: "Número operaciones internacionales", example: "5", required: false, format: "Número" },
            { name: "Uso_Tarjeta_Credito", description: "Transacciones mensuales con tarjeta", example: "28", required: false, format: "Número" },
            { name: "Uso_Cajeros", description: "Operaciones en cajeros por mes", example: "3", required: false, format: "Número" },
            { name: "Perfil_Riesgo", description: "Perfil de riesgo (1-5)", example: "3", required: false, format: "Número" },
            { name: "Productos_Digitales", description: "% productos contratados online", example: "75", required: false, format: "Porcentaje" }
          ]
        },
        {
          name: "Config_KMeans",
          description: "Configuración del algoritmo K-means",
          instructions: "Parámetros para configurar el algoritmo de clustering K-means. Si no está seguro, deje esta sección en blanco y el sistema utilizará valores predeterminados optimizados.",
          columns: [
            { name: "Dimension", description: "Dimensión a segmentar (clientes/productos)", example: "clientes", required: true },
            { name: "Num_Clusters", description: "Número de clusters deseado (k)", example: "5", required: false, format: "Número" },
            { name: "Metodo_Inicializacion", description: "Método de inicialización", example: "k-means++", required: false },
            { name: "Normalizacion", description: "Método de normalización de datos", example: "z-score", required: false },
            { name: "Max_Iteraciones", description: "Número máximo de iteraciones", example: "300", required: false, format: "Número" },
            { name: "Tolerancia", description: "Tolerancia de convergencia", example: "0.0001", required: false, format: "Número" },
            { name: "Random_State", description: "Semilla aleatoria para reproducibilidad", example: "42", required: false, format: "Número" }
          ]
        }
      ],
      usage: "Esta plantilla permite segmentar clientes financieros para estrategias personalizadas de productos, marketing y gestión de riesgos.",
      integration: "Los segmentos pueden integrarse con sistemas CRM y plataformas de marketing para acciones específicas por segmento."
    }
  },
  // Definir templates para otras industrias siguiendo el mismo patrón
};

// Función para obtener una plantilla Excel para una industria específica
export const getExcelTemplate = (industry: string, type: string = 'general'): string => {
  // Obtenemos las plantillas para la industria
  const industryTemplates = EXCEL_TEMPLATES[industry] || EXCEL_TEMPLATES.retail;
  let template = industryTemplates[type];
  
  // Si el tipo específico no existe, usamos el general
  if (!template) {
    console.log(`Plantilla tipo ${type} no encontrada para ${industry}, usando general`);
    template = industryTemplates.general;
  }
  
  // Notificamos al usuario que se inició la descarga
  toast.success(`Preparando plantilla: ${template.fileName}`, {
    description: template.description,
    duration: 3000,
  });
  
  // En una implementación real, aquí se generaría un archivo Excel real basado en la definición
  return template.fileName;
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
