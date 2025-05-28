import { Request, Response } from "express";
import { EmprestimoService } from "../service/EmprestimoService";

export class EmprestimoController {
    private service: EmprestimoService;
  
    constructor(service: EmprestimoService) {
      this.service = service;
    }
  
    inserir = async (req: Request, res: Response): Promise<void> => {
      const { cliente, listaLivros, data_devolucao_prevista } = req.body;
      try{ 
          const novoEmprestimo = await this.service.inserir({ cliente, listaLivros, data_devolucao_prevista });
          res.status(201).json(novoEmprestimo);
      }
      catch(err:any) {
          res.status(err.id).json({ error: err.msg });
      }
    };
  
    listar = async (_req: Request, res: Response): Promise<void> => {
      const emprestimos = await this.service.listar();
      res.json(emprestimos);
    };
  
    buscarPorId = async (req: Request, res: Response): Promise<void> => {
      const id = parseInt(req.params.id);
      try{ 
          const emprestimos = await this.service.buscarPorId(id);
          res.json(emprestimos);
      } catch (err: any) {
          res.status(err.id).json({ error: err.msg });
      }
    };

    concluirEmprestimo = async (req: Request, res: Response): Promise<void> => {
      const id = parseInt(req.params.id);
      try{ 
          const emprestimos = await this.service.concluirEmprestimo(id);
          res.json(emprestimos);
      } catch (err: any) {
          res.status(err.id).json({ error: err.msg });
      }
    }

    buscarPorClienteId = async (req: Request, res: Response): Promise<void> => {
      const id = parseInt(req.params.id);
      try{ 
          const emprestimos = await this.service.buscarPorClienteId(id);
          res.json(emprestimos);
      } catch (err: any) {
          res.status(err.id).json({ error: err.msg });
      }
    }

}