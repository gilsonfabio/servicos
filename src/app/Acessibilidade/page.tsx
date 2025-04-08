"use client"
import React from 'react';
import Submenu from '@/components/SubMenu';
import Link from 'next/link';

export default function Acessibilidade() {
  const itemsSubmenu = [
    {
        menId: '1',
        menTitle: 'Acessibilidade',
        breadcrumbs:[
          {descricao: "Portal de Serviços", link: "/acessibilidade"},
        ]
    },
  ] 

  return (

    <div className="" >
      <Submenu options = {itemsSubmenu} />  
        <div className='bg-gray-200 h-10'>                  
        </div> 
        <div className='flex flex-col justify-center bg-white dark:bg-black h-auto mt-5'>
            <div className='ml-5 mr-5 md:ml-24 md:mr-24 text-md'>
                <p>Este portal segue as diretrizes do e-MAG (Modelo de Acessibilidade em Governo Eletrônico), conforme as normas do Governo Federal, em obediência ao Decreto 5.296, de 2.12.2004</p>
                <br />
                <p>O termo acessibilidade significa incluir a pessoa com deficiência na participação de atividades como o uso de produtos, serviços e informações. Alguns exemplos são os prédios com rampas de acesso para cadeira de rodas e banheiros adaptados para deficientes.</p>
                <br />
                <p>Na internet, acessibilidade refere-se principalmente às recomendações do WCAG (World Content Accessibility Guide) do W3C e no caso do Governo Brasileiro ao e-MAG (Modelo de Acessibilidade em Governo Eletrônico). O e-MAG está alinhado as recomendações internacionais, mas estabelece padrões de comportamento acessível para sites governamentais.</p>
                <br />                               
                <p>Ao final desse texto, você poderá baixar alguns arquivos que explicam melhor o termo acessibilidade e como deve ser implementado nos sites da Internet.</p>
                <br />
                <p className='text-md font-semibold'>Leis e decretos sobre acessibilidade:</p>
                <div >
                  <Link href="https://www.planalto.gov.br/ccivil_03/_Ato2004-2006/2004/Decreto/D5296.htm" passHref>  
                    <p className='text-sm text-sky-600 hover:text-sky-400 hover:cursor-pointer'>Decreto nº 5.296 de 02 de dezembro de 2004 (link externo)</p>
                  </Link>
                  <Link href="https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/decreto/d6949.htm" passHref> 
                    <p className='text-sm text-sky-600 hover:text-sky-400 hover:cursor-pointer'>Decreto nº 6.949, de 25 de agosto de 2009 (link externo) - Promulga a Convenção Internacional sobre os Direitos das Pessoas com Deficiência e seu Protocolo Facultativo, assinados em Nova York, em 30 de março de 2007 </p>
                  </Link>
                  <Link href="https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/Decreto/D7724.htm" passHref> 
                    <p className='text-sm text-sky-600 hover:text-sky-400 hover:cursor-pointer'>Decreto nº 7.724, de 16 de Maio de 2012 (link externo) - Regulamenta a Lei No 12.527, que dispõe sobre o acesso a informações.</p>
                  </Link>
                  <Link href="https://www.gov.br/governodigital/pt-br/estrategia-de-governanca-digital/do-eletronico-ao-digital" passHref> 
                    <p className='text-sm text-sky-600 hover:text-sky-400 hover:cursor-pointer'>Modelo de Acessibilidade de Governo Eletrônico (link externo) </p>
                  </Link>
                  <Link href="https://www.gov.br/governodigital/pt-br/legislacao/portaria3_eMAG.pdf" passHref> 
                    <p className='text-sm text-sky-600 hover:text-sky-400 hover:cursor-pointer'>Portaria nº 03, de 07 de Maio de 2007 - formato .pdf (35,5Kb) (link externo) - Institucionaliza o Modelo de Acessibilidade em Governo Eletrônico – e-MAG </p>
                  </Link>
                  <Link href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm" passHref> 
                    <p className='text-sm text-sky-600 hover:text-sky-400 hover:cursor-pointer'>Lei 13.146/2015 - Lei Brasileira de Inclusão da Pessoa com Deficiência (Estatuto da Pessoa com Deficiência) (link externo) - Institui a Lei Brasileira de Inclusão da Pessoa com Deficiência (Estatuto da Pessoa com Deficiência).</p>
                  </Link>  
                </div>  
                <br />
            </div>
        </div>            
    </div>
  )
} 

         