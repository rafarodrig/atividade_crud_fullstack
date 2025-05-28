import { Request, Response } from 'express';
import { AutorService } from '../service/AutorService';

export class AutorController {
  private service: AutorService;

  constructor(service: AutorService) {
    this.service = service;
  }

  inserir = async (req: Request, res: Response): Promise<void> => {
    const { nome, biografia } = req.body;
    try{ 
        const novoAutor = await this.service.inserir({ nome, biografia });
        res.status(201).json(novoAutor);
    }
    catch(err:any) {
        res.status(err.id).json({ error: err.msg });
    }
  };

  listar = async (_req: Request, res: Response): Promise<void> => {
    const autores = await this.service.listar();
    res.json(autores);
  };

  buscarPorId = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try{ 
        const autor = await this.service.buscarPorId(id);
        res.json(autor);
    } catch (err: any) {
        res.status(err.id).json({ error: err.msg });
    }
  };

  atualizar = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { nome, biografia } = req.body;

    try{ 
        const autor = await this.service.atualizar(id, { nome, biografia});
        res.json(autor);
    } catch (err: any) {
        res.status(err.id).json({ error: err.msg });
    }
  };

  deletar = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try{ 
        const autor = await this.service.deletar(id);
        res.json(autor);
    } catch (err: any) {
        res.status(err.id).json({ error: err.msg });
    }
  };
}