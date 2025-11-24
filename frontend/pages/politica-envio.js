// frontend/pages/politica-envio.js
import Link from 'next/link';

export default function PoliticaEnvio() {
  return (
    <div className="container mx-auto px-6 py-16 min-h-screen">
      <Link href="/" className="inline-block mb-8 text-pink-400 hover:text-pink-300 font-bold text-lg">
        ← Volver al inicio
      </Link>

      <h1 className="text-6xl font-black text-center mb-16">Política de Envío</h1>

      <div className="max-w-4xl mx-auto text-xl space-y-8 text-gray-300">
        <p>• Envíos a todo el país</p>
        <p>• CABA y GBA: $2.500 (24-48hs)</p>
        <p>• Interior: $4.500 (3-7 días)</p>
        <p>• Gratis en compras mayores a $80.000</p>
        <p>• Seguimiento por WhatsApp</p>
      </div>
    </div>
  );
}