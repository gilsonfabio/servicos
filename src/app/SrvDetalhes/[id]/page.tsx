"use client"
import React, { use, useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Modal({ params }: { params: Promise<{ id: string }> }) {
  const [descricao, setDescricao] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [informacoes, setInformacoes] = useState('');
  const [requisitos, setRequisitos] = useState('');
  const [contatos, setContatos] = useState('');
  const [publico, setPublico] = useState('');
  const [prazo, setPrazo] = useState('');
  const [taxa, setTaxa] = useState('');
  const [acesso, setAcesso] = useState('');

  const [clickedInf, setClickedInf] = useState(false);
  const handleToggleInf = () => {
    setClickedInf((prev) => !prev);
  };

  const [clickedReq, setClickedReq] = useState(false);
  const handleToggleReq = () => {
    setClickedReq((prev) => !prev);
  };

  const [clickedCon, setClickedCon] = useState(false);
  const handleToggleCon = () => {
    setClickedCon((prev) => !prev);
  };

  const [clickedPub, setClickedPub] = useState(false);
  const handleTogglePub = () => {
    setClickedPub((prev) => !prev);
  };

  const [clickedPra, setClickedPra] = useState(false);
  const handleTogglePra = () => {
    setClickedPra((prev) => !prev);
  };

  const [clickedTax, setClickedTax] = useState(false);
  const handleToggleTax = () => {
    setClickedTax((prev) => !prev);
  };
  
  const [clickedGer, setClickedGer] = useState(true);
  const handleToggleGer = () => {
    setClickedGer((prev) => !prev);
  };

  const [loading, setLoading] = useState(true);

  const { id } = use(params); 
  
  const urlBase = process.env.URL_BASE_ACCESS;

  useEffect(() => {   
    const idSrv = id;

    axios.get(`https://www.aparecida.go.gov.br/wp-json/wp/v2/servicos/${idSrv}`)
    .then(response => {
        setDescricao(response.data.nome);
        setObjetivo(response.data.descricao.replace(/\r\n/g, "<br />"));
        setInformacoes(response.data.instrucao.replace(/\r\n/g, "<br />"));
        setRequisitos(response.data.requisitos.replace(/\r\n/g, "<br />"));
        setContatos(response.data.contatos.replace(/\r\n/g, "<br />"));
        setPublico(response.data.publico_alvo.replace(/\r\n/g, "<br />"));
        setPrazo(response.data.prazo.replace(/\r\n/g, "<br />"));
        setTaxa(response.data.taxa.replace(/\r\n/g, "<br />"));
        setAcesso(response.data.acesso.replace(/\r\n/g, "<br />"));
    })
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
     
  }, []);
    
  if (loading) {
    return <p>Carregando...</p>;
  }
   
  function goBack() {
    window.history.back()
  }

  return (
    <div className='flex flex-col justify-between w-full h-full px-2 md:px-20 '>
      <div className='flex flex-col w-full '>
        <h1 className='text-lg md:text-2xl font-bold text-blue-600 dark:text-white mt-5 mb-3 w-full'>{descricao}</h1>
        <div className='flex flex-row items-center w-full'>
          <button onClick={goBack} className="bg-white text-blue-600 border border-blue-400 hover:bg-[#172554] hover:text-white flex flex-row items-center justify-center ml-0 mr-10 md:ml-0 w-20 md:w-52 h-10 p-2 rounded-lg" >
            <span className='text-sm md:text-base font-bold'>Voltar</span>
          </button>
          <div className={!acesso ? "hidden" : ""}>
            <Link href={`${acesso}`}>
              <div className='flex items-center justify-center bg-[#172554] h-10 w-52 rounded-lg hover:bg-white hover:text-blue-600 border border-blue-800'>
                <span className='px-2 text-white hover:text-blue-600 font-semibold '>Acesse o serviço online</span>
              </div>  
            </Link>
          </div>  
        </div>  
      </div>
      <div className='flex flex-col w-full h-60 mt-2 py-4 px-2 bg-gray-100 dark:bg-white rounded-2xl overflow-hidden shadow-2xl'>
        <span className='text-lg md:text-2xl text-blue-700 font-bold mt-1 dark:text-black '>Objetivo:</span>
        <span className='text-lg md:text-2xl font-normal mt-2 dark:text-black' dangerouslySetInnerHTML={{ __html: objetivo }} />
      </div>      
      
      <div className='mb-6'>
        <li className={`accordion_item ${clickedGer ? "active mb-2" : ""} list-none`}>
          <button className={clickedGer ? "button p-2 text-blue-700 font-bold text-left bg-gray-300 dark:bg-white dark:text-black hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 shadow-lg rounded-t-lg" : 
            "button p-2 text-blue-700 font-bold text-left bg-gray-300 dark:bg-white dark:text-black hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 shadow-lg rounded-lg"}
            onClick={handleToggleGer}>
            <span className='text-lg'>Informações do Serviço</span>
            <span className="control text-2xl">{clickedGer ? "—" : "+"} </span>
          </button>
          <div className={`answer_wrapper ${clickedGer ? "active h-auto p-2 mb-5 bg-gray-200 dark:bg-white dark:text-black rounded-b-lg " : "hidden"}`}> 
            <div className={`answer ${clickedGer ? "active" : "hidden"}` }>
              <div className="h-auto">
                <div className={informacoes === "" ? "hidden" : "mb-0"}>
                  <div className={`accordion_item ${clickedInf ? "active mb-2" : ""} list-none`}>
                    <button className={clickedInf ? "button p-2 text-blue-700 font-bold  text-left hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 " : 
                      "button p-2 text-blue-700 font-bold text-left hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 "}
                      onClick={handleToggleInf}>
                      <span className='text-lg'>Instruções</span>
                      <span className="control text-2xl">{clickedInf ? "—" : "+"} </span>
                    </button>
                    <div className={`answer_wrapper ${clickedInf ? "active h-auto p-2 mb-5 dark:text-black " : "hidden"}`}> 
                      <div className={`answer ${clickedInf ? "active" : "hidden"}` }>
                        <div className="h-auto">
                          <span dangerouslySetInnerHTML={{ __html: informacoes }} />
                        </div>   
                      </div>
                    </div>
                  </div>
                  <div className='border border-b-blue-600'></div>                                
                </div>     
                <div className={requisitos === "" ? "hidden" : "mb-0"}>
                  <div className={`accordion_item ${clickedReq ? "active mb-2" : ""} list-none`}>
                    <button className={clickedReq ? "button p-2 text-blue-700 font-bold text-left hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 " : 
                      "button p-2 text-blue-700 font-bold text-left hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 "}
                      onClick={handleToggleReq}>
                      <span className='text-lg'>Requisitos</span>
                      <span className="control text-2xl">{clickedReq ? "—" : "+"} </span>
                    </button>
                    <div className={`answer_wrapper ${clickedReq ? "active h-auto p-2 mb-5 " : "hidden"}`}> 
                      <div className={`answer ${clickedReq ? "active" : "hidden"}` }>
                        <div className="h-auto">
                          <span className='mt-6 dark:text-black' dangerouslySetInnerHTML={{ __html: requisitos}} />
                        </div>   
                      </div>
                    </div>
                  </div>
                  <div className='border border-b-blue-600'></div>                                
                </div>
                <div className={contatos === "" ? "hidden" : "mb-0"}>
                  <div className={`accordion_item ${clickedCon ? "active mb-2" : ""} list-none`}>
                    <button className={clickedCon ? "button p-2 text-blue-700 font-bold text-left hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 " : 
                      "button p-2 text-blue-700 font-bold text-left hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 "}
                      onClick={handleToggleCon}>
                      <span className='text-lg'>Contatos</span>
                      <span className="control text-2xl">{clickedCon ? "—" : "+"} </span>
                    </button>
                    <div className={`answer_wrapper ${clickedCon ? "active h-auto p-2 mb-5 " : "hidden"}`}> 
                      <div className={`answer ${clickedCon ? "active" : "hidden"}` }>
                        <div className="h-auto">
                          <span className='mt-6 dark:text-black' dangerouslySetInnerHTML={{ __html: contatos}} />
                        </div>   
                      </div>
                    </div>
                  </div>
                  <div className='border border-b-blue-600'></div>                                
                </div>
                <div className={publico === "" ? "hidden" : "mb-0"}>
                  <div className={`accordion_item ${clickedPub ? "active mb-2" : ""} list-none`}>
                    <button className={clickedPub ? "button p-2 text-blue-700 font-bold text-left hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6" : 
                      "button p-2 text-blue-700 font-bold text-left hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6"}
                      onClick={handleTogglePub}>
                      <span className='text-lg'>Público-alvo</span>
                      <span className="control text-2xl">{clickedPub ? "—" : "+"} </span>
                    </button>
                    <div className={`answer_wrapper ${clickedPub ? "active h-auto p-2 mb-5 dark:text-black " : "hidden"}`}> 
                      <div className={`answer ${clickedPub ? "active" : "hidden"}` }>
                        <div className="h-auto">
                          <span className='mt-6 dark:text-black' dangerouslySetInnerHTML={{ __html: publico}} />
                        </div>   
                      </div>
                    </div>
                  </div>    
                  <div className='border border-b-blue-600'></div>                            
                </div>
                <div className={prazo === "" ? "hidden" : "mb-0"}>
                  <div className={`accordion_item ${clickedPra ? "active mb-2" : ""} list-none`}>
                    <button className={clickedPra ? "button p-2 text-blue-700 font-bold text-left hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 " : 
                      "button p-2 text-blue-700 font-bold text-left hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 "}
                      onClick={handleTogglePra}>
                      <span className='text-lg'>Prazo</span>
                      <span className="control text-2xl">{clickedPra ? "—" : "+"} </span>
                    </button>
                    <div className={`answer_wrapper ${clickedPra ? "active h-auto p-2 mb-5 " : "hidden"}`}> 
                      <div className={`answer ${clickedPra ? "active" : "hidden"}` }>
                        <div className="h-auto">
                          <span className='mt-6 dark:text-black' dangerouslySetInnerHTML={{ __html: prazo}} />
                        </div>   
                      </div>
                    </div>
                  </div>                                
                  <div className='border border-b-blue-600'></div>
                </div>
                <div className={taxa === "" ? "hidden" : "mb-0"}>
                  <div className={`accordion_item ${clickedTax ? "active mb-2" : ""} list-none`}>
                    <button className={clickedTax ? "button p-2 text-blue-700 font-bold text-left hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 " : 
                      "button p-2 text-blue-700 font-bold text-left hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 "}
                      onClick={handleToggleTax}>
                      <span className='text-lg'>Taxa</span>
                      <span className="control text-2xl">{clickedTax ? "—" : "+"} </span>
                    </button>
                    <div className={`answer_wrapper ${clickedTax ? "active h-auto p-2 mb-5 " : "hidden"}`}> 
                      <div className={`answer ${clickedTax ? "active" : "hidden"}` }>
                        <div className="h-auto">
                        <span className='mt-6 dark:text-black' dangerouslySetInnerHTML={{ __html: taxa}} />
                        </div>   
                      </div>
                    </div>
                  </div>                                
                  <div className='border border-b-blue-600'></div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </div>                
    </div>       
  )  
}


