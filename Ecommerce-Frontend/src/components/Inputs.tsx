import React, { ChangeEvent } from 'react';

interface InputsProps {
  label: string;
  type: string;
  value: string | number |undefined;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string; // id is optional
}

const Inputs: React.FC<InputsProps> = ({ label, type, value, placeholder, onChange, id }) => {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-gray-600">
        {label}
      </label>
      <input
        id={id}
        className="w-full px-4 py-2 rounded-md border bg-transparent border-gray-400 outline-none text-sm"
        required
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Inputs;
