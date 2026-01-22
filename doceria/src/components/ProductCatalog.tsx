import React from 'react';
import { ShoppingBag } from 'lucide-react';
import doceImg from '../assets/doceteste.jpg';
import type { OrderItem } from '../services/whatsappService';

interface Product {
  name: string;
  price: string;
  image: string;
}

interface ProductCatalogProps {
  onAddToCart: (name: string, price: string) => void;
  cartItems?: OrderItem[];
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ onAddToCart, cartItems = [] }) => {
  const products: Product[] = [
    { name: 'Bombom Trufado', price: 'R$ 10,00', image: doceImg },
    { name: 'Trufa de Maracujá', price: 'R$ 10,00', image: doceImg },
    { name: 'Bombom Crocante', price: 'R$ 10,00', image: doceImg },
    { name: 'Coração de Avelã', price: 'R$ 10,00', image: doceImg },
    { name: 'Trufa de Coco', price: 'R$ 10,00', image: doceImg },
    { name: 'Brigadeiro Gourmet', price: 'R$ 10,00', image: doceImg },
  ];

  const isProductInCart = (productName: string) => {
    return cartItems.some((item: OrderItem) => item.name === productName);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => {
          const inCart = isProductInCart(product.name);
          return (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="w-full aspect-square overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2">{product.name}</h4>
                <p className="text-[#c19a5b] font-bold text-lg mb-3">{product.price}</p>
                <button
                  onClick={() => onAddToCart(product.name, product.price)}
                  disabled={inCart}
                  className={`w-full py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                    inCart 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-[#c19a5b] text-white hover:bg-[#a6824a]'
                  }`}
                >
                  <ShoppingBag size={16} />
                  {inCart ? 'Já no Carrinho' : 'Adicionar ao Pedido'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCatalog;
