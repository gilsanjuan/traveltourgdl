import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import { set } from "date-fns";

type DialogFormProps = {
  isOpen: boolean,
  canOpen: boolean,
  children: ReactNode,
  setIsOpen: (isOpen: boolean) => void,
  onOpenChange: (isOpen: boolean) => void,
}

export function DialogForm({
  isOpen,
  canOpen,
  children,
  setIsOpen,
  onOpenChange,
}: DialogFormProps ) {  
  return (
    <Dialog 
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogTrigger asChild>
        <Button 
          type="button"
          className={[
            "h-12.5 px-8 py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors ease-in",
            canOpen ? 'bg-blue-700 text-slate-50 hover:text-slate-100' : 'bg-slate-300 text-slate-500',
          ].join(' ')}
          disabled={!canOpen}
          onClick={() => { setIsOpen(true) }}
        >
          Continuar
        </Button>
      </DialogTrigger>
      { children }
    </Dialog>
  );
}


