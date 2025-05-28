import { Repository } from 'typeorm';
import { Emprestimo, EmprestimoStatus } from '../model/Emprestimo';
import { LivroService } from './LivroService';


export class EmprestimoService {

  constructor(
    private repository: Repository<Emprestimo>,
    private livroService: LivroService
  ) {}

  async inserir(emprestimo: Emprestimo): Promise<Emprestimo> {    
    if(!emprestimo.cliente || !emprestimo.listaLivros || emprestimo.listaLivros.length <=0 || !emprestimo.data_devolucao_prevista) {
        throw ({id: 400, msg: "Falta dados obrigatorios"});    
    } 
    
    emprestimo.listaLivros = await this.livroService.alterarStatusLivrosParaEmprestado(emprestimo.listaLivros)

    return await this.repository.save(emprestimo);
  }

  async listar(): Promise<Emprestimo[]> {
    return await this.repository.find({ 
        relations: { 
            cliente: true
        }
    });
  }

  async buscarPorId(id: number): Promise<Emprestimo> {
    let Emprestimo = await this.repository.findOne({
        relations: {
            cliente: true,
            listaLivros: true
        },
        where: {        
            id: id
        }
    });
    if(!Emprestimo) {
        throw ({id: 404, msg: "Emprestimo nao encontrado"});    
    }
    return Emprestimo;
  }

  async concluirEmprestimo(id: number): Promise<Emprestimo> {
    let emprestimoAlt = await this.buscarPorId(id)

    

    emprestimoAlt.data_devolucao = new Date()
    emprestimoAlt.status = EmprestimoStatus.CONCLUIDO;
    return await this.repository.save(emprestimoAlt);
  }

}