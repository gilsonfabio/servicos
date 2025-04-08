'use client';
import React from 'react';

interface Breadcrumb {
  descricao: string;
}

interface Option {
  menId: string | number;
  menTitle: string;
  breadcrumbs: Breadcrumb[];
}

interface SubmenuProps {
  options: Option[];
}

const Submenu: React.FC<SubmenuProps> = ({ options }) => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="dark:bg-zinc-900">
      {options.map((option) => (
        <div key={option.menId}>
          <nav className="flex flex-row bg-white dark:bg-zinc-900 rounded-md mt-10 md:mt-16 ml-5 md:ml-20">
            <ul className="flex flex-row items-center">
              {option.breadcrumbs.map((breadcrumb, idx) => (
                <React.Fragment key={idx}>
                  <li>
                    <button
                      onClick={goBack}
                      className="text-green-600 hover:text-green-700 text-xs md:text-sm"
                    >
                      {breadcrumb.descricao}
                    </button>
                  </li>
                  <li className="text-gray-500 mx-1 md:mx-2">/</li>
                </React.Fragment>
              ))}
              <li className="text-gray-500 text-xs md:text-sm">{option.menTitle}</li>
            </ul>
          </nav>

          <div className="text-2xl md:text-4xl mb-3 font-bold ml-5 md:ml-20">
            {option.menTitle}
          </div>
        </div>
      ))}

      <div className="bg-gray-300 w-full h-12" />
    </div>
  );
};

export default Submenu;
