import { Request, Response } from 'express';
import { ClienteService } from '../service/ClienteService';

export class ClienteController {
  private service: ClienteService;

  constructor(service: ClienteService) {
    this.service = service;
  }

  inserir = async (req: Request, res: Response): Promise<void> => {
    const { nome, email } = req.body;
    try{ 
        const novoCliente = await this.service.inserir({ nome, email });
        res.status(201).json(novoCliente);
    }
    catch(err:any) {
        res.status(err.id).json({ error: err.msg });
    }
  };

  listar = async (_req: Request, res: Response): Promise<void> => {
    const clientes = await this.service.listar();
    res.json(clientes);
  };

  buscarPorId = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try{ 
        const cliente = await this.service.buscarPorId(id);
        res.json(cliente);
    } catch (err: any) {
        res.status(err.id).json({ error: err.msg });
    }
  };

  atualizar = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { nome, email } = req.body;

    try{ 
        const clienteAtulalizado = await this.service.atualizar(id, { nome, email });
        res.json(clienteAtulalizado);
    } catch (err: any) {
        res.status(err.id).json({ error: err.msg });
    }
  };

  deletar = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try{ 
        const cliente = await this.service.deletar(id);
        res.json(cliente);
    } catch (err: any) {
        res.status(err.id).json({ error: err.msg });
    }
  };
}