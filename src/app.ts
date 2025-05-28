import express from 'express';
import { AppDataSource } from './data-source';

// Models
import { Livro } from './model/Livro';
import { Cliente } from './model/Cliente';
import { Emprestimo } from './model/Emprestimo';
import { Autor } from './model/Autor';

// Services
import { LivroService } from './service/LivroService';
import { EmprestimoService } from './service/EmprestimoService';
import { ClienteService } from './service/ClienteService';
import { AutorService } from './service/AutorService';

// Controllers
import { LivroController } from './controller/LivroController';
import { ClienteController } from './controller/ClienteController';
import { EmprestimoController } from './controller/EmprestimoController';
import { AutorController } from './controller/AutorController';

// Routers
import { livroRotas } from './routes/LivroRouter';
import { emprestimoRotas } from './routes/EmprestimoRouter';
import { clienteRotas } from './routes/ClienteRouter';
import { autorRotas } from './routes/AutorRouter';

AppDataSource.initialize().then(async => {
  const app = express();
  app.use(express.json());

  // Initialize dependencies 
  //Livro
  const livroRepository = AppDataSource.getRepository(Livro);
  const livroService = new LivroService(livroRepository);
  const livroController = new LivroController(livroService);

  //Autor
  const autorRepository = AppDataSource.getRepository(Autor);
  const autorService = new AutorService(autorRepository);
  const autorController = new AutorController(autorService);

  //Cliente
  const clienteRepository = AppDataSource.getRepository(Cliente);
  const clienteService = new ClienteService(clienteRepository);
  const clienteController = new ClienteController(clienteService);

  //Emprestimo
  const emprestimoRepository = AppDataSource.getRepository(Emprestimo);
  const emprestimoService = new EmprestimoService(emprestimoRepository, livroService, clienteService);
  const emprestimoController = new EmprestimoController(emprestimoService);



  // Routes
  app.use('/api/livros', livroRotas(livroController));
  app.use('/api/emprestimos', emprestimoRotas(emprestimoController));
  app.use('/api/clientes', clienteRotas(clienteController, emprestimoController));
  app.use('/api/autores', autorRotas(autorController));

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});