import express from 'express';
import cors from 'cors';
import handler from './order';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/order', async (req: express.Request, res: express.Response) => {
  try {
    const mockReq = {
      method: 'POST',
      body: req.body,
      headers: req.headers
    };

    const mockRes = {
      status: (code: number) => {
        res.status(code);
        return mockRes;
      },
      json: (data: any) => {
        res.json(data);
      }
    };

    await handler(mockReq as any, mockRes as any);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Erro ao processar o pedido'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📱 API endpoint: http://localhost:${PORT}/api/order`);
  console.log(`🔗 WhatsApp number: ${process.env.WHATSAPP_NUMBER || '32 998031099'}`);
});
