"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';

import Image from 'next/image';
import api from '@/components/Services/api';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import Pagination from '@/components/Pagination';
import { Menu, X } from 'lucide-react';
import CardOuvidoria from '@/components/CardOuvidoria';

type Personas = {
    "id": number;
	"slug": string;
    "nome": string;
}

type TemasProps = {
    "id": number;
	"name": string;
}

type SecretariaProps = {
    "id": number;
    "slug": string;
}

type Localidade = {
    id: number;
    nome: string;
};
  
type Secretaria = {
    id: number;
    nome: string;
};
  
type Persona = {
    id: number;
    tipo: string;
};
  
type Tema = {
    id: number;
    titulo: string;
    icone: string;
};

type ServicesProps = {
    pagination: {
      page: number;
      per_page: number;
      lastPage: number;
      countUser: number;
      offset: number;
    };
    id: number; 
    nome: string; 
    descricao: string; 
    instrucao: string; 
    link: string; 
    acesso: string;
    localidade: Localidade[];
    secretaria: Secretaria[];
    persona: Persona[];
    tema: Tema[];
};

interface filtros {
    "modalidade"?: Array<number>;
    "tipo"?: Array<number>;
    "secretaria"?: Array<number>;
    "searchString"?: string;
    "page"?: number;
    "per_page"?: number;
}

export default function Home() {
    const [atualiza, setAtualiza] = useState(0);  
    const [isOpen, setIsOpen] = useState(false);
    const [modalidades, setModalidades] = useState<Array<Personas>>([]);
    const [tipos, setTipos] = useState<Array<TemasProps>>([]);
    const [servicos, setServicos] = useState<Array<ServicesProps>>([]);
    const [secretarias, setSecretarias] = useState<Array<SecretariaProps>>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [pagDefault, setPagDefault] = useState(0);
    const perPageDefault = 12;
    const [newPage, setNewPage] = useState(0);

    const [clicked, setClicked] = useState(true);
    const handleToggle = () => {
        setClicked((prev) => !prev);
    };

    const [clickedTip, setClickedTip] = useState(true);
    const handleToggleTip = () => {
        setClickedTip((prev) => !prev);
    };

    const [clickedSec, setClickedSec] = useState(true);
    const handleToggleSec = () => {
        setClickedSec((prev) => !prev);
    };

    const [idsMod, setIdsMod] = useState<Array<number>>([]);
    const [idsTip, setIdsTip] = useState<Array<number>>([]);
    const [idsSec, setIdsSec] = useState<Array<number>>([]);
    const [search, setSearch] = useState('');

    //const itemsCard2 = [
    //    {carId: 4, carTitle: 'Fale com a Ouvidoria', carTexto: 'Acesse o Sistema Eletrônico', carLink: 'https://sigp.aparecida.go.gov.br/sig/app.html#/servicosonline/ouvidoria2', carImage:'004'},     
    //]  

    const [busca, setBusca] = useState<Array<ServicesProps>>([]);

    const urlBase = process.env.URL_BASE_ACCESS;
    
    const testeJson:filtros = {
        modalidade: [],
        tipo: [],
        secretaria: [],        
        searchString: "",
        page: 1,
        per_page: 12
    }   
    
    useEffect(() => {   
        delete testeJson.modalidade;
        delete testeJson.tipo;     
        delete testeJson.secretaria;        
        delete testeJson.searchString;
        delete testeJson.page;
        testeJson.page = 1;
        delete testeJson.per_page;
        testeJson.per_page = perPageDefault;
        
        setPagDefault(12);

        console.log(testeJson);

        axios({
            method: 'get',    
            url: `${urlBase}/servicos?per_page=${perPageDefault}&page=${currentPage}`,            
        }).then(function(response) {
            setServicos(response.data)
            setPages(Number(response.headers["x-wp-totalpages"]));
        }).catch(function(error) {
            console.log(error)
        })
      
        api.get("/personas?_fields=id,slug,nome").then(res => {
            setModalidades(res.data)           
        }).catch((err) => {
            console.error("ops! ocorreu um erro modalidades" + err);
        });    
     
        api.get("/tema?_fields=id,name").then(res => {
            setTipos(res.data)           
        }).catch((err) => {
            console.error("ops! ocorreu um erro temas" + err);
        }); 

        api.get("/secretarias").then(resp => {
            setSecretarias(resp.data)           
        }).catch((err) => {
            console.error("ops! ocorreu um erro secretarias" + err);
        }); 
        
        setAtualiza(1);      
    }, [])

    useEffect(() => {
        setCurrentPage(1);      
        if(atualiza === 1) {
            if (idsMod.length === 0 && idsSec.length === 0 && idsTip.length === 0 ) {
                console.log('filtro: 1')
                axios({
                    method: 'get',    
                    url: `${urlBase}per_page=${perPageDefault}&page=${currentPage}`,
                }).then(function(response) {
                    setServicos(response.data)
                    setPages(Number(response.headers["x-wp-totalpages"]));
                }).catch(function(error) {
                    console.log(error)
                })
            }else 
                if (idsMod.length !== 0 && idsSec.length === 0 && idsTip.length === 0 ) {
                    console.log('filtro: 2')
                    axios({
                        method: 'get',    
                        url: `${urlBase}persona=${idsMod}&per_page=${perPageDefault}&page=${currentPage}`,
                    }).then(function(response) {
                        setServicos(response.data)
                        setPages(Number(response.headers["x-wp-totalpages"]));
                    }).catch(function(error) {
                        console.log(error)
                    })
                }else {
                    if (idsMod.length !== 0 && idsSec.length !== 0 && idsTip.length === 0 ) {
                        console.log('filtro: 3')
                        axios({
                            method: 'get',    
                            url: `${urlBase}persona=${idsMod}&secretaria=${idsSec}&per_page=${perPageDefault}&page=${currentPage}`,
                        }).then(function(response) {
                            setServicos(response.data)
                            setPages(Number(response.headers["x-wp-totalpages"]));
                        }).catch(function(error) {
                            console.log(error)
                        })
                    }else {
                        if (idsMod.length !== 0 && idsSec.length !== 0 && idsTip.length !== 0 ) {
                            console.log('filtro: 4')
                            axios({
                                method: 'get',    
                                url: `${urlBase}persona=${idsMod}&secretaria=${idsSec}&temas=${idsTip}&per_page=${perPageDefault}&page=${currentPage}`,
                            }).then(function(response) {
                                setServicos(response.data)
                                setPages(Number(response.headers["x-wp-totalpages"]));
                            }).catch(function(error) {
                                console.log(error)
                            })
                        }else {
                            if (idsMod.length === 0 && idsSec.length !== 0 && idsTip.length !== 0 ) {
                                console.log('filtro: 5')
                                axios({
                                    method: 'get',    
                                    url: `${urlBase}secretaria=${idsSec}&temas=${idsTip}&per_page=${perPageDefault}&page=${currentPage}`,
                                }).then(function(response) {
                                    setServicos(response.data)
                                    setPages(Number(response.headers["x-wp-totalpages"]));
                                }).catch(function(error) {
                                    console.log(error)
                                })
                            }else {
                                if (idsMod.length === 0 && idsSec.length !== 0 && idsTip.length === 0 ) {
                                    console.log('filtro: 6')
                                    axios({
                                        method: 'get',    
                                        url: `${urlBase}secretaria=${idsSec}&per_page=${perPageDefault}&page=${currentPage}`,
                                    }).then(function(response) {
                                        setServicos(response.data)
                                        setPages(Number(response.headers["x-wp-totalpages"]));
                                    }).catch(function(error) {
                                        console.log(error)
                                    })
                                }else {
                                    if (idsMod.length === 0 && idsSec.length === 0 && idsTip.length !== 0 ) {
                                        console.log('filtro: 7')
                                        axios({
                                            method: 'get',    
                                            url: `${urlBase}temas=${idsTip}&per_page=${perPageDefault}&page=${currentPage}`,
                                        }).then(function(response) {
                                            setServicos(response.data)
                                            setPages(Number(response.headers["x-wp-totalpages"]));
                                        }).catch(function(error) {
                                            console.log(error)
                                        })
                                    }else {
                                        if (idsMod.length !== 0 && idsSec.length === 0 && idsTip.length !== 0 ) {
                                            console.log('filtro: 8')
                                            axios({
                                                method: 'get',    
                                                url: `${urlBase}persona=${idsMod}&temas=${idsTip}&per_page=${perPageDefault}&page=${currentPage}`,
                                            }).then(function(response) {
                                                setServicos(response.data)
                                                setPages(Number(response.headers["x-wp-totalpages"]));
                                            }).catch(function(error) {
                                                console.log(error)
                                            })
                                        }
                                    }
                                }
                            }
                        }
                    } 
                } 
            }    
    }, [idsMod, idsTip, idsSec, search])

    useEffect(() => {      
        if(atualiza === 1) {
            if (idsMod.length === 0 && idsSec.length === 0 && idsTip.length === 0 ) {
                console.log('filtro: 1')
                axios({
                    method: 'get',    
                    url: `${urlBase}per_page=${perPageDefault}&page=${currentPage}`,
                }).then(function(response) {
                    setServicos(response.data)
                }).catch(function(error) {
                    console.log(error)
                })
            }else 
                if (idsMod.length !== 0 && idsSec.length === 0 && idsTip.length === 0 ) {
                    console.log('filtro: 2')
                    axios({
                        method: 'get',    
                        url: `${urlBase}persona=${idsMod}&per_page=${perPageDefault}&page=${currentPage}`,
                    }).then(function(response) {
                        setServicos(response.data)
                    }).catch(function(error) {
                        console.log(error)
                    })
                }else {
                    if (idsMod.length !== 0 && idsSec.length !== 0 && idsTip.length === 0 ) {
                        console.log('filtro: 3')
                        axios({
                            method: 'get',    
                            url: `${urlBase}persona=${idsMod}&secretaria=${idsSec}&per_page=${perPageDefault}&page=${currentPage}`,
                        }).then(function(response) {
                            setServicos(response.data)
                        }).catch(function(error) {
                            console.log(error)
                        })
                    }else {
                        if (idsMod.length !== 0 && idsSec.length !== 0 && idsTip.length !== 0 ) {
                            console.log('filtro: 4')
                            axios({
                                method: 'get',    
                                url: `${urlBase}persona=${idsMod}&secretaria=${idsSec}&temas=${idsTip}&per_page=${perPageDefault}&page=${currentPage}`,
                            }).then(function(response) {
                                setServicos(response.data)
                            }).catch(function(error) {
                                console.log(error)
                            })
                        }else {
                            if (idsMod.length === 0 && idsSec.length !== 0 && idsTip.length !== 0 ) {
                                console.log('filtro: 5')
                                axios({
                                    method: 'get',    
                                    url: `${urlBase}secretaria=${idsSec}&temas=${idsTip}&per_page=${perPageDefault}&page=${currentPage}`,
                                }).then(function(response) {
                                    setServicos(response.data)
                                }).catch(function(error) {
                                    console.log(error)
                                })
                            }else {
                                if (idsMod.length === 0 && idsSec.length !== 0 && idsTip.length === 0 ) {
                                    console.log('filtro: 6')
                                    axios({
                                        method: 'get',    
                                        url: `${urlBase}secretaria=${idsSec}&per_page=${perPageDefault}&page=${currentPage}`,
                                    }).then(function(response) {
                                        setServicos(response.data)
                                    }).catch(function(error) {
                                        console.log(error)
                                    })
                                }else {
                                    if (idsMod.length === 0 && idsSec.length === 0 && idsTip.length !== 0 ) {
                                        console.log('filtro: 7')
                                        axios({
                                            method: 'get',    
                                            url: `${urlBase}temas=${idsTip}&per_page=${perPageDefault}&page=${currentPage}`,
                                        }).then(function(response) {
                                            setServicos(response.data)
                                        }).catch(function(error) {
                                            console.log(error)
                                        })
                                    }else {
                                        if (idsMod.length !== 0 && idsSec.length === 0 && idsTip.length !== 0 ) {
                                            console.log('filtro: 8')
                                            axios({
                                                method: 'get',    
                                                url: `${urlBase}persona=${idsMod}&temas=${idsTip}&per_page=${perPageDefault}&page=${currentPage}`,
                                            }).then(function(response) {
                                                setServicos(response.data)
                                            }).catch(function(error) {
                                                console.log(error)
                                            })
                                        }
                                    }
                                }
                            }
                        }
                    } 
                } 
            }    
    }, [currentPage])

    useEffect(() => {
        setCurrentPage(1);      
        if(atualiza === 1) {
            if (idsMod.length === 0 && idsSec.length === 0 && idsTip.length === 0 ) {
                console.log('filtro: 1')
                axios({
                    method: 'get',    
                    url: `${urlBase}per_page=${perPageDefault}&page=${currentPage}`,
                }).then(function(response) {
                    setServicos(response.data)
                    setPages(Number(response.headers["x-wp-totalpages"]));
                }).catch(function(error) {
                    console.log(error)
                })
            }else 
                if (idsMod.length !== 0 && idsSec.length === 0 && idsTip.length === 0 ) {
                    console.log('filtro: 2')
                    axios({
                        method: 'get',    
                        url: `${urlBase}persona=${idsMod}&per_page=${perPageDefault}&page=${currentPage}`,
                    }).then(function(response) {
                        setServicos(response.data)
                        setPages(Number(response.headers["x-wp-totalpages"]));
                    }).catch(function(error) {
                        console.log(error)
                    })
                }else {
                    if (idsMod.length !== 0 && idsSec.length !== 0 && idsTip.length === 0 ) {
                        console.log('filtro: 3')
                        axios({
                            method: 'get',    
                            url: `${urlBase}persona=${idsMod}&secretaria=${idsSec}&per_page=${perPageDefault}&page=${currentPage}`,
                        }).then(function(response) {
                            setServicos(response.data)
                            setPages(Number(response.headers["x-wp-totalpages"]));
                        }).catch(function(error) {
                            console.log(error)
                        })
                    }else {
                        if (idsMod.length !== 0 && idsSec.length !== 0 && idsTip.length !== 0 ) {
                            console.log('filtro: 4')
                            axios({
                                method: 'get',    
                                url: `${urlBase}persona=${idsMod}&secretaria=${idsSec}&temas=${idsTip}&per_page=${perPageDefault}&page=${currentPage}`,
                            }).then(function(response) {
                                setServicos(response.data)
                                setPages(Number(response.headers["x-wp-totalpages"]));
                            }).catch(function(error) {
                                console.log(error)
                            })
                        }else {
                            if (idsMod.length === 0 && idsSec.length !== 0 && idsTip.length !== 0 ) {
                                console.log('filtro: 5')
                                axios({
                                    method: 'get',    
                                    url: `${urlBase}secretaria=${idsSec}&temas=${idsTip}&per_page=${perPageDefault}&page=${currentPage}`,
                                }).then(function(response) {
                                    setServicos(response.data)
                                    setPages(Number(response.headers["x-wp-totalpages"]));
                                }).catch(function(error) {
                                    console.log(error)
                                })
                            }else {
                                if (idsMod.length === 0 && idsSec.length !== 0 && idsTip.length === 0 ) {
                                    console.log('filtro: 6')
                                    axios({
                                        method: 'get',    
                                        url: `${urlBase}secretaria=${idsSec}&per_page=${perPageDefault}&page=${currentPage}`,
                                    }).then(function(response) {
                                        setServicos(response.data)
                                        setPages(Number(response.headers["x-wp-totalpages"]));
                                    }).catch(function(error) {
                                        console.log(error)
                                    })
                                }else {
                                    if (idsMod.length === 0 && idsSec.length === 0 && idsTip.length !== 0 ) {
                                        console.log('filtro: 7')
                                        axios({
                                            method: 'get',    
                                            url: `${urlBase}temas=${idsTip}&per_page=${perPageDefault}&page=${currentPage}`,
                                        }).then(function(response) {
                                            setServicos(response.data)
                                            setPages(Number(response.headers["x-wp-totalpages"]));
                                        }).catch(function(error) {
                                            console.log(error)
                                        })
                                    }else {
                                        if (idsMod.length !== 0 && idsSec.length === 0 && idsTip.length !== 0 ) {
                                            console.log('filtro: 8')
                                            axios({
                                                method: 'get',    
                                                url: `${urlBase}persona=${idsMod}&temas=${idsTip}&per_page=${perPageDefault}&page=${currentPage}`,
                                            }).then(function(response) {
                                                setServicos(response.data)
                                                setPages(Number(response.headers["x-wp-totalpages"]));
                                            }).catch(function(error) {
                                                console.log(error)
                                            })
                                        }
                                    }
                                }
                            }
                        }
                    } 
                } 
            }    
    }, [idsMod, idsTip, idsSec])

    useEffect(() => {      
        if(atualiza === 1) {
            axios({
                method: 'get',    
                url: `${urlBase}per_page=${perPageDefault}&page=${currentPage}`,
            }).then(function(response) {
                setBusca(response.data)
                const regex = new RegExp(search, "i");
                const resultado = busca.filter(item => regex.test(item.descricao));    
                setServicos(resultado)    
                setPages(Number(response.headers["x-wp-totalpages"]));       
            }).catch(function(error) {
                console.log(error)
            })
        }    
    }, [search])

    const selectModalidade = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedId = parseInt(event.target.value);
        if (idsMod.includes(selectedId)) {
            const newIds = idsMod.filter((id) => id !== selectedId);
            setIdsMod(newIds);
        } else {
            const newIds = [...idsMod];
            newIds.push(selectedId);
            setIdsMod(newIds);
        }
    };

    const selectTipo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = parseInt(event.target.value);
    if (idsTip.includes(selectedId)) {
        const newIds = idsTip.filter((id) => id !== selectedId);
        setIdsTip(newIds);
    } else {
        const newIds = [...idsTip];
        newIds.push(selectedId);
        setIdsTip(newIds);
        }   
    };

    const selectSecretaria = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = parseInt(event.target.value);
    if (idsSec.includes(selectedId)) {
        const newIds = idsSec.filter((id) => id !== selectedId);
        setIdsSec(newIds);
    } else {
        const newIds = [...idsSec];
        newIds.push(selectedId);
        setIdsSec(newIds);
        }   
    };

    function handleSearch() {
        setAtualiza(1);
    }
    
    return (
        <div className='flex flex-col w-full h-auto bg-gray-200 dark:bg-black'>
            <div className='flex flex-col md:flex-row w-full h-auto'>
                <div className='flex flex-col justify-center md:justify-normal md:w-[25%] w-full h-16 md:h-auto bg-gray-300'>
                    <div className='hidden md:block pl-20'>
                        <span className="text-[#2563eb] dark:text-white text-lg font-semibold ml-3 md:ml-0">
                            Filtro de Serviços
                        </span>
                        <div className="hidden md:block">
                            <div className='w-[80%] mt-0 mb-3 z-40'>
                                <div>
                                    <li className={`accordion_item ${clicked ? "active mb-2" : ""} list-none`}>
                                        <button className={clicked ? "button p-2 text-[#2563eb] font-bold text-left bg-gray-200 dark:bg-white dark:text-black border-l-2 border-gray-400 hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 shadow-lg rounded-t-lg" : 
                                        "button p-2 text-[#2563eb] font-bold text-left bg-gray-200 dark:bg-white dark:text-black border-l-2 border-gray-400 hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 shadow-lg rounded-lg"}
                                            onClick={handleToggle}>
                                            Persona
                                            <span className="control">{clicked ? "—" : "+"} </span>
                                        </button>
                                        <div className={`answer_wrapper ${clicked ? "active h-40 p-2 mb-5 bg-gray-200 dark:bg-white dark:text-black border-l-2 border-gray-400 rounded-b-lg overflow-y-scroll" : "hidden"}`}> 
                                            <div className={`answer ${clicked ? "active" : "hidden"}` }>
                                                <div className="h-auto">
                                                    {modalidades.map((item) => (
                                                    <div key={item.id} className='flex flex-row justify-between items-center w-full mb-2'>
                                                        <span className="text-md font-semibold">{item.nome}</span>
                                                        <input
                                                            className="cursor-pointer"
                                                            type="checkbox"
                                                            value={item.id}
                                                            onChange={selectModalidade}
                                                            checked={idsMod.includes(item.id) ? true : false}
                                                        />
                                                    </div>
                                                    ))}
                                                </div>  
                                            </div>
                                        </div>
                                    </li>                                
                                </div> 
                            </div>
                            <div className='w-[80%] mt-0 mb-3 z-40 ml-3 md:ml-0'>
                                <div>
                                    <li className={`accordion_item ${clickedTip ? "active mb-2" : ""} list-none`}>
                                        <button className={clickedTip ? "button p-2 text-[#2563eb] font-bold text-left bg-gray-200 dark:bg-white dark:text-black border-l-2 border-gray-400 hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 shadow-lg rounded-t-lg" : 
                                            "button p-2 text-[#2563eb] font-bold text-left bg-gray-200 dark:bg-white dark:text-black border-l-2 border-gray-400 hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 shadow-lg rounded-lg"}
                                            onClick={handleToggleTip}>
                                            Temas
                                            <span className="control">{clickedTip ? "—" : "+"} </span>
                                        </button>
                                        <div className={`answer_wrapper ${clickedTip ? "active h-40 p-2 mb-5 bg-gray-200 dark:bg-white dark:text-black border-l-2 border-gray-400 rounded-b-lg overflow-y-scroll" : "hidden"}`}> 
                                            <div className={`answer ${clickedTip ? "active" : "hidden"}` }>
                                                <div className="h-auto">
                                                    {tipos.map((item) => (
                                                    <div key={item.id} className='flex flex-row justify-between items-center w-full mb-2'>
                                                        <span className="text-md font-semibold">{item.name}</span>
                                                        <input
                                                            className="cursor-pointer"
                                                            type="checkbox"
                                                            value={item.id}
                                                            onChange={selectTipo}
                                                            checked={idsTip.includes(item.id) ? true : false}
                                                        />
                                                    </div>
                                                    ))}
                                                </div>  
                                            </div>
                                        </div>
                                    </li>                                
                                </div>
                            </div>                            
                            <div className='w-[80%] mt-0 mb-3 z-40 ml-3 md:ml-0'>
                                <div>
                                    <li className={`accordion_item ${clickedSec ? "active mb-2" : ""} list-none`}>
                                        <button className={clickedSec ? "button p-2 text-[#2563eb] font-bold text-left bg-gray-200 dark:bg-white dark:text-black border-l-2 border-gray-400 hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 shadow-lg rounded-t-lg" : 
                                            "button p-2 text-[#2563eb] font-bold text-left bg-gray-200 dark:bg-white dark:text-black border-l-2 border-gray-400 hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 shadow-lg rounded-lg"}
                                            onClick={handleToggleSec}>
                                            Orgão Responsável
                                            <span className="control">{clickedSec ? "—" : "+"} </span>
                                        </button>
                                        <div className={`answer_wrapper ${clickedSec ? "active h-40 p-2 mb-5 bg-gray-200 dark:bg-white dark:text-black border-l-2 border-gray-400 rounded-b-lg overflow-y-scroll" : "hidden"}`}> 
                                            <div className={`answer ${clickedSec ? "active" : "hidden"}` }>
                                                <div className="h-auto">
                                                    {secretarias.map((item) => (
                                                    <div key={item.id} className='flex flex-row justify-between items-center w-full mb-2'>
                                                        <span className="text-md font-semibold">{item.slug}</span>
                                                        <input
                                                            className="cursor-pointer"
                                                            type="checkbox"
                                                            value={item.id}
                                                            onChange={selectSecretaria}
                                                            checked={idsSec.includes(item.id) ? true : false}
                                                        />
                                                    </div>
                                                    ))}
                                                </div>  
                                            </div>
                                        </div>
                                    </li>                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='block z-40 md:hidden'>
                        <div className="relative">
                            {/* Botão para abrir o menu */}
                            <button 
                                onClick={() => setIsOpen(!isOpen)} 
                                className="p-2 ml-2 bg-[#2563eb] dark:bg-black text-white rounded-md focus:outline-none"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>                            
                            {/* Menu lateral */}
                            <div className={`fixed top-0 left-0 h-auto bg-gray-300 text-black w-[80%] p-5 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                                <button 
                                    onClick={() => setIsOpen(false)} 
                                    className="absolute top-4 right-4 text-black"
                                >
                                    <X size={24} />
                                </button>
                                <h2 className="text-xl font-bold mb-4">Menu</h2>
                                <div className='w-[80%] mt-0 mb-2 z-40 ml-3 md:ml-0'>
                                    <div>
                                        <li className={`accordion_item ${clicked ? "active mb-2" : ""} list-none`}>
                                            <button className={clicked ? "button p-2 text-[#2563eb] font-bold text-left bg-gray-200 dark:bg-white dark:text-black border-l-2 border-gray-400 hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 shadow-lg rounded-t-lg" : 
                                                "button p-2 text-[#2563eb] font-bold text-left bg-gray-200 dark:bg-white dark:text-black border-l-2 border-gray-400 hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 shadow-lg rounded-lg"}
                                                onClick={handleToggle}>
                                                Persona
                                                <span className="control">{clicked ? "—" : "+"} </span>
                                            </button>
                                            <div className={`answer_wrapper ${clicked ? "active h-40 p-2 mb-5 bg-gray-200 dark:bg-white dark:text-black border-l-2 border-gray-400 rounded-b-lg overflow-y-scroll" : "hidden"}`}> 
                                                <div className={`answer ${clicked ? "active" : "hidden"}` }>
                                                    <div className="h-auto">
                                                        {modalidades.map((item) => (
                                                        <div key={item.id} className='flex flex-row justify-between items-center w-full mb-2'>
                                                            <span className="text-md font-semibold">{item.slug}</span>
                                                            <input
                                                                className="cursor-pointer"
                                                                type="checkbox"
                                                                value={item.id}
                                                                onChange={selectModalidade}
                                                                checked={idsMod.includes(item.id) ? true : false}
                                                            />
                                                        </div>
                                                        ))}
                                                    </div>  
                                                </div>
                                            </div>
                                        </li>                                
                                    </div> 
                                </div>
                                <div className='w-[80%] mt-0 mb-2 z-40 ml-3 md:ml-0'>
                                    <div>
                                        <li className={`accordion_item ${clickedTip ? "active mb-2" : ""} list-none`}>
                                            <button className={clickedTip ? "button p-2 text-[#2563eb] font-bold text-left bg-gray-200 dark:bg-white dark:text-black border-l-2 border-gray-400 hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 shadow-lg rounded-t-lg" : 
                                                "button p-2 text-[#2563eb] font-bold text-left bg-gray-200 dark:bg-white dark:text-black border-l-2 border-gray-400 hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 shadow-lg rounded-lg"}
                                                onClick={handleToggleTip}>
                                                Temas
                                                <span className="control">{clickedTip ? "—" : "+"} </span>
                                            </button>
                                            <div className={`answer_wrapper ${clickedTip ? "active h-40 p-2 mb-5 bg-gray-200 dark:bg-white dark:text-black border-l-2 border-gray-400 rounded-b-lg overflow-y-scroll" : "hidden"}`}> 
                                                <div className={`answer ${clickedTip ? "active" : "hidden"}` }>
                                                    <div className="h-auto">
                                                        {tipos.map((item) => (
                                                        <div key={item.id} className='flex flex-row justify-between items-center w-full mb-2'>
                                                            <span className="text-md font-semibold">{item.name}</span>
                                                            <input
                                                                className="cursor-pointer"
                                                                type="checkbox"
                                                                value={item.id}
                                                                onChange={selectTipo}
                                                                checked={idsTip.includes(item.id) ? true : false}
                                                            />
                                                        </div>
                                                        ))}
                                                    </div>  
                                                </div>
                                            </div>
                                        </li>                                
                                    </div>
                                </div>                               
                                <div className='w-[80%] mt-0 mb-2 z-40 ml-3 md:ml-0'>
                                    <div>
                                        <li className={`accordion_item ${clickedSec ? "active mb-2" : ""} list-none`}>
                                            <button className={clickedSec ? "button p-2 text-[#2563eb] font-bold text-left bg-gray-200 dark:bg-white dark:text-black border-l-2 border-gray-400 hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 shadow-lg rounded-t-lg" : 
                                                "button p-2 text-[#2563eb] font-bold text-left bg-gray-200 dark:bg-white dark:text-black border-l-2 border-gray-400 hover:cursor-pointer flex flex-wrap w-full justify-between items-center px-2 mt-6 shadow-lg rounded-lg"}
                                                onClick={handleToggleSec}>
                                                Orgão Responsável
                                                <span className="control">{clickedSec ? "—" : "+"} </span>
                                            </button>
                                            <div className={`answer_wrapper ${clickedSec ? "active h-40 p-2 mb-5 bg-gray-200 dark:bg-white dark:text-black border-l-2 border-gray-400 rounded-b-lg overflow-y-scroll" : "hidden"}`}> 
                                                <div className={`answer ${clickedSec ? "active" : "hidden"}` }>
                                                    <div className="h-auto">
                                                        {secretarias.map((item) => (
                                                        <div key={item.id} className='flex flex-row justify-between items-center w-full mb-2'>
                                                            <span className="text-md font-semibold">{item.slug}</span>
                                                            <input
                                                                className="cursor-pointer"
                                                                type="checkbox"
                                                                value={item.id}
                                                                onChange={selectSecretaria}
                                                                checked={idsSec.includes(item.id) ? true : false}
                                                            />
                                                        </div>
                                                        ))}
                                                    </div>  
                                                </div>
                                            </div>
                                        </li>                                
                                    </div>
                                </div>                                
                            </div>
                        </div>                                
                    </div>
                </div>
                <div className='flex flex-col md:w-[75%] w-full h-auto bg-[#F3F3F3]'>
                    <div className='flex flex-col bg-[#e2ebf7] dark:bg-white w-full h-auto mr-20'>
                        <div className='flex items-center justify-center md:w-full md:pr-20 mt-5 mb-5'>
                            <div className='flex flex-row justify-start items-center w-full h-full p-2'>
                                <input type="search" 
                                    className="form-control relative z-10 flex-auto min-w-0 block w-full px-3 py-3.5 text-base font-normal text-gray-700 bg-white dark:bg-black dark:text-white bg-clip-padding border border-solid border-gray-300 rounded-l-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-700 focus:outline-none" 
                                    placeholder="O que você procura?" 
                                    aria-label="Search" 
                                    aria-describedby="button-addon3" 
                                    value={search} 
                                    onChange={(e) => {setSearch(e.target.value)}} />
                                <button 
                                    className="btn inline-block px-6 py-3.5 border-1 border-[#172554] text-white font-medium text-xs leading-tight uppercase rounded-r-lg bg-[#172554] hover:bg-[#93c5fd] hover:text-black transition duration-150 ease-in-out" 
                                    onClick={handleSearch}
                                    type="button" 
                                    id="button-search">
                                    <FaSearch className="w-5 h-6 rounded-r-lg"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex bg-[#F3F3F3] dark:bg-gray-900 w-full h-auto md:pr-20'>
                        <div className='flex flex-row justify-between items-center w-full text-black p-2 bg-[#F3F3F3] dark:bg-gray-800 '> 
                            <div className='w-full h-auto mr-2 dark:bg-gray-800 '> 
                                <div className='flex flex-col w-full h-full text-black'>
                                    <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-4 ml-1 px-0 py-0 ">            
                                    {servicos?.map((item, idx ) => (
                                        <div key={idx} className='bg-[#fff7ed] h-64 mt-1 mb-3 rounded-lg overflow-hidden shadow-lg dark:hover:bg-black '> 
                                            <div className="flex flex-row items-start px-2 py-0 mt-1 ">
                                                <div className="flex border border-black w-auto h-auto rounded-lg items-start p-2">
                                                    {(item.tema || []).map((tema, lnh) => (
                                                        <Image key={lnh} src={tema.icone} alt="Descrição da imagem" width={32} height={32} className ='w-8 h-8' />
                                                    ))}                                                 
                                                </div>
                                                <div className="flex flex-col h-14 items-start px-2 py-1">
                                                    <div className="text-base font-bold mb-0">{item.nome}</div>
                                                </div>                                  
                                            </div>                                                                                                         
                                            <div className="flex flex-row items-start justify-between px-2 ">
                                                <div className="flex flex-col items-start px-2 py-2 h-36">
                                                    <span className='text-[12px] font-bold'>Objetivo</span>
                                                    <div className="text-[14px] mb-0" dangerouslySetInnerHTML={{ __html: item.descricao }} />
                                                </div>                
                                            </div>  
                                            <div className={!item.acesso ? "hidden" : "flex flex-row items-center justify-between w-full px-2"}>
                                                <Link href={`/SrvDetalhes/${item.id}`}>
                                                    <div className='flex items-center justify-center bg-white h-10 w-40 rounded-lg hover:bg-blue-950 border border-blue-600 text-blue-600 text-[12px] hover:text-white'>
                                                        <span className='px-2 font-semibold'>Detalhes do Serviço</span>
                                                    </div>  
                                                </Link>
                                                <Link href={`${item.acesso}`}>
                                                    <div className='flex items-center justify-center bg-blue-600 h-10 w-40 rounded-lg hover:bg-blue-950 border border-blue-600 text-white text-[12px] hover:text-white'>
                                                        <span className='px-2 font-semibold'>Acesse o serviço online</span>
                                                    </div>  
                                                </Link>
                                            </div>                                           
                                        </div>                    
                                    ))}
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between items-center w-full text-black p-2 bg-gray-300 dark:bg-white border-t-2 border-gray-200 rounded-lg '> 
                                    <div className='w-64 h-auto mr-5 md:w-80 md:mr-10 '>   
                                        {newPage}                              
                                    </div>
                                    <div className='flex flex-row w-auto text-black p-2 bg-gray-300'>
                                        <Pagination pages={pages} setCurrentPage={setCurrentPage} setNewPage={setNewPage} pagInitial={pagDefault} /> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
            <div className='bg-white dark:bg-black md:ml-20 md:mr-20 md:mt-10 md:mb-3 rounded-lg'>
                <CardOuvidoria />
            </div> 
        </div>
    )
}