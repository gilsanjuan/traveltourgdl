import type { FieldError } from 'react-hook-form'

export default function InputForm({
  label = '',
  placeholder = '',
  icon,
  error,
  required,
  ...props
}: {
  label: string;
  placeholder: string;
  error?: FieldError;
  required?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className="relative">
      {icon && <span className="absolute top-5 left-3">{icon}</span>}
      <input type="text" 
        id={`${label}-input`} 
        placeholder={placeholder} 
        className={[
          "block px-2.5 pb-2.5 pt-4 w-full text-slate-800 bg-transparent rounded-lg border-1 border-gray-300",
          "appearance-none dark:text-white focus:outline-none focus:ring-0 placeholder:text-slate-500",
          " focus:placeholder:text-slate-300 peer cursor-pointer",
          icon ? "pl-9" : "",
          error ? "border-red-400 focus:border-red-400" : "focus:border-blue-500",
        ].join(' ')}
        {...props}
      />
    <label htmlFor={`${label}-input`} 
      className={["absolute text-sm dark:text-gray-400 duration-300",
        "transform -translate-y-4.5 scale-90 top-2 z-10 origin-[0]",
        "bg-white dark:bg-gray-900 px-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
        error ? "text-red-400" : "text-slate-600",
      ].join(' ')}
    >
      {label} {required ? <span className="pl-0.5">*</span> : ''}
    </label>
  </div>
  );
}
