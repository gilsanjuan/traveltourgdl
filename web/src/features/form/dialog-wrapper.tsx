import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"

type DialogFormProps = {
  children: ReactNode,
  canOpen: boolean,
}

export function DialogForm({
  children,
  canOpen,
}: DialogFormProps ) {  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          className={[
            "h-12.5 px-8 py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors ease-in",
            canOpen ? 'bg-blue-700 text-slate-50 hover:text-slate-100' : 'bg-slate-300 text-slate-500',
          ].join(' ')}
          disabled={!canOpen}
        >
          Continuar
        </Button>
      </DialogTrigger>
      { children }
    </Dialog>
  );
}


