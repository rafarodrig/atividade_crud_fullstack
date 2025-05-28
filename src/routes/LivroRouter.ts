import { Router } from 'express';
import { LivroController } from '../controller/LivroController';
import { upload } from '../middlewares/upload';

export const livroRotas = (controller: LivroController): Router => {
  const router = Router();

  router.post('/', upload.single('capa'), controller.inserir);
  router.get('/', controller.listar);
  router.get('/:id', controller.buscarPorId);
  router.put('/:id', upload.single('capa'), controller.atualizar);
  router.delete('/:id', controller.deletar);

  return router;
};