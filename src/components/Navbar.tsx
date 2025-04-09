"use client";

import React, { useState } from 'react';
import { useTheme } from "next-themes";
import Image from 'next/image';
import Link from "next/link";

import { FaEllipsisV, FaTimes, FaAdjust, FaUniversalAccess } from 'react-icons/fa';

import logoBarra from '../../public/logo-barra.png';

interface NavbarProps {
  bgColor: string;
  button: React.ReactNode;
  showButton: boolean;
  btnMap: React.ReactNode;
  showBtnMap: boolean;
  btnInf: React.ReactNode;
  showBtnInf: boolean;
}

export default function Navbar({
  bgColor,
  button,
  showButton,
  btnMap,
  showBtnMap,
  btnInf,
  showBtnInf,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleFontLarge = () => {
    const root = document.querySelector('html');
    if (root) {
      const currentSize = parseInt(getComputedStyle(root).fontSize);
      const newSize = currentSize + 2;
      root.style.fontSize = `${newSize}px`;
    }
  };

  const handleFontSmall = () => {
    const root = document.querySelector('html');
    if (root) {
      const currentSize = parseInt(getComputedStyle(root).fontSize);
      const newSize = currentSize - 2;
      root.style.fontSize = `${newSize}px`;
    }
  };

  return (
    <div>
      <div className={`flex flex-row items-center justify-between w-full h-24 bg-blue-950 dark:bg-black text-white px-2 md:px-20 z-10`}>
        <Link href="https://www.aparecida.go.gov.br/" passHref >
          <Image src={logoBarra} alt="Logo Aparecida" className="w-56 md:w-72 md:h-18" />
        </Link>

        <span className="text-white text-xl md:text-2xl font-semibold">Carta de Serviços</span>

        {/* Menu Desktop */}
        <div className="hidden md:block">
          <div className="ml-10 flex items-center space-x-4">
            {showButton && button}
            {showBtnMap && btnMap}
            {showBtnInf && btnInf}

            <button
              className="btn px-2 text-white text-xs uppercase rounded hover:text-gray-600 transition duration-150" onClick={handleFontSmall}>
              <p className="text-xl">A-</p>
            </button>

            <button
              className="btn px-2 text-white text-xs uppercase rounded hover:text-gray-600 transition duration-150" onClick={handleFontLarge}>
              <p className="text-xl">A+</p>
            </button>

            <button
              className="text-white hover:text-gray-400 px-3 py-2 text-sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <FaAdjust className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        <div className={`md:hidden flex flex-col w-12 p-3 ${bgColor} dark:bg-black items-center justify-between gap-5 z-20 ${isOpen ? 'mt-60' : 'mt-4'}`}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <FaTimes className="w-5 h-5" /> : <FaEllipsisV className="w-5 h-5" />}
          </button>

          {isOpen && (
            <>
              {showButton && (
                <Link href="../../Acessibilidade" passHref className="flex items-center text-white hover:text-gray-500">
                  <FaUniversalAccess className="w-4 h-4" />
                </Link>
              )}
              {showBtnMap && btnMap}
              {showBtnInf && btnInf}

              <button
                className="text-white text-xs uppercase rounded hover:text-gray-600 transition"
                onClick={handleFontSmall}
              >
                <p className="text-xl">A-</p>
              </button>

              <button
                className="text-white text-xs uppercase rounded hover:text-gray-600 transition"
                onClick={handleFontLarge}
              >
                <p className="text-xl">A+</p>
              </button>

              <button
                className="text-white hover:text-gray-500 text-sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <FaAdjust className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
