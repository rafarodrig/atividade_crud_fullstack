import { Router } from 'express';
import { LivroController } from '../controller/LivroController';

export const livroRotas = (controller: LivroController): Router => {
  const router = Router();

  router.post('/', controller.inserir);
  router.get('/', controller.listar);
  router.get('/:id', controller.buscarPorId);
  router.put('/:id', controller.atualizar);
  router.delete('/:id', controller.deletar);

  return router;
};