// frontend/pages/_app.js → VERSIÓN FINAL QUE FUNCIONA 100%
import React from 'react';
import Head from 'next/head';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { CartProvider } from '../context/CartContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Roxycamval - Carteras Exclusivas</title>
        <meta name="description" content="Carteras de cuero y joyería única" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CartProvider>
        {/* Fondo full */}
        <div 
          className="min-h-screen bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/images/hero-background.webp')" }}
        >
          {/* Capa oscura + texto blanco forzado */}
          <div className="bg-black/70 min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {/* ESTE DIV ES LA CLAVE: fuerza texto blanco y altura correcta */}
              <div className="text-white min-h-screen">
                <Component {...pageProps} />
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </CartProvider>
    </>
  );
}

export default MyApp;