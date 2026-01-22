
import React, { useState } from 'react';
import { 
  Instagram, 
  Facebook, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  Star, 
  ChevronRight,
  ShoppingBag
} from 'lucide-react';
import fundoImg from './assets/Fundo.jpg';
import doceImg from './assets/doceteste.jpg';
import OrderForm from './components/OrderForm';

// Reusable Components
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl text-center font-bold mb-10 text-[#4a3728]">
    {children}
  </h2>
);

const ProductCard: React.FC<{ 
  name: string; 
  price: string; 
  image: string;
  onAddToCart: (name: string, price: string) => void;
}> = ({ name, price, image, onAddToCart }) => (
  <div className="bg-transparent rounded-2xl md:rounded-3xl shadow-lg overflow-hidden flex flex-col items-center p-3 md:p-4 transition-transform hover:scale-[1.02]">
    <div className="w-full aspect-square overflow-hidden rounded-xl md:rounded-2xl mb-3 md:mb-4">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    <h3 className="font-semibold text-sm md:text-lg text-[#4a3728] text-center line-clamp-1">{name}</h3>
    <p className="text-[#c19a5b] font-bold text-base md:text-xl mb-3 md:mb-4">{price}</p>
    <button 
      onClick={() => onAddToCart(name, price)}
      className="w-full py-2 md:py-3 bg-[#c19a5b] text-white rounded-lg md:rounded-xl font-semibold hover:bg-[#a6824a] transition-colors flex items-center justify-center gap-1 md:gap-2 text-xs md:text-base"
    >
      <ShoppingBag size={14} className="md:w-[18px] md:h-[18px]" />
      Comprar
    </button>
  </div>
);

const TestimonialCard: React.FC<{ text: string; author: string; image: string }> = ({ text, author, image }) => (
  <div className="bg-white rounded-[2rem] p-6 shadow-md relative mt-10 text-center max-w-sm mx-auto">
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-[#FDF9F3] overflow-hidden shadow-sm">
      <img src={image} alt={author} className="w-full h-full object-cover" />
    </div>
    <div className="pt-10">
      <p className="text-gray-600 italic text-sm mb-4 leading-relaxed">"{text}"</p>
      <div className="flex justify-center gap-1 text-yellow-400 mb-2">
        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [cartItems, setCartItems] = useState<{name: string, price: string}[]>([]);

  const handleAddToCart = (name: string, price: string) => {
    setCartItems(prev => [...prev, { name, price }]);
    setShowOrderForm(true);
  };

  const handleCloseOrderForm = () => {
    setShowOrderForm(false);
    setCartItems([]);
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Nossos Doces', href: '#doces' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Contato', href: '#contato' },
  ];

  const products = [
    { name: 'Bombom Trufado', price: 'R$ 10,00', image: doceImg },
    { name: 'Trufa de Maracujá', price: 'R$ 10,00', image: doceImg },
    { name: 'Bombom Crocante', price: 'R$ 10,00', image: doceImg },
    { name: 'Coração de Avelã', price: 'R$ 10,00', image: doceImg },
    { name: 'Trufa de Coco', price: 'R$ 10,00', image: doceImg },
    { name: 'Brigadeiro Gourmet', price: 'R$ 10,00', image: doceImg },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-[#f0e4d4]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-[#4a3728] serif tracking-tight">
            Doce Carmello
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-[#4a3728] hover:text-[#c19a5b] font-medium transition-colors">
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => setShowOrderForm(true)}
              className="bg-[#c19a5b] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#a6824a] transition-all inline-block"
            >
              Encomendar
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-[#4a3728]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Sidebar */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-[#f0e4d4] p-4 flex flex-col gap-4 animate-in slide-in-from-top">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg text-[#4a3728] p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => setShowOrderForm(true)}
              className="bg-[#c19a5b] text-white p-3 rounded-xl font-semibold hover:bg-[#a6824a] transition-all inline-block"
            >
              Encomendar
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <img 
            src={fundoImg}
            alt="Hero Background" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-7xl text-white font-bold mb-4 serif leading-tight">
            Doçura que Encanta
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 font-light">
            Doces artesanais feitos com paixão para seus momentos mais especiais
          </p>
          <button 
            onClick={() => setShowOrderForm(true)}
            className="bg-[#c19a5b] hover:bg-[#a6824a] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 mx-auto shadow-xl"
          >
            Ver Cardápio Completo
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section id="doces" className="py-20 px-4 max-w-7xl mx-auto bg-[#fff8e7]">
        <SectionTitle>Nossos Doces</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {products.map((product, idx) => (
            <ProductCard 
              key={idx} 
              {...product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#f5efea]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle>Depoimentos</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            <TestimonialCard 
              text="Encomendei para minha festa e foi o maior sucesso! Todos os convidados elogiaram cada detalhe."
              author="Maria Silva"
              image="https://picsum.photos/seed/person1/200/200"
            />
            <TestimonialCard 
              text="Os melhores doces que já provei. O sabor é autêntico e a apresentação é impecável. Recomendo muito!"
              author="José Oliveira"
              image="https://picsum.photos/seed/person2/200/200"
            />
            <TestimonialCard 
              text="Atendimento excelente e doces de outro mundo. Carol é uma artista na confeitaria moderna."
              author="Carla Santos"
              image="https://picsum.photos/seed/person3/200/200"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 rounded-[2rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600" 
              alt="Carol Souza na cozinha" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-bold mb-6 text-[#4a3728] serif">Sobre Nós</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              Localizada em Barbacena e liderada pela <span className="font-semibold text-[#c19a5b]">Carol</span>, 
              a Doce Carmello une técnicas tradicionais e modernas para transformar doces em experiências gastronômicas únicas.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mb-8">
              Com foco na excelência e no afeto, a doceria busca entregar momentos de felicidade e 
              <span className="italic font-serif"> "amor em cada pedaço"</span> em todas as suas criações.
            </p>
            <div className="cursive text-4xl text-[#c19a5b]">Carol Souza</div>
          </div>
        </div>
      </section>

      {/* Contact & Map Footer */}
      <footer id="contato" className="bg-[#413110] text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
            
            {/* Contact Info */}
            <div className="space-y-6 flex flex-col items-center md:items-start w-full md:w-auto">
              <h3 className="text-2xl font-bold serif border-b border-[#c19a5b]/30 pb-2 w-fit">Contato</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Phone className="text-[#c19a5b] shrink-0" size={20} />
                  <span className="text-lg">(32) 99921-2236</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="text-[#c19a5b] shrink-0" size={20} />
                  <span className="text-lg">teste@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="text-[#c19a5b] shrink-0" size={20} />
                  <span className="text-lg text-balance">Barbacena, MG</span>
                </div>
              </div>
            </div>

            {/* Map Section - Centered */}
            <div className="flex flex-col items-center space-y-4 w-full md:w-auto">
              <div className="relative group w-full max-w-sm">
                <div className="w-full aspect-[4/3] bg-gray-200 rounded-3xl overflow-hidden border-4 border-white/5 shadow-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3714.8394547584446!2d-45.18333!3d-21.23333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sDoce%20Carmello!2sBarbacena%2C%20MG!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                  ></iframe>
                </div>
              </div>
              <a href="https://www.google.com/maps/place/Barbacena,+MG/@-21.2333,-45.1833,13z" target="_blank" rel="noopener noreferrer" className="text-sm text-[#c19a5b] hover:text-white transition-colors font-medium">
                Ver no Google Maps
              </a>
            </div>

            {/* Social Links */}
            <div className="space-y-6 flex flex-col items-center md:items-start w-full md:w-auto">
              <h3 className="text-2xl font-bold serif border-b border-[#c19a5b]/30 pb-2 w-fit">Redes Sociais</h3>
              <div className="space-y-4 w-full flex flex-col items-center md:items-start">
                <a href="#" className="flex items-center gap-4 hover:text-[#c19a5b] transition-all group w-fit">
                  <div className="p-2.5 bg-gradient-to-tr from-pink-600 to-orange-400 rounded-xl group-hover:rotate-6 transition-transform shadow-lg">
                    <Instagram size={22} />
                  </div>
                  <span className="text-lg font-medium">@docecarmello</span>
                </a>
                <a href="#" className="flex items-center gap-4 hover:text-[#c19a5b] transition-all group w-fit">
                  <div className="p-2.5 bg-[#1877F2] rounded-xl group-hover:-rotate-6 transition-transform shadow-lg">
                    <Facebook size={22} />
                  </div>
                  <span className="text-lg font-medium">/docecarmello</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-white/10 text-center">
            <div className="text-2xl serif font-bold text-[#c19a5b] mb-4">Doce Carmello</div>
            <p className="text-white/40 text-sm tracking-widest">
              &copy; {new Date().getFullYear()} - TODOS OS DIREITOS RESERVADOS
            </p>
          </div>
        </div>
      </footer>
      
      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#4a3728]">Fazer Pedido</h2>
                <button 
                  onClick={handleCloseOrderForm}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>
              <OrderForm preselectedItems={cartItems} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
