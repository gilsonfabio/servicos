'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Sidemenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Botão para abrir o menu */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 m-4 bg-gray-800 text-white rounded-md focus:outline-none"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Menu lateral */}
      <div 
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 p-5 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute top-4 right-4 text-white"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold mb-6">Menu</h2>
        <ul>
          <li className="mb-4"><a href="#" className="hover:underline">Início</a></li>
          <li className="mb-4"><a href="#" className="hover:underline">Sobre</a></li>
          <li className="mb-4"><a href="#" className="hover:underline">Serviços</a></li>
          <li className="mb-4"><a href="#" className="hover:underline">Contato</a></li>
        </ul>
      </div>
    </div>
  );
}
