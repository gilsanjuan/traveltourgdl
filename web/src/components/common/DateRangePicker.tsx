import type { SelectSingleEventHandler} from "react-day-picker"

import { useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarRange } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function DatePicke({
  label='Fechas',
  placeholder='Elegir fecha',
  onSelect,
  ...props
}: {
  label?: string
  placeholder?: string,
  onSelect?: (date: Date) => void
  [x: string]: any
}) {
  const [date, setDate] = useState<Date | undefined>()

  const handleSelect = (date: Date) => {
    setDate(date)
    if (onSelect) {
      onSelect(date)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full px-2.5 pb-2.5 pt-4 py-6 justify-start text-left font-normal text-sm border-gray-300",
            "relative cursor-pointer",
            !date && "text-slate-600 dark:text-slate-400",
          )}
        >
            <span className={cn(
              "absolute text-slate-700 text-sm duration-300 hover:text-slate-700",
              "transform -translate-y-4.5 scale-90 top-2 z-10 origin-[0]",
              "bg-slate-50 dark:bg-gray-900 px-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
            )}>
              {label}
            </span>
            <CalendarRange size={20} />
            <span className="pl-1 text-base text-slate-700 dark:text-slate-400">
              {date ? format(date, "PPP", { locale: es }) : <span>{placeholder}</span>}
            </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={es}
          mode="single"
          selected={date}
          onSelect={handleSelect as SelectSingleEventHandler}
          {...props}
        />
      </PopoverContent>
    </Popover>
  )
}
