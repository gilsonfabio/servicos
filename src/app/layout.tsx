import './globals.css';
import Link from 'next/link';
import { FaUniversalAccess } from 'react-icons/fa';
import { FaSitemap } from 'react-icons/fa';
import Image from 'next/image'

import logoAcesso from '../../public/acesso-informacao.png';

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navbarBg = "bg-[#172554]";
  const showBtnAce = true;
  const btnAce = (
    <Link href="../../Acessibilidade" passHref className="flex flex-row items-center text-white hover:text-gray-400 px-1 py-2 text-sm font-medium">
      <FaUniversalAccess className="w-5 h-5 fa-solid fa-circle-info mr-2"/>
      <p className="text-sm">Acessibilidade</p>
    </Link>
  );
  const showBtnMap = false;
  const btnMap = (
    <Link href="/sitemap" passHref className="text-white hover:text-gray-400 px-1 py-2 text-sm font-medium">
      <FaSitemap className="w-5 h-5 fa-solid fa-circle-info"/>
    </Link>
  );
  const showBtnInf = false;
  const btnInf = (
    <Link href="/acessoinformacao" passHref className="text-white hover:text-gray-400 px-1 py-2 text-sm font-medium">
      <Image src={logoAcesso} alt="acesso a informação" className="w-5 h-5 "/>
    </Link>
  );
  return (
    <html lang="en">
      <body className=''>
        <Navbar bgColor={navbarBg} button={btnAce} showButton={showBtnAce} btnMap={btnMap} showBtnMap={showBtnMap} btnInf={btnInf} showBtnInf={showBtnInf} /> 
          {children}
        <Footer bgColor={navbarBg} /> 
      </body>
    </html>
  );
}
