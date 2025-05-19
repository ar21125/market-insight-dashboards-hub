
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

interface TemplateField {
  name: string;
  description: string;
  example: string | number;
  required: boolean;
  type: 'text' | 'numeric' | 'date' | 'categorical';
}

interface TemplateSection {
  name: string;
  fields: TemplateField[];
}

/**
 * Generates and downloads an Excel template with instructions and example data
 * based on the analysis flow requirements
 */
export const generateExcelTemplate = (
  flowId: string,
  flowName: string,
  sections: TemplateSection[]
): void => {
  try {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Add instructions sheet
    const instructions: any[][] = [
      ['Plantilla de Análisis:', flowName],
      ['ID:', flowId],
      [''],
      ['INSTRUCCIONES:'],
      ['1. Complete los datos en las hojas correspondientes a cada paso del análisis.'],
      ['2. Los campos marcados con (*) son obligatorios.'],
      ['3. Puede encontrar ejemplos de datos en cada hoja.'],
      ['4. No modifique los nombres de las columnas.'],
      ['5. Si tiene datos faltantes, deje la celda vacía.'],
      ['']
    ];
    
    const instructionsWS = XLSX.utils.aoa_to_sheet(instructions);
    XLSX.utils.book_append_sheet(workbook, instructionsWS, 'Instrucciones');
    
    // Add data sheets for each section
    sections.forEach(section => {
      // Create headers row with descriptions as comments
      const headers: string[] = [];
      const headerComments: {[cell: string]: {a: string}} = {};
      
      section.fields.forEach((field, idx) => {
        const headerName = field.required ? `${field.name} (*)` : field.name;
        headers.push(headerName);
        
        // Add column comments with descriptions
        const cellRef = XLSX.utils.encode_cell({c: idx, r: 0});
        headerComments[cellRef] = {a: field.description};
      });
      
      // Create example data row
      const exampleRow: (string | number)[] = section.fields.map(field => field.example);
      
      // Create worksheet with headers and example
      const data: any[][] = [
        headers,
        exampleRow,
        // Add a few empty rows for data entry
        Array(section.fields.length).fill(''),
        Array(section.fields.length).fill(''),
        Array(section.fields.length).fill(''),
      ];
      
      const ws = XLSX.utils.aoa_to_sheet(data);
      ws['!comments'] = headerComments;
      
      // Set column widths based on content
      const colWidths = headers.map(h => Math.max(h.length, 15));
      ws['!cols'] = colWidths.map(w => ({wch: w}));
      
      XLSX.utils.book_append_sheet(workbook, ws, section.name);
    });
    
    // Create the Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: 'application/octet-stream'});
    
    // Download the file
    saveAs(data, `Plantilla_${flowId}.xlsx`);
  } catch (error) {
    console.error('Error generating Excel template:', error);
    throw error;
  }
};

/**
 * Creates template sections from an analysis flow
 */
export const createTemplateSectionsFromFlow = (flow: any): TemplateSection[] => {
  return flow.steps.map(step => ({
    name: step.name,
    fields: step.inputFields
  }));
};
