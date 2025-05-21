import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function DialogContentSuccessMessage() {  
  return (
    <DialogContent className="md:max-w-[900px]">
      <DialogHeader>
        <DialogTitle className="text-2xl">
          <p>
            <span>✅</span>
            <span className="font-bold pl-2"> Hemos recibido tu solicitud </span>
          </p>
        </DialogTitle>
      </DialogHeader>

      <div className="py-4 px-6">
        <p className="text-xl font-normal mb-1">
          Estamos trabajando para ofrecerte la mejor opción disponible.
        </p>
        <p className="text-xl font-bold">
          Pronto nos pondremos en contacto contigo.
        </p> 
      </div>
       
    </DialogContent>
  );
}


