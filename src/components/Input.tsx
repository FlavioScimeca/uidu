'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
  disabled?: boolean;
}

const Input = ({
  label,
  id,
  type = 'string',
  register,
  required,
  errors,
  disabled,
}: InputProps) => {
  return (
    <>
      <label htmlFor={id} className="font-medium leading-6">
        {label}
      </label>
      <div className="mt-2">
        <input
          disabled={disabled}
          id={id}
          {...register(id, { required: required })}
          className={`
            block
            w-full
            rounded-md 
            border-0 
            py-2
            shadow-sm 
            ${disabled && 'opacity-50 cursor-default'}
          `}
          type={type}
        />
      </div>
    </>
  );
};

export default Input;
