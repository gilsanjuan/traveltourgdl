import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function DialogContentSuccessMessage() {  
  return (
    <DialogContent className="md:max-w-[900px] px-2">
      <DialogHeader>
        <DialogTitle className="text-2xl text-left px-4">
          <p>
            <span>✅</span>
            <span className="font-bold pl-2"> Cotización recibida</span>
          </p>
        </DialogTitle>
      </DialogHeader>

      <div className="py-4 px-2 md:px-6">
        <p className="text-lg md:text-xl font-normal mb-5 md:mb-2">
          Estamos trabajando para ofrecerte la mejor opción disponible.
        </p>
        <p className="text-lg md:text-xl font-bold">
          Pronto nos pondremos en contacto contigo.
        </p> 
      </div>
       
    </DialogContent>
  );
}


