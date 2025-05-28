import { Router } from 'express';
import { AutorController } from '../controller/AutorController';

export const autorRotas = (controller: AutorController): Router => {
  const router = Router();

  router.post('/', controller.inserir);
  router.get('/', controller.listar);
  router.get('/:id', controller.buscarPorId);
  router.put('/:id', controller.atualizar);
  router.delete('/:id', controller.deletar);

  return router;
};