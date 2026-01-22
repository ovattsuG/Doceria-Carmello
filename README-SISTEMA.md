# 🧁 Doce Carmello - Sistema Completo de Pedidos

## 📋 Visão Geral

Sistema completo de e-commerce para doceria com frontend React e backend serverless na Vercel, integrado com WhatsApp para processamento de pedidos.

---

## 🏗️ Arquitetura do Sistema

```
Doceria-Carmello/
├── 📱 doceria/                 # Frontend React
│   ├── src/
│   │   ├── components/
│   │   │   └── OrderForm.tsx   # Formulário de pedidos
│   │   ├── services/
│   │   │   └── whatsappService.ts # Serviço de integração
│   │   ├── App.tsx              # Aplicação principal
│   │   └── main.tsx             # Ponto de entrada
│   ├── package.json             # Dependências React
│   └── public/                  # Assets estáticos
├── 🔧 api/                      # Backend Serverless
│   ├── order.ts                 # API de pedidos
│   ├── server.ts                # Servidor de desenvolvimento
│   ├── package.json             # Dependências API
│   └── tsconfig.json            # Config TypeScript
├── ⚙️ vercel.json               # Configuração Vercel
├── 📦 package.json              # Scripts raiz
└── 📚 README-SISTEMA.md         # Este documento
```

---

## 🚀 Funcionalidades Principais

### 📱 Frontend (React + Vite)
- **Landing page** responsiva e moderna
- **Catálogo de produtos** com cards interativos
- **Sistema de carrinho** simplificado
- **Formulário de pedidos** integrado
- **Modal de checkout** com validação
- **Redirecionamento automático** para WhatsApp

### 🔧 Backend (Serverless Vercel)
- **API REST** para processamento de pedidos
- **Validação robusta** de dados
- **Formatação automática** de mensagens
- **Geração de links** WhatsApp
- **Tratamento de erros** completo
- **CORS configurado** para frontend

### 📱 Integração WhatsApp
- **Mensagens formatadas** com emojis
- **Dados estruturados** (cliente, itens, total)
- **Link direto** para conversa WhatsApp
- **Abertura automática** em nova aba

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19.2.0** - Framework UI
- **TypeScript** - Tipagem segura
- **Vite 7.2.4** - Build tool
- **TailwindCSS 4.1.18** - Estilização
- **Lucide React** - Ícones

### Backend
- **Node.js** - Runtime serverless
- **TypeScript** - Tipagem segura
- **@vercel/node** - Funções serverless
- **Express** - Servidor dev (opcional)

### Deploy
- **Vercel** - Hospedagem frontend + serverless
- **GitHub** - Controle de versão

---

## 🔄 Fluxo do Usuário

### 1. **Seleção de Produto**
```
Usuário clica em "Comprar" → Produto adicionado ao carrinho → Modal abre
```

### 2. **Preenchimento do Pedido**
```
Formulário pré-preenchido → Usuário ajusta quantidade → Preenche dados → Envia
```

### 3. **Processamento Backend**
```
POST /api/order → Validação → Formatação → Geração link WhatsApp
```

### 4. **Redirecionamento**
```
Frontend recebe link → Abre nova aba → WhatsApp com mensagem formatada
```

---

## 📱 Estrutura da Mensagem WhatsApp

```
🛒 NOVO PEDIDO

📋 Dados do Cliente:
👤 Nome: João Silva
📱 Telefone: (32) 99803-1099
📧 Email: joao@email.com

📦 Itens do Pedido:
1. Bombom Trufado
   Quantidade: 2
   Preço: R$ 10.00
   Subtotal: R$ 20.00

💰 Total do Pedido: R$ 20.00

📅 Data: 22/01/2026 10:30:00
```

---

## 🚀 Deploy e Configuração

### 1. **Variáveis de Ambiente**
```bash
WHATSAPP_NUMBER=5532998031099  # Seu número WhatsApp
```

### 2. **Build Commands**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "doceria/dist",
  "installCommand": "cd doceria && npm install"
}
```

### 3. **URLs de Produção**
```
Frontend: https://seu-projeto.vercel.app
API: https://seu-projeto.vercel.app/api/order
```

---

## 🧪 Desenvolvimento Local

### 1. **Iniciar Backend**
```bash
cd api
npm install
npm run dev  # Servidor em localhost:3001
```

### 2. **Iniciar Frontend**
```bash
cd doceria
npm install
npm run dev  # Servidor em localhost:5173
```

### 3. **Ajustar URL API**
```typescript
// Em whatsappService.ts
constructor() {
  this.apiUrl = 'http://localhost:3001/api/order'; // Dev
  // this.apiUrl = '/api/order'; // Prod
}
```

---

## 📊 Estrutura de Dados

### 📦 OrderItem
```typescript
{
  name: string;      // Nome do produto
  quantity: number;  // Quantidade
  price: number;     // Preço unitário
}
```

### 👤 CustomerData
```typescript
{
  name: string;       // Nome (obrigatório)
  phone?: string;     // Telefone (opcional)
  email?: string;     // Email (opcional)
  address?: string;   // Endereço (opcional)
}
```

### 🛒 OrderData
```typescript
{
  items: OrderItem[];    // Lista de produtos
  total: number;         // Valor total
  customer: CustomerData; // Dados cliente
}
```

---

## 🔧 Personalização

### 🎨 Alterar Cores e Estilos
- **TailwindCSS**: Modifique classes no App.tsx
- **Cores principais**: `#[#4a3728]` (marrom), `#[#c19a5b]` (dourado)

### 📱 Alterar Número WhatsApp
1. **Desenvolvimento**: API `order.ts` linha 22
2. **Produção**: Variável ambiente `WHATSAPP_NUMBER`

### 🛍️ Adicionar Produtos
```typescript
// Em App.tsx
const products = [
  { name: "Novo Produto", price: "R$ 15,00", image: imagem },
  // ...
];
```

---

## 🔒 Segurança

### ✅ Implementado
- **Validação de dados** no backend
- **Sanitização** de inputs
- **CORS configurado**
- **Variáveis de ambiente** para dados sensíveis

### 🛡️ Recomendações
- **Rate limiting** na API
- **Validação adicional** de email/telefone
- **HTTPS obrigatório** (já garantido pela Vercel)

---

## 🐛 Troubleshooting

### Build Falha
```bash
# Verificar configuração vercel.json
# Limpar cache: vercel --prod
```

### API Não Responde
```bash
# Verificar logs na Vercel
# Testar localmente com server.ts
```

### WhatsApp Não Abre
```bash
# Verificar formato do número: +55DDDNÚMERO
# Testar link manualmente
```

---

## 📈 Monitoramento

### 📊 Métricas Importantes
- **Taxa de conversão** pedidos
- **Tempo resposta** API
- **Erros de validação**
- **Click-through** WhatsApp

### 🔍 Logs Vercel
- Acessar dashboard Vercel
- Verificar função logs
- Monitorar performance

---

## 🚀 Futuras Melhorias

### 📱 Funcionalidades
- [ ] **Pagamento online** (Stripe/Mercado Pago)
- [ ] **Cadastro de clientes**
- [ ] **Histórico de pedidos**
- [ ] **Notificações** WhatsApp
- [ ] **Cupons de desconto**

### 🔧 Técnico
- [ ] **Database** (Firebase/Supabase)
- [ ] **Analytics** (Google Analytics)
- [ ] **SEO Optimization**
- [ ] **PWA Features**

---

## 📞 Suporte

### 🎯 Para Ajuda
1. **Documentação**: README-API.md
2. **Logs**: Dashboard Vercel
3. **Testes**: Ambiente local

### 📧 Contato
- **Desenvolvedor**: Seu contato
- **Documentação**: Este README

---

## 🎉 Conclusão

Sistema completo, moderno e funcional para doceria com:
- ✅ **Frontend responsivo**
- ✅ **Backend serverless**
- ✅ **Integração WhatsApp**
- ✅ **Deploy automático**
- ✅ **Experiência otimizada**

**Pronto para produção e escalabilidade!** 🚀
