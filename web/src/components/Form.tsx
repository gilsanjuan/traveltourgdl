import { useState } from "react";
import InputForm from "./common/Input";
import SelectForm from "./common/Select";
import Button from './common/Button';
import Datepicker from "./common/DateRangePicker";

const radioLabelStyle = "flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500";
const radioInputStyle = "shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none";

export default function Form() {
  const [origen, setOrigen] = useState('punto-punto');

  const destinoPlaceholders = [
    'Expo Guadalajara',
    'Aeropuerto de Guadalajara',
  ]

  const handleOrigenChange = (value: string) => {
    setOrigen(value);
  }

  return (
    <form className="flex flex-col gap-4 bg-slate-50 p-3 rounded-lg">
      <fieldset className="grid sm:grid-cols-2 border-b border-slate-200 mb-3">
        <div className="flex items-center ps-4 dark:border-gray-700">
          <input id="bordered-radio-1" type="radio" value={origen} name="bordered-radio" checked
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-none dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
            onChange={() => handleOrigenChange('punto-punto')} 
          />
          <label htmlFor="bordered-radio-1" className="w-full py-4 ms-2 font-medium text-gray-900 dark:text-gray-300">Transporte punto a punto</label>
        </div>
        <div className="flex items-center ps-4 dark:border-gray-700">
          <input checked id="bordered-radio-2" type="radio" value={origen} name="bordered-radio" 
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-none dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" 
            onChange={() => handleOrigenChange('fuera-ciudad')}
          />
          <label htmlFor="bordered-radio-2" className="w-full py-4 ms-2 font-medium text-gray-900 dark:text-gray-300">Transporte fuera de la ciudad</label>
        </div>
      </fieldset>
      <div className="flex gap-4 mb-3">
        <div className="w-1/2">
          <SelectForm 
            options={[
              { value: 'aeropuerto', label: 'Aeropuerto de guadalajara' },
              { value: 'guadalajara', label: 'Guadalajara' },
              { value: 'tlajomulco', label: 'Tlajomulco' },
              { value: 'tlaquepaque', label: 'Tlaquepaque' },
            ]}
            label="Origen"
            onChange={() => {}}
          />
        </div>
        <div className="w-1/2">
          <InputForm 
            label="Destino"
            placeholder={destinoPlaceholders[0]}
            onChange={() => {}}
          />            
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <SelectForm 
            options={[
              { value: '1', label: '1 pasajero' },
              { value: '2', label: '2 pasajeros' },
              { value: '3', label: '3 pasajeros' },
              { value: '4', label: '4 pasajeros' },
              { value: '5', label: '5 pasajeros' },
              { value: '6', label: '6 pasajeros' },
              { value: '7', label: '7 pasajeros' },
              { value: '8', label: '8 pasajeros' },
              { value: '9', label: '9 pasajeros' },
              { value: '10', label: '10 pasajeros' },
              { value: '11', label: '11 pasajeros' },
              { value: '12', label: '12 pasajeros' },
              { value: '13', label: '13 pasajeros' },
              { value: '14', label: '14 pasajeros' },
              { value: '15', label: '15 pasajeros' },
              { value: '16', label: '16 pasajeros' },
            ]}
            label="Pasajeros"
            onChange={() => {}}
          />
        </div>
        <div className="w-1/2">
          <Datepicker />
        </div>
      </div>
      <div className="flex gap-4 py-4">
        <div className="w-1/2"> 
          <Button href="#" text="Cotizar" />
        </div>
      </div>
    </form>
  );
}


