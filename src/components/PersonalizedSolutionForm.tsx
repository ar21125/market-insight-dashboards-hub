
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Check, MessageSquare, ArrowRight } from 'lucide-react';

interface PersonalizedSolutionFormProps {
  trigger?: React.ReactNode;
  industry?: string;
}

const PersonalizedSolutionForm: React.FC<PersonalizedSolutionFormProps> = ({ 
  trigger, 
  industry = 'general' 
}) => {
  const [open, setOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [shareWhatsApp, setShareWhatsApp] = React.useState(false);
  const { toast } = useToast();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  const form = useForm({
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      industry: industry !== 'general' ? industry : '',
      requirements: '',
      contactPreference: 'email',
    }
  });
  
  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      
      toast({
        title: "Solicitud recibida",
        description: "Nos pondremos en contacto contigo pronto."
      });
    }, 1000);
  };
  
  const getWhatsAppLink = () => {
    const message = encodeURIComponent(
      "Hola, estoy interesado/a en una solución personalizada para mi negocio. Me gustaría recibir más información."
    );
    return `https://wa.me/+123456789?text=${message}`;
  };
  
  const Content = () => (
    <>
      {!submitted ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Por favor ingresa tu nombre" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="company"
              rules={{ required: "Por favor ingresa el nombre de tu empresa" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de tu empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                rules={{ 
                  required: "Por favor ingresa tu correo electrónico",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Correo electrónico inválido"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="tu@correo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                rules={{ required: "Por favor ingresa tu teléfono" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu número de teléfono" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="industry"
              rules={{ required: "Por favor selecciona una industria" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industria</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu industria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="retail">Retail y E-commerce</SelectItem>
                      <SelectItem value="finanzas">Servicios Financieros</SelectItem>
                      <SelectItem value="salud">Sector Salud</SelectItem>
                      <SelectItem value="manufactura">Manufactura e Industria</SelectItem>
                      <SelectItem value="turismo">Turismo y Hostelería</SelectItem>
                      <SelectItem value="tecnologia">Tecnología y Software</SelectItem>
                      <SelectItem value="educacion">Educación y E-learning</SelectItem>
                      <SelectItem value="agricultura">Agricultura y Agroindustria</SelectItem>
                      <SelectItem value="energia">Energía y Utilities</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="requirements"
              rules={{ required: "Por favor describe tus necesidades" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requerimientos</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe tus necesidades específicas y qué tipo de análisis te interesa..."
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Cuéntanos sobre tu proyecto y qué estás buscando lograr.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferencia de contacto</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu preferencia de contacto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="email">Correo electrónico</SelectItem>
                      <SelectItem value="phone">Llamada telefónica</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="whatsapp-consent" 
                checked={shareWhatsApp}
                onCheckedChange={(checked) => setShareWhatsApp(!!checked)}
              />
              <label htmlFor="whatsapp-consent" className="text-sm text-muted-foreground">
                También me gustaría hablar con un asesor por WhatsApp ahora
              </label>
            </div>
            
            <Button type="submit" className="w-full">
              Enviar solicitud
            </Button>
          </form>
        </Form>
      ) : (
        <div className="text-center py-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">¡Solicitud recibida!</h3>
          <p className="text-muted-foreground mb-8">
            Gracias por tu interés. Un especialista se pondrá en contacto contigo en las próximas 24 horas.
          </p>
          
          {shareWhatsApp && (
            <div className="mb-6">
              <Button asChild variant="outline">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Contactar por WhatsApp ahora
                </a>
              </Button>
            </div>
          )}
          
          <Button variant="outline" onClick={() => {
            setOpen(false);
            setSubmitted(false);
          }}>
            Cerrar
          </Button>
        </div>
      )}
    </>
  );
  
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger || (
            <Button>
              <Sparkles className="mr-2 h-4 w-4" />
              Solicitar solución personalizada
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Solicitar solución personalizada</DialogTitle>
            <DialogDescription>
              Cuéntanos sobre tu proyecto y nuestro equipo de expertos diseñará una solución a medida.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Content />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {trigger || (
          <Button>
            <Sparkles className="mr-2 h-4 w-4" />
            Solicitar solución personalizada
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Solicitar solución personalizada</DrawerTitle>
          <DrawerDescription>
            Cuéntanos sobre tu proyecto y nuestro equipo de expertos diseñará una solución a medida.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <Content />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PersonalizedSolutionForm;
