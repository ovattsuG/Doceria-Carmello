import { VercelRequest, VercelResponse } from '@vercel/node';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface CustomerData {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
}

interface OrderData {
  items: OrderItem[];
  total: number;
  customer: CustomerData;
}

const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '5511999999999';

function validateOrderData(data: any): data is OrderData {
  if (!data || typeof data !== 'object') return false;
  
  if (!Array.isArray(data.items) || data.items.length === 0) {
    return false;
  }
  
  if (typeof data.total !== 'number' || data.total <= 0) {
    return false;
  }
  
  if (!data.customer || typeof data.customer !== 'object') {
    return false;
  }
  
  if (!data.customer.name || typeof data.customer.name !== 'string') {
    return false;
  }
  
  return true;
}

function formatOrderMessage(data: OrderData): string {
  const { items, total, customer } = data;
  
  let message = '🛒 *NOVO PEDIDO*\n\n';
  message += '📋 *Dados do Cliente:*\n';
  message += `👤 Nome: ${customer.name}\n`;
  
  if (customer.phone) {
    message += `📱 Telefone: ${customer.phone}\n`;
  }
  
  if (customer.email) {
    message += `📧 Email: ${customer.email}\n`;
  }
  
  if (customer.address) {
    message += `🏠 Endereço: ${customer.address}\n`;
  }
  
  message += '\n📦 *Itens do Pedido:*\n';
  
  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`;
    message += `   Quantidade: ${item.quantity}\n`;
    message += `   Preço: R$ ${item.price.toFixed(2)}\n`;
    message += `   Subtotal: R$ ${(item.quantity * item.price).toFixed(2)}\n\n`;
  });
  
  message += `💰 *Total do Pedido: R$ ${total.toFixed(2)}*\n\n`;
  message += '📅 Data: ' + new Date().toLocaleString('pt-BR');
  
  return message;
}

function generateWhatsAppLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Apenas requisições POST são permitidas'
    });
  }

  try {
    const orderData = req.body;
    
    if (!validateOrderData(orderData)) {
      return res.status(400).json({
        error: 'Invalid data',
        message: 'Dados do pedido inválidos ou incompletos',
        required: {
          items: 'Array de produtos com name, quantity, price',
          total: 'Número positivo',
          customer: {
            name: 'String obrigatória',
            phone: 'String opcional',
            email: 'String opcional',
            address: 'String opcional'
          }
        }
      });
    }
    
    const message = formatOrderMessage(orderData);
    const whatsappLink = generateWhatsAppLink(message);
    
    return res.status(200).json({
      success: true,
      data: {
        whatsappLink,
        message,
        orderSummary: {
          itemCount: orderData.items.length,
          total: orderData.total,
          customerName: orderData.customer.name
        }
      }
    });
    
  } catch (error) {
    console.error('Error processing order:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Erro ao processar o pedido. Tente novamente.',
      timestamp: new Date().toISOString()
    });
  }
}
