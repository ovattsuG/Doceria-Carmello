# Backend Serverless para Pedidos via WhatsApp

## Estrutura do Projeto

```
/
├── api/
│   ├── order.ts          # Função serverless para processar pedidos
│   ├── package.json      # Dependências da API
│   └── tsconfig.json     # Configuração TypeScript
├── doceria/
│   └── src/
│       ├── services/
│       │   └── whatsappService.ts  # Serviço frontend
│       └── components/
│           └── OrderForm.tsx        # Formulário exemplo
├── vercel.json           # Configuração Vercel
└── README-API.md         # Este arquivo
```

## Configuração

### 1. Variáveis de Ambiente

No painel da Vercel, configure a variável de ambiente:
- `WHATSAPP_NUMBER`: Seu número de WhatsApp com DDD e código do país (ex: 5511999999999)

### 2. Instalação das Dependências

```bash
# No diretório /api
npm install
```

## API Endpoint

### POST /api/order

Recebe dados do pedido e retorna link do WhatsApp.

#### Corpo da Requisição (JSON):

```json
{
  "items": [
    {
      "name": "Bolo de Chocolate",
      "quantity": 2,
      "price": 45.50
    },
    {
      "name": "Brigadeiro",
      "quantity": 10,
      "price": 3.20
    }
  ],
  "total": 123.00,
  "customer": {
    "name": "João Silva",
    "phone": "11987654321",
    "email": "joao@email.com",
    "address": "Rua das Flores, 123 - São Paulo/SP"
  }
}
```

#### Resposta de Sucesso (200):

```json
{
  "success": true,
  "data": {
    "whatsappLink": "https://wa.me/5511999999999?text=...",
    "message": "🛒 NOVO PEDIDO\n\n📋 Dados do Cliente:\n...",
    "orderSummary": {
      "itemCount": 2,
      "total": 123.00,
      "customerName": "João Silva"
    }
  }
}
```

#### Resposta de Erro (400):

```json
{
  "error": "Invalid data",
  "message": "Dados do pedido inválidos ou incompletos",
  "required": {
    "items": "Array de produtos com name, quantity, price",
    "total": "Número positivo",
    "customer": {
      "name": "String obrigatória",
      "phone": "String opcional",
      "email": "String opcional",
      "address": "String opcional"
    }
  }
}
```

## Uso no Frontend

### Exemplo com Fetch (JavaScript/TypeScript):

```javascript
async function sendOrder() {
  const orderData = {
    items: [
      { name: "Bolo de Chocolate", quantity: 1, price: 45.50 }
    ],
    total: 45.50,
    customer: {
      name: "Maria Santos",
      phone: "11987654321",
      email: "maria@email.com"
    }
  };

  try {
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();

    if (result.success && result.data?.whatsappLink) {
      window.open(result.data.whatsappLink, '_blank');
    } else {
      console.error('Erro:', result.message);
    }
  } catch (error) {
    console.error('Erro ao enviar pedido:', error);
  }
}
```

### Exemplo com React:

```jsx
import { useState } from 'react';

function OrderButton() {
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    setLoading(true);
    
    try {
      const orderData = {
        items: [
          { name: "Bolo de Chocolate", quantity: 1, price: 45.50 }
        ],
        total: 45.50,
        customer: {
          name: "Maria Santos",
          phone: "11987654321"
        }
      };

      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        window.open(result.data.whatsappLink, '_blank');
      } else {
        alert('Erro: ' + result.message);
      }
    } catch (error) {
      alert('Erro ao processar pedido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleOrder} disabled={loading}>
      {loading ? 'Processando...' : 'Fazer Pedido'}
    </button>
  );
}
```

## Deploy na Vercel

1. Faça push do código para o repositório GitHub
2. Conecte o repositório à Vercel
3. Configure as variáveis de ambiente no painel da Vercel
4. Faça o deploy

O endpoint estará disponível em: `https://seu-projeto.vercel.app/api/order`

## Segurança

- Validação de dados no backend
- Tratamento de erros adequado
- Sanitização de dados antes da geração do link
- Uso de variáveis de ambiente para dados sensíveis

## Personalização

- Modifique o formato da mensagem em `formatOrderMessage()`
- Altere o número do WhatsApp na variável de ambiente
- Adicione mais campos de validação conforme necessário
- Implemente autenticação se necessário
