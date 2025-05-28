import { Router } from 'express';
import { EmprestimoController } from '../controller/EmprestimoController';

export const emprestimoRotas = (controller: EmprestimoController): Router => {
  const router = Router();

  router.post('/', controller.inserir);
  router.get('/', controller.listar);
  router.get('/:id', controller.buscarPorId);
  router.patch('/:id/concluir', controller.concluirEmprestimo);

  return router;
};