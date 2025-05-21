export type Inputs = {
  tripType: "punto-punto" | "fuera-ciudad";
  origin: string;
  destination: string;
  passengers: number;
  departureDate: Date;
  returnDate: Date;

  contactName: string;
  contactPhone: string;
    
  contactEmail?: string;
}
