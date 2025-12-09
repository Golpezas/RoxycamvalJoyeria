// frontend/pages/contacto.js
import Link from 'next/link';

export default function Contacto() {
  return (
    <div className="container mx-auto px-6 py-16 min-h-screen text-center">
      <Link href="/" className="inline-block mb-8 text-pink-400 hover:text-pink-300 font-bold text-lg">
        ← Volver al inicio
      </Link>

      <h1 className="text-6xl font-black mb-12">Contacto</h1>

      <div className="max-w-2xl mx-auto space-y-8 text-2xl">
        <p>WhatsApp: <a href="https://wa.me/54911..." className="text-green-400 font-bold">+54 9 11 ...</a></p>
        <p>Instagram: <a href="https://instagram.com/roycamval" className="text-pink-400 font-bold">@roycamval</a></p>
        <p>Email: roycamval@gmail.com</p>
      </div>

      <div className="mt-16">
        <a href="https://wa.me/54911..." className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold text-3xl px-12 py-8 rounded-full shadow-2xl transform hover:scale-105 transition">
          CHATEAR POR WHATSAPP
        </a>
      </div>
    </div>
  );
}