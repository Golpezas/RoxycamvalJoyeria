// frontend/pages/preguntas-frecuentes.js
import Link from 'next/link';

export default function FAQ() {
  const faqs = [
    { q: "¿Hacen envíos a todo el país?", a: "Sí, enviamos a toda Argentina con Andreani y Correo Argentino." },
    { q: "¿Cuánto tardan en llegar?", a: "CABA: 24-48hs • Interior: 3-7 días hábiles." },
    { q: "¿Aceptan Mercado Pago?", a: "Sí, y también transferencia bancaria." },
    { q: "¿Tienen garantía?", a: "Todas nuestras piezas tienen 6 meses de garantía." },
    { q: "¿Puedo cambiar o devolver?", a: "Sí, tenés 30 días para cambios o devoluciones." },
  ];

  return (
    <div className="container mx-auto px-6 py-16 min-h-screen">
      <Link href="/" className="inline-block mb-8 text-pink-400 hover:text-pink-300 font-bold text-lg">
        ← Volver al inicio
      </Link>

      <h1 className="text-6xl font-black text-center mb-16">Preguntas Frecuentes</h1>

      <div className="max-w-4xl mx-auto space-y-8">
        {faqs.map((item, i) => (
          <details key={i} className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <summary className="text-xl font-bold cursor-pointer hover:text-pink-400">
              {item.q}
            </summary>
            <p className="mt-4 text-lg text-gray-300">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}