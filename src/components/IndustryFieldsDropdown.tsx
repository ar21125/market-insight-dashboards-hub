
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Definición de campos comunes por industria
const INDUSTRY_FIELDS: Record<string, { group: string; fields: string[] }[]> = {
  retail: [
    {
      group: "Ventas",
      fields: ["Ventas por categoría", "Ventas por ubicación", "Ticket medio", "Unidades por transacción"]
    },
    {
      group: "Marketing",
      fields: ["ROI campañas", "Tasa de conversión", "CAC (Costo Adquisición Cliente)", "LTV (Valor de vida del cliente)"]
    },
    {
      group: "Inventario",
      fields: ["Rotación de inventario", "Días de inventario", "Ruptura de stock", "Margen por producto"]
    },
    {
      group: "Clientes",
      fields: ["NPS", "Retención", "Frecuencia de compra", "Segmentación RFM"]
    }
  ],
  finanzas: [
    {
      group: "Rendimiento",
      fields: ["ROI", "ROIC", "ROE", "ROA", "Ratio de eficiencia", "Cost-to-Income"]
    },
    {
      group: "Clientes",
      fields: ["Coste adquisición", "Valor vida cliente (LTV)", "Cross-selling ratio", "Tasa abandono"]
    },
    {
      group: "Riesgo",
      fields: ["VAR (Valor en Riesgo)", "Ratio de morosidad", "Provisión por pérdidas", "Capital regulatorio"]
    },
    {
      group: "Operaciones",
      fields: ["STP Rate (Straight Through Processing)", "Tiempo procesamiento", "Errores operativos", "Digitalización"]
    }
  ],
  salud: [
    {
      group: "Pacientes",
      fields: ["Tiempo medio espera", "Readmisiones", "Satisfacción paciente", "Costo por paciente"]
    },
    {
      group: "Operaciones",
      fields: ["Ocupación camas", "Duración media estancia", "Ratio enfermeros/pacientes", "Eficiencia quirófanos"]
    },
    {
      group: "Calidad",
      fields: ["Infecciones nosocomiales", "Errores medicación", "Mortalidad ajustada riesgo", "Adherencia protocolos"]
    },
    {
      group: "Financieros",
      fields: ["Margen por servicio", "Costo por procedimiento", "Revenue cycle", "Días cobro pendiente"]
    }
  ],
  manufactura: [
    {
      group: "Producción",
      fields: ["OEE (Eficiencia Global Equipos)", "Tasa de defectos", "Tiempo ciclo", "Tiempo configuración"]
    },
    {
      group: "Calidad",
      fields: ["Tasa de rechazo", "First Pass Yield", "Coste de no calidad", "Devoluciones"]
    },
    {
      group: "Cadena suministro",
      fields: ["Lead time proveedores", "OTIF (On Time In Full)", "Rotación inventario", "Stock seguridad"]
    },
    {
      group: "Mantenimiento",
      fields: ["MTBF (Tiempo Medio Entre Fallos)", "MTTR (Tiempo Medio Reparación)", "OEE", "Mantenimiento preventivo"]
    }
  ],
  tecnologia: [
    {
      group: "Usuarios",
      fields: ["DAU/MAU", "Retención", "Tiempo en plataforma", "NPS", "Feature adoption"]
    },
    {
      group: "Producto",
      fields: ["Sprint velocity", "Lead time", "Cycle time", "Deuda técnica", "Bugs por release"]
    },
    {
      group: "Infraestructura",
      fields: ["Uptime", "Latencia", "Tiempo carga", "Error rate", "CPU/Memory usage"]
    },
    {
      group: "Negocio",
      fields: ["CAC", "LTV", "Burn rate", "Conversion rate", "Churn rate", "MRR/ARR"]
    }
  ],
  educacion: [
    {
      group: "Académico",
      fields: ["Tasa graduación", "Tasa abandono", "Notas medias", "Tiempo hasta finalización"]
    },
    {
      group: "Estudiantes",
      fields: ["Satisfacción estudiante", "Asistencia", "Participación", "Empleabilidad post-graduación"]
    },
    {
      group: "Profesorado",
      fields: ["Ratio estudiante/profesor", "Valoración profesorado", "Publicaciones", "Desarrollo profesional"]
    },
    {
      group: "Financiero",
      fields: ["Costo por estudiante", "ROI programas", "Ingresos matriculación", "Fondos investigación"]
    }
  ]
};

interface IndustryFieldsDropdownProps {
  industry: string;
  onChange?: (field: string) => void;
}

const IndustryFieldsDropdown: React.FC<IndustryFieldsDropdownProps> = ({ 
  industry, 
  onChange 
}) => {
  // Obtener campos para la industria actual, o usar retail como fallback
  const industryGroups = INDUSTRY_FIELDS[industry] || INDUSTRY_FIELDS.retail;

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        Campos más usados en este sector:
      </p>
      <Select onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccione un campo..." />
        </SelectTrigger>
        <SelectContent>
          {industryGroups.map((group) => (
            <SelectGroup key={group.group}>
              <SelectLabel>{group.group}</SelectLabel>
              {group.fields.map((field) => (
                <SelectItem key={field} value={field}>
                  {field}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default IndustryFieldsDropdown;
