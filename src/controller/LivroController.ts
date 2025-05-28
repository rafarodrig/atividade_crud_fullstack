import { Request, Response } from 'express';
import { LivroService } from '../service/LivroService';

export class LivroController {
  private service: LivroService;

  constructor(service: LivroService) {
    this.service = service;
  }

  inserir = async (req: Request, res: Response): Promise<void> => {
    const { titulo, autor, isbn } = req.body;
    try{ 
        const novoLivro = await this.service.inserir({ titulo, autor,isbn });
        res.status(201).json(novoLivro);
    }
    catch(err:any) {
        res.status(err.id).json({ error: err.msg });
    }
  };

  listar = async (_req: Request, res: Response): Promise<void> => {
    const livros = await this.service.listar();
    res.json(livros);
  };

  buscarPorId = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try{ 
        const livro = await this.service.buscarPorId(id);
        res.json(livro);
    } catch (err: any) {
        res.status(err.id).json({ error: err.msg });
    }
  };

  atualizar = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { titulo, autor, isbn } = req.body;

    try{ 
        const LivroAtulalizado = await this.service.atualizar(id, { titulo, autor, isbn });
        res.json(LivroAtulalizado);
    } catch (err: any) {
        res.status(err.id).json({ error: err.msg });
    }
  };

  deletar = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try{ 
        const livro = await this.service.deletar(id);
        res.json(livro);
    } catch (err: any) {
        res.status(err.id).json({ error: err.msg });
    }
  };
}