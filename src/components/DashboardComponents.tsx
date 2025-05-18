
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon, HelpCircleIcon } from "lucide-react";
import { formatNumber } from "@/lib/api";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import IndustryFieldsDropdown from './IndustryFieldsDropdown';
import { toast } from "sonner";

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  format?: boolean;
}

export const StatCard = ({ title, value, change, format = true }: StatCardProps) => {
  const isPositive = change >= 0;
  const displayValue = format ? formatNumber(value) : value.toString();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{displayValue}</div>
        <div className="flex items-center mt-1">
          {isPositive ? (
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
          )}
          <p className={cn(
            "text-sm font-medium",
            isPositive ? "text-green-500" : "text-red-500"
          )}>
            {isPositive ? "+" : ""}{change}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  industry?: string;
  description?: string;
}

export const ChartContainer = ({ 
  title, 
  children, 
  className, 
  industry = "retail",
  description
}: ChartContainerProps) => {
  const handleFieldChange = (field: string) => {
    toast.info(`Seleccionado: ${field}`, {
      description: "En una implementación real, esto filtraría los datos para mostrar este campo específico."
    });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-medium">
              {title}
            </CardTitle>
            {description && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircleIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">{description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        {industry && (
          <div className="mt-2 pt-2 border-t">
            <IndustryFieldsDropdown industry={industry} onChange={handleFieldChange} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
