// frontend/pages/_document.js → SIN WARNINGS + FAVICON PERFECTO
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* FAVICON – Funciona en todos los navegadores y móviles */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        
        {/* Si tenés favicon.ico también (opcional pero recomendado) */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}