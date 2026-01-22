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

interface ApiResponse {
  success: boolean;
  data?: {
    whatsappLink: string;
    message: string;
    orderSummary: {
      itemCount: number;
      total: number;
      customerName: string;
    };
  };
  error?: string;
  message?: string;
}

class WhatsAppService {
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl = '/api/order'; // Para produção na Vercel
  }

  async sendOrder(orderData: OrderData): Promise<ApiResponse> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao processar pedido');
      }

      if (data.success && data.data?.whatsappLink) {
        window.open(data.data.whatsappLink, '_blank');
      }

      return data;
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      throw error;
    }
  }

  async createOrderAndOpenWhatsApp(
    items: OrderItem[],
    customer: CustomerData
  ): Promise<void> {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const orderData: OrderData = {
      items,
      total,
      customer,
    };

    try {
      const result = await this.sendOrder(orderData);
      
      if (result.success) {
        console.log('Pedido enviado com sucesso!');
      }
    } catch (error) {
      console.error('Falha ao processar pedido:', error);
      throw error;
    }
  }
}

export const whatsappService = new WhatsAppService();
export type { OrderItem, CustomerData, OrderData, ApiResponse };
