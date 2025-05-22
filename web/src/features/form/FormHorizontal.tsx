import type { SubmitHandler } from "react-hook-form"
import type { Inputs } from "@/features/form/types"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { MapPin, LocateFixed, Users } from "lucide-react";

import InputForm from "@/components/common/Input";
import SelectForm from "@/components/common/Select";
import Datepicker from "@/components/common/DateRangePicker";
import { DialogForm } from "./dialog-wrapper"
import { DialogContentForm } from "./dialog-content-form"
import { DialogContentSuccessMessage } from "./dialog-content-success-message"

import summaryValues from "./data"
import { FormSchema } from "./schema"
import { cn } from "../../lib/utils";

const destinoPlaceholders = [
  'Expo Guadalajara',
  'Aeropuerto de Guadalajara',
]

export default function QuoteForm() {
  const [tripType, setTripType] = useState<"punto-punto" | "fuera-ciudad">('punto-punto')
  const [canOpen, setCanOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [formSent, setFormSent] = useState(false)

  const {
    watch,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof FormSchema>>({
    shouldUseNativeValidation: true,
    defaultValues: {
      tripType: tripType,
    }
  })

  useEffect(() => {
    const subscription = watch((formValues) => {
      const requiredFields = [
        'tripType', 'origin', 'destination', 'passengers', 'departureDate', 'returnDate'
      ];
      const allFieldsHaveValues = requiredFields.every(field => {
        const value = formValues[field as keyof typeof formValues];
        return value !== undefined && value !== null && value !== '';
      });
      setCanOpen(allFieldsHaveValues);
    });
  
    return () => subscription.unsubscribe();
  }, [watch]);
  
  const resetState = () => {
    setValue("destination", '')
    setValue("origin", '')
    setValue("contactName", '')
    setValue("contactPhone", '')
    setValue("contactEmail", '')
  }
  
  const submitSuccess = () => {
    setFormSent(true)
    setIsOpen(true)
  }

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const jsonData = JSON.stringify(values)
    const result = await fetch('/api/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    });
    
    const data = await result.json()
  
    if (data.success === true) {
      submitSuccess()
      resetState()
    } else {
      console.error('Error:', data);
    }
  }

  return (
    <form className="flex flex-col md:flex-row justify-between gap-4 bg-slate-50 rounded-lg relative z-30">
      <fieldset className="flex w-full justify-between md:flex-col md:w-[200px]">
        <div className={cn(
          "flex items-center bg-slate-200 ps-3 rounded-tl-lg text-white w-full h-full transition-colors ease-in checked:bg-slate-300",
          "md:ps-5",
          tripType === 'punto-punto' ? 'bg-slate-300' : 'bg-slate-200',
        )}>
          <input 
            id="bordered-radio-1" 
            type="radio" 
            value='punto-punto' 
            className="peer size-4 bg-gray-100 border-gray-300 focus:ring-none cursor-pointer"
            {...register("tripType", { required: true })}
            onClick={() => {
              setValue("tripType", 'punto-punto')
              setTripType('punto-punto')
            }}
          />
          <label 
            htmlFor="bordered-radio-1" 
            className="w-full p-3 ps-2 text-gray-900 peer-checked:font-medium dark:text-gray-300 cursor-pointer"
          >
            Punto a punto
          </label>
        </div>
        <div className={cn(
          "flex items-center bg-slate-200 ps-3 text-white w-full h-full rounded-tr-lg",
          "border-l border-slate-300 md:rounded-tr-none lg:border-t lg:rounded-bl-lg",
          "md:ps-5",
          tripType === 'fuera-ciudad' ? 'bg-slate-300' : 'bg-slate-200',
        )}>
          <input
            type="radio" 
            value='fuera-ciudad' 
            id="bordered-radio-2" 
            className="peer size-4 bg-gray-100 border-gray-300 focus:ring-none cursor-pointer" 
            {...register("tripType")} 
            onClick={() => {
              setValue("tripType", 'fuera-ciudad')
              setTripType('fuera-ciudad')
            }}
          />
          <label 
            htmlFor="bordered-radio-2" 
            className="w-full p-3 ps-2 pe-2 text-gray-900 peer-checked:font-medium dark:text-gray-300 cursor-pointer lg:pb-3.5"
          >
            Fuera de la ciudad
          </label>
        </div>
      </fieldset>
      <div className="grid grid-cols-1 gap-4 align-middle items-center py-5 pe-5 px-4 md:grid-cols-3">
        <SelectForm
          {...register("origin", { required: true })}
           options={ Object.entries(summaryValues.origin || {}).map(
            ([key, value]) => ({
              value: key,
              label: value as string,
              })
            )
          }
          label="Origen"
          icon={<MapPin size={17} />}
        />
        <InputForm 
          label="Destino"
          {...register("destination", { required: true })}
          placeholder={destinoPlaceholders[0]}
          icon={<LocateFixed size={18} />}
        />            
        <SelectForm 
          {...register("passengers", { required: true })}
          options={ Object.entries(summaryValues.passengers || {}).map(
            ([key, value]) => ({
              value: key,
              label: value as string,
              })
            )
          }
          label="No. de pasajeros"
          icon={<Users size={17} />}
        />
        <div className="col-span-1">
          <Datepicker 
            {...register("departureDate", { required: true })}
            label="Fecha de salida"
            placeholder="Fecha de salida"
            disabled={{ before: new Date() }}
            onSelect={(value) => setValue("departureDate", value )}
          />
        </div>
        <div className="col-span-1">
          <Datepicker 
            {...register("returnDate", { required: true })}
            label="Fecha de regreso"
            placeholder="Fecha de regreso"
            disabled={{ before: new Date() }}
            onSelect={(date) => setValue("returnDate", new Date(date))}
          />
        </div>
        
        <DialogForm
          isOpen={isOpen}
          canOpen={canOpen}
          setIsOpen={setIsOpen}
          onOpenChange={(open) => {
            setIsOpen(open)
            if (setFormSent) {
              setFormSent(false)
            }
          }}
        >
          { formSent
            ? <DialogContentSuccessMessage />
            : <DialogContentForm 
                handleSubmit={handleSubmit(onSubmit)}
                getValues={getValues}
                errors={errors}
                register={register}
                isLoading={isSubmitting}
              />
          }
        </DialogForm>

      </div>
    </form>
  );
}


