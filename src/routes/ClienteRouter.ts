import { Router } from 'express';
import { ClienteController } from '../controller/ClienteController';
import { EmprestimoController } from '../controller/EmprestimoController';

export const clienteRotas = (controller: ClienteController,emprestimoController:EmprestimoController): Router => {
  const router = Router();

  router.post('/', controller.inserir);
  router.get('/', controller.listar);
  router.get('/:id', controller.buscarPorId);
  router.put('/:id', controller.atualizar);
  router.delete('/:id', controller.deletar);
  router.get('/:id/emprestimos', emprestimoController.buscarPorClienteId);

  return router;
};