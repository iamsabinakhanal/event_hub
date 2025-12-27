import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  register: any;
  name: string;
  error?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = "text", register, name, error, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <input {...register(name)} type={type} placeholder={placeholder} className="border p-2 w-full" />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
