// frontend/pages/carrito.js → 100% FUNCIONAL + WHATSAPP PERFECTO 2025
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function CarritoPage() {
  const { cartItems, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();

  // NÚMERO REAL DEL CLIENTE (ya está correcto)
  const WHATSAPP_NUMBER = "5491131991996";

  const generateWhatsAppMessage = () => {
    if (cartItems.length === 0) {
      return `https://wa.me/${WHATSAPP_NUMBER}`;
    }

    // Formateamos el mensaje con %0A (salto de línea que WhatsApp entiende)
    const productos = cartItems
      .map(item => 
        `• ${item.product.Nombre_Producto} - Cant: ${item.quantity} x $${Number(item.product.Precio_MXN).toLocaleString('es-AR')}`
      )
      .join('%0A');

    const mensaje = `¡Hola Roxycamval! Quiero hacer este pedido:%0A%0A${productos}%0A%0ATOTAL: $${totalPrice.toLocaleString('es-AR')}%0A%0A¡Gracias! Estoy ansiosa por recibirlo`;

    // USAMOS LA URL QUE NUNCA FALLA EN 2025
    return `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${mensaje}&type=phone_number&app_absent=0`;
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-32 text-center min-h-screen">
        <h1 className="text-7xl font-black mb-8 text-white">
          Tu carrito está vacío
        </h1>
        <Link 
          href="/" 
          className="inline-block bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white font-bold text-3xl py-8 px-16 rounded-3xl transform hover:scale-105 transition"
        >
          Seguir Comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16 min-h-screen">
      <h1 className="text-7xl font-black text-center mb-12 text-white drop-shadow-2xl">
        Tu Carrito ({totalItems}{' '}
        {totalItems === 1 ? 'producto' : 'productos'})
      </h1>

      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
        {cartItems.map(item => (
          <div key={item.product.ID_SKU} className="flex items-center gap-6 py-8 border-b border-white/20 last:border-0">
            <div className="relative w-40 h-40 bg-white rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={item.product.URL_Imagen_Principal || '/images/placeholder.webp'}
                alt={item.product.Nombre_Producto}
                fill
                className="object-contain p-6"
                unoptimized
              />
            </div>

            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white">{item.product.Nombre_Producto}</h3>
              <p className="text-4xl font-black text-pink-400 mt-3">
                ${Number(item.product.Precio_MXN).toLocaleString('es-AR')}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <button 
                onClick={() => updateQuantity(item.product.ID_SKU, item.quantity - 1)}
                className="text-4xl hover:text-pink-400 transition" 
                disabled={item.quantity === 1}>−</button>
              <span className="text-4xl font-bold w-16 text-center">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.product.ID_SKU, item.quantity + 1)}
                className="text-4xl hover:text-pink-400 transition">+</button>
            </div>

            <button 
              onClick={() => removeFromCart(item.product.ID_SKU)}
              className="text-3xl text-red-500 hover:text-red-400">×</button>
          </div>
        ))}

        <div className="text-right mt-12">
          <p className="text-5xl font-black text-white mb-10">
            Total: <span className="text-pink-400">${totalPrice.toLocaleString('es-AR')}</span>
          </p>

          <a
            href={generateWhatsAppMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full text-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black text-4xl py-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            FINALIZAR PEDIDO POR WHATSAPP
          </a>

          <p className="text-center text-gray-400 mt-6 text-lg">
            Te respondemos en minutos
          </p>
        </div>
      </div>
    </div>
  );
}