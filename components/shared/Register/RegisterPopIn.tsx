'use client';
import { useState } from "react";
import { RegisterPopIn as RegisterPopInProps } from "@/interfaces/RegisterPopIn";


const RegisterPopIn = ({ title, description, onSubmit, onCancel }: RegisterPopInProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{description}</p>
        <input
          type="text"
          placeholder="Entrez votre pseudo"
          className="input input-bordered w-full"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Valider
          </button>
          <button className="btn" onClick={onCancel}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPopIn;
