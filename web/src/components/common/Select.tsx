import { useState, type ReactNode } from "react";
import { cn } from "../../lib/utils";

type optionType = {
  value: string;
  label: string;
};

export default function SelectForm({
  options = [],
  label = '',
  icon,
  ...props
}: {
  options: optionType[];
  label: string;
  icon?: ReactNode;
  props?: any;
}) {

return (
  <div className="relative">
    <label htmlFor={`${label}-select`} 
      className={cn(
        "absolute text-gray-500 text-sm dark:text-gray-400 duration-300 transform -translate-y-4.5 scale-90 top-2 z-10 origin-[0]",
        "bg-white dark:bg-gray-900 px-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      )}
    >
      {label}
    </label>
    { icon 
      ? (<span className="absolute top-4 left-3">{icon}</span>)
      : null
    }
    <select 
      id={`${label}-select`} 
      className={cn("block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg",
        "bg-gray-50 focus:ring-blue-500 focus:border-blue-500 cursor-pointer",
        "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
        icon ? "pl-8" : "",
      )}
      {...props}
    >
      <option value="">{`Elegir ${label.toLocaleLowerCase()}`}</option> {/* Removed selected attribute */}
      { options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
}


