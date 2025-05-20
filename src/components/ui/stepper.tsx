
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type StepperProps = {
  activeStep: number;
  children: React.ReactNode;
  className?: string;
};

type StepProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

export const Stepper = ({
  activeStep,
  children,
  className,
}: StepperProps) => {
  // Filter out only Step elements
  const steps = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === Step
  ) as React.ReactElement[];

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-stretch justify-between">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={index}>
              <div className={cn('flex flex-col items-center relative', isLast ? 'flex-1' : 'flex-1')}>
                <div
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center z-10',
                    isActive
                      ? 'bg-primary text-primary-foreground ring-2 ring-offset-2 ring-primary'
                      : isCompleted
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground border'
                  )}
                >
                  {isCompleted ? (
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : step.props.icon ? (
                    step.props.icon
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div
                    className={cn(
                      'font-medium',
                      isActive
                        ? 'text-primary'
                        : isCompleted
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    )}
                  >
                    {step.props.title}
                  </div>
                  {step.props.description && (
                    <div
                      className={cn(
                        'text-sm',
                        isActive || isCompleted ? 'text-muted-foreground' : 'text-muted-foreground/60'
                      )}
                    >
                      {step.props.description}
                    </div>
                  )}
                </div>

                {!isLast && (
                  <div
                    className={cn(
                      'absolute top-4 left-1/2 w-[calc(100%-1.5rem)] h-px -translate-y-1/2',
                      isCompleted ? 'bg-primary' : 'bg-muted'
                    )}
                  ></div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export const Step = ({ title, description, icon }: StepProps) => {
  return null; // This is just a placeholder component for typechecking
};
