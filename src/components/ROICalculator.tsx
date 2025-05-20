
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface ROICalculatorProps {
  defaultIndustry?: string;
  trigger?: React.ReactNode;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({
  defaultIndustry = 'retail',
  trigger,
}) => {
  const [industry, setIndustry] = useState(defaultIndustry);
  const [initialInvestment, setInitialInvestment] = useState(20000);
  const [annualSavings, setAnnualSavings] = useState(50000);
  const [implementationTime, setImplementationTime] = useState(3);
  const [riskLevel, setRiskLevel] = useState(2);
  
  // Cálculo de ROI básico: (Beneficio - Inversión) / Inversión * 100
  const calculateROI = () => {
    const benefit = annualSavings;
    const investment = initialInvestment;
    const rawROI = ((benefit - investment) / investment) * 100;
    
    // Ajuste por tiempo de implementación (factor de descuento)
    const timeAdjustment = 1 - (implementationTime * 0.05);
    
    // Ajuste por nivel de riesgo
    const riskAdjustment = 1 - (riskLevel * 0.1);
    
    // ROI ajustado
    const adjustedROI = rawROI * timeAdjustment * riskAdjustment;
    
    return adjustedROI.toFixed(1);
  };
  
  // Función para sugerir valores según la industria seleccionada
  const updateValuesByIndustry = (selected: string) => {
    setIndustry(selected);
    
    switch (selected) {
      case 'retail':
        setInitialInvestment(20000);
        setAnnualSavings(50000);
        setImplementationTime(3);
        setRiskLevel(2);
        break;
      case 'finanzas':
        setInitialInvestment(35000);
        setAnnualSavings(120000);
        setImplementationTime(4);
        setRiskLevel(3);
        break;
      case 'manufactura':
        setInitialInvestment(40000);
        setAnnualSavings(95000);
        setImplementationTime(5);
        setRiskLevel(2);
        break;
      case 'energia':
        setInitialInvestment(45000);
        setAnnualSavings(110000);
        setImplementationTime(6);
        setRiskLevel(3);
        break;
      case 'salud':
        setInitialInvestment(30000);
        setAnnualSavings(75000);
        setImplementationTime(4);
        setRiskLevel(4);
        break;
      case 'agricultura':
        setInitialInvestment(25000);
        setAnnualSavings(65000);
        setImplementationTime(3);
        setRiskLevel(2);
        break;
      default:
        setInitialInvestment(20000);
        setAnnualSavings(50000);
        setImplementationTime(3);
        setRiskLevel(2);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button>Calculadora de ROI</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Calculadora de ROI</DialogTitle>
          <DialogDescription>
            Nuestra calculadora de ROI te permite estimar el retorno de inversión para tu proyecto de análisis específico. ¡Prueba diferentes escenarios!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="industry" className="text-right">
              Industria
            </Label>
            <div className="col-span-3">
              <Select 
                value={industry} 
                onValueChange={(value) => updateValuesByIndustry(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una industria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="finanzas">Finanzas</SelectItem>
                  <SelectItem value="manufactura">Manufactura</SelectItem>
                  <SelectItem value="energia">Energía</SelectItem>
                  <SelectItem value="salud">Salud</SelectItem>
                  <SelectItem value="agricultura">Agricultura</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="investment" className="text-right">
              Inversión (€)
            </Label>
            <Input
              id="investment"
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="savings" className="text-right">
              Ahorro Anual (€)
            </Label>
            <Input
              id="savings"
              type="number"
              value={annualSavings}
              onChange={(e) => setAnnualSavings(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Tiempo Impl. (meses)
            </Label>
            <div className="col-span-3 flex flex-col gap-1">
              <Slider
                id="time"
                value={[implementationTime]}
                min={1}
                max={12}
                step={1}
                onValueChange={(values) => setImplementationTime(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1</span>
                <span>{implementationTime} meses</span>
                <span>12</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="risk" className="text-right">
              Nivel de Riesgo
            </Label>
            <div className="col-span-3 flex flex-col gap-1">
              <Slider
                id="risk"
                value={[riskLevel]}
                min={1}
                max={5}
                step={1}
                onValueChange={(values) => setRiskLevel(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Bajo</span>
                <span>Medio</span>
                <span>Alto</span>
              </div>
            </div>
          </div>
          
          <Separator className="my-2" />
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">
              ROI Estimado
            </Label>
            <div className="col-span-3">
              <div className="text-2xl font-bold text-primary">
                {calculateROI()}%
              </div>
              <p className="text-xs text-muted-foreground">
                Periodo de recuperación: aproximadamente {(initialInvestment / (annualSavings / 12)).toFixed(1)} meses
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <p className="text-xs text-muted-foreground mr-auto">
            * Esta es una estimación aproximada. Consulta con nuestros expertos para un análisis detallado.
          </p>
          <Button type="button">Solicitar Análisis Personalizado</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ROICalculator;
