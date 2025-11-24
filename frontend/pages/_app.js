// frontend/pages/_app.js
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
        <title>Roxycamval - Joyería & Carteras Exclusivas</title>
        <meta name="description" content="Carteras y joyas hechas a mano con amor." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CartProvider>
        {/* Fondo full con la imagen del cliente */}
        <div 
          className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat flex flex-col"
          style={{ backgroundImage: "url('/images/hero-background.webp')" }}
        >
          {/* Capa oscura para que se lea el texto (opcional pero queda pro) */}
          <div className="bg-black/50 backdrop-blur-sm flex flex-col flex-1">
            <Header />
            <main className="flex-1">
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
        </div>
      </CartProvider>
    </>
  );
}

export default MyApp;