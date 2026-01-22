import React, { useState, useEffect } from 'react';
import { whatsappService } from '../services/whatsappService';
import type { OrderItem, CustomerData } from '../services/whatsappService';
import ProductCatalog from './ProductCatalog';

interface OrderFormProps {
  preselectedItems?: {name: string, price: string}[];
}

const OrderForm: React.FC<OrderFormProps> = ({ preselectedItems = [] }) => {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [customer, setCustomer] = useState<CustomerData>({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (preselectedItems.length > 0) {
      const orderItems: OrderItem[] = preselectedItems.map(item => ({
        name: item.name,
        quantity: 1,
        price: parseFloat(item.price.replace('R$ ', '').replace(',', '.'))
      }));
      setItems(orderItems);
    }
  }, [preselectedItems]);

  const handleAddProduct = (name: string, price: string) => {
    const newItem: OrderItem = {
      name,
      quantity: 1,
      price: parseFloat(price.replace('R$ ', '').replace(',', '.'))
    };
    setItems(prev => [...prev, newItem]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof OrderItem, value: string | number) => {
    const newItems = [...items];
    if (field === 'name') {
      newItems[index][field] = value as string;
    } else if (field === 'quantity') {
      newItems[index][field] = Number(value);
    }
    setItems(newItems);
  };

  const updateCustomer = (field: keyof CustomerData, value: string) => {
    setCustomer({ ...customer, [field]: value });
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const validItems = items.filter(item => item.name && item.price > 0 && item.quantity > 0);
      
      if (validItems.length === 0) {
        setError('Adicione pelo menos um item válido ao pedido');
        return;
      }

      if (!customer.name.trim()) {
        setError('Nome do cliente é obrigatório');
        return;
      }

      await whatsappService.createOrderAndOpenWhatsApp(validItems, customer);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar pedido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Fazer Pedido</h2>
      
      <ProductCatalog onAddToCart={handleAddProduct} currentItems={items.map(item => item.name)} />

      {items.length > 0 && (
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Itens do Pedido ({items.length} {items.length === 1 ? 'item' : 'itens'})</h3>
            {items.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-2 mb-3 p-3 border rounded-lg">
              <input
                type="text"
                placeholder="Nome do produto"
                value={item.name}
                onChange={(e) => updateItem(index, 'name', e.target.value)}
                className="w-full sm:flex-1 p-2 border rounded min-w-0"
                required
                readOnly={preselectedItems.some(p => p.name === item.name)}
              />
              <div className="flex gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
                <input
                  type="number"
                  placeholder="Qtd"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                  className="w-20 sm:w-20 p-2 border rounded"
                  min="1"
                  required
                />
                <div className="flex-1 sm:w-24 p-2 border rounded bg-gray-100 flex items-center justify-center font-semibold">
                  R$ {item.price.toFixed(2)}
                </div>
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remover
                  </button>
                )}
              </div>
            </div>
          ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Dados do Cliente</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nome completo *"
                value={customer.name}
                onChange={(e) => updateCustomer('name', e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="tel"
                placeholder="Telefone (opcional)"
                value={customer.phone}
                onChange={(e) => updateCustomer('phone', e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email (opcional)"
                value={customer.email}
                onChange={(e) => updateCustomer('email', e.target.value)}
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Endereço (opcional)"
                value={customer.address}
                onChange={(e) => updateCustomer('address', e.target.value)}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="text-xl font-bold mb-4">
              Total: R$ {calculateTotal().toFixed(2)}
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-semibold"
            >
              {loading ? 'Processando...' : 'Enviar Pedido via WhatsApp'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default OrderForm;
