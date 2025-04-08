"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import imgOuvidoria from "../../public/004.jpg";

// Tipo para os dados da ouvidoria
type Inform = {
  infId: number;
  infLabel: string;
  infTitle: string;
  infEndereco: string;
  infComplemento: string;
  infTelefone: string;
  infHorario: string;
  infLink: string;
};

const CardOuvidoria = () => {
  const informs: Inform[] = [
    {
      infId: 1,
      infLabel: "Acesse o Sistema Eletrônico da Ouvidoria",
      infTitle: "Atendimento Físico da Ouvidoria",
      infEndereco:
        "Endereço: Rua Gervásio Pinheiro, APM, setor Solar Central Park - Aparecida de Goiânia Cidade Administrativa Maguito Vilela",
      infComplemento: "4º andar - Secretaria de Governo e Casa Civil",
      infTelefone: "Telefone: 3238-6792",
      infHorario:
        "Horário de Funcionamento: 08:00 às 11:30 e 13:00 às 17:00 (atendimento ao público)",
      infLink: "/acessoinformacao",
    },
  ];

  return (
    <div className="">
      {informs.map((inf) => (
        <div key={inf.infId} className="flex md:flex-col flex-col">
          <div className="mt-0 flex flex-col md:flex-row items-center justify-between rounded overflow-hidden shadow-2xl">
            <div className="w-auto">
              <Image src={imgOuvidoria} alt="Imagem da Ouvidoria" />
            </div>
            <div className="flex flex-col items-center">
              <div className="text-titlesm font-bold mt-5">{inf.infTitle}</div>
              <div className="font-semibold mt-10 ml-3 mr-3 md:ml-20 md:mr-20 flex items-center">
                {inf.infEndereco}
              </div>
              <div className="font-semibold mt-2 ml-3 mr-3 md:ml-20 md:mr-20 flex items-center">
                {inf.infComplemento}
              </div>
              <div className="font-semibold mt-2 ml-3 mr-3 md:ml-20 md:mr-20 flex items-center">
                {inf.infTelefone}
              </div>
              <div className="font-semibold mt-2 ml-3 mr-3 md:ml-20 md:mr-20 flex items-center">
                {inf.infHorario}
              </div>
              <div className="text-md bg-[#172554] text-white hover:bg-blue-300 hover:text-black flex flex-row items-center justify-center w-100 h-10 p-2 mt-16 mb-12 rounded-lg">
                <Link
                  href="https://sigp.aparecida.go.gov.br/sig/app.html#/servicosonline/ouvidoria2"
                  target="_blank"
                >
                  {inf.infLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardOuvidoria;
