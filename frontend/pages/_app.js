// Archivo: EMJoyas/frontend/pages/_app.js

import React from 'react';
import Head from 'next/head';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { CartProvider } from '../context/CartContext'; 

import '../styles/globals.css'; // CRÍTICO: Carga los estilos de Tailwind

// Estructura de la aplicación
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>EMJoyas - Joyería Exclusiva</title>
        <meta name="description" content="Joyería de plata, oro y piedras preciosas. Descubre nuestra colección." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* 1. Proveedor del Contexto del Carrito */}
      <CartProvider>
        {/* 2. Header global en todas las páginas */}
        <Header />
        <main className="flex-grow">
          {/* 3. Component es la página actual (index, producto/[sku], etc.) */}
          <Component {...pageProps} />
        </main>
        {/* 4. Footer global en todas las páginas */}
        <Footer />
      </CartProvider>
    </>
  );
}

export default MyApp;