import { format } from "date-fns";
import { es } from "date-fns/locale";
import InputForm from "@/components/common/Input";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import summaryValues from "./data"

type DialogFormProps = {
  register: any
  getValues: any
  handleSubmit: any
  isLoading: boolean
  errors: any
}

export function DialogContentForm({
  register,
  getValues,
  handleSubmit,
  isLoading,
  errors,
}: DialogFormProps ) {  
  return (
    <DialogContent className="md:max-w-[900px]">
      <DialogHeader>
        <DialogTitle>Cotización</DialogTitle>
        <DialogDescription>
          Resumen de cotización.
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-2 md:grid grid-cols-3 gap-y-8 md:py-2">
        <div>
          <span className="pr-1 block">Origen: </span> 
          <span className="font-bold capitalize">
            { getValues("origin") ? (summaryValues['origin'][getValues("origin")] || '') : '' }
          </span>
        </div>

        <div>
          <span className="pr-1 block">Destino: </span>
          <span className="font-bold capitalize">
            { getValues("destination") ? (getValues("destination") || '') : '' }
          </span>
        </div>

        <div>
          <span className="pr-1 md:block">No. Pasajeros: </span>
          <span className="font-bold">
            { getValues("passengers") ? (summaryValues['passengers'][String(getValues("passengers"))] || '') : '' }
          </span>
        </div>
        
        <div>
          <span className="pr-1 block">Fecha de salida: </span>
          <span className="font-bold">
            { getValues("departureDate") ? format( getValues('departureDate'), 'PPPP', {locale: es}) : '' }
          </span>
        </div>
        
        <div>
          <span className="pr-1 block">Fecha de regreso: </span>
          <span className="font-bold">
            { getValues("returnDate") ? format( getValues('returnDate'), 'PPPP', {locale: es}) : '' }
          </span>
        </div>
      </div> 

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 md:pt-8 md:pb-6">
        <div>
          <InputForm
            {...register("contactName", { required: true })}
            required={true}
            label="Nombre"
            placeholder={"Tú nombre"}
            error={errors.contactName}
          />
        </div>
        <div>
          <InputForm
            {...register("contactPhone", { required: true })}
            required={true}
            label="Télefono"
            placeholder={"33 1234 1234"}
            error={errors.contactPhone}
          />
        </div>
        <div>
          <InputForm
            label="correo electrónico"
            {...register("contactEmail")}
            placeholder={"tu-correo@gmail.com"}
          />
          
        </div>
      </div>

      <DialogFooter>
        <Button 
          type="submit"
          disabled={isLoading}
          className={[
            "h-12 px-8 py-4 rounded-lg cursor-pointer bg-blue-700 text-slate-50 hover:text-slate-100",
            "hover:bg-blue-600 transition-colors ease-in"
          ].join(' ')}
          onClick={handleSubmit}
        >
          Solicitar cotización
        </Button>
      </DialogFooter>
      
    </DialogContent>
  );
}


