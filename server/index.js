const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Rota para cadastrar um novo cliente
app.post('/clientes', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const clienteExistente = await prisma.cliente.findUnique({
      where: {
        email: email,
      },
    });

    if (clienteExistente) {
      res.status(409).json({ message: 'Cliente já cadastrado' });
    } else {
      const senhaCriptografada = await bcrypt.hash(senha, 10);
      const novoCliente = await prisma.cliente.create({
        data: {
          nome,
          email,
          senha: senhaCriptografada,
        },
      });

      res.status(200).json({ message: 'Cliente cadastrado com sucesso!', novoCliente });
    }
  } catch (error) {
    console.error('Erro ao cadastrar o cliente:', error);
    res.status(500).json({ message: 'Erro ao cadastrar o cliente' });
  }
});

app.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const clienteExistente = await prisma.cliente.findUnique({
      where: {
        email: email,
      },
    });

    if (clienteExistente) {
      res.status(409).json({ message: 'Cliente já cadastrado' });
    } else {
      const senhaCriptografada = await bcrypt.hash(senha, 10);

      const novoCliente = await prisma.cliente.create({
        data: {
          nome,
          email,
          senha: senhaCriptografada,
        },
      });

      res.status(200).json({ message: 'Cliente cadastrado com sucesso!', novoCliente });
    }
  } catch (error) {
    console.error('Erro ao cadastrar o cliente:', error);
    res.status(500).json({ message: 'Erro ao cadastrar o cliente' });
  }
});

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const clienteExistente = await prisma.cliente.findUnique({
      where: {
        email: email,
      },
    });

    if (clienteExistente) {
      const senhaCorreta = await bcrypt.compare(senha, clienteExistente.senha);

      if (senhaCorreta) {
        const { nome } = clienteExistente;

        res.status(200).json({ message: 'Autenticação bem-sucedida', nome });
      } else {
        res.status(401).json({ message: 'Senha incorreta' });
      }
    } else {
      res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao verificar o cliente:', error);
    res.status(500).json({ message: 'Erro ao verificar o cliente' });
  }
});

app.post('/horarios', async(req,res) => {
    const {nome, turma, horario} = req.body;

    try {
      const createHorario = prisma.horarios.create({
        data:{
          horarios: '7:45',
          
          
        }
      })
    } catch (error) {
      
    }
});

app.listen(3001, () => {
  console.log('Servidor backend iniciado na porta 3001');
});
