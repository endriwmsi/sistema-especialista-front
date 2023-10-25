import React from 'react';

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className='bg-transparent border-b-2 border-zinc-800 focus:ring-0 selected:ring-0'
    />
  );
};

export default Input;
