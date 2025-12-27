import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  register: any;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = "text", name, register, error }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-gray-700 font-medium">{label}</label>
      <input
        {...register(name)}
        type={type}
        className={`w-full p-3 rounded-lg border ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
