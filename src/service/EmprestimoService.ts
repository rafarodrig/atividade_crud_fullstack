import { Repository } from 'typeorm';
import { Emprestimo, EmprestimoStatus } from '../model/Emprestimo';
import { LivroService } from './LivroService';
import { ClienteService } from './ClienteService';


export class EmprestimoService {

  constructor(
    private repository: Repository<Emprestimo>,
    private livroService: LivroService,
    private clienteService: ClienteService
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
    let emprestimo = await this.repository.findOne({
        relations: {
            cliente: true,
            listaLivros: true
        },
        where: {        
            id: id
        }
    });
    if(!emprestimo) {
        throw ({id: 404, msg: "Emprestimo nao encontrado"});    
    }
    return emprestimo;
  }

  async concluirEmprestimo(id: number): Promise<Emprestimo> {
    let emprestimoAlt = await this.buscarPorId(id);
    // if(!emprestimoAlt.listaLivros) {
    //     throw ({id: 404, msg: "A lista de livros esta vazia"});    
    // }
    this.livroService.alterarStatusLivrosParaDisponivel(emprestimoAlt.listaLivros!)
    emprestimoAlt.data_devolucao = new Date()
    emprestimoAlt.status = EmprestimoStatus.CONCLUIDO;
    return await this.repository.save(emprestimoAlt);
  }

  async buscarPorClienteId(id: number): Promise<Emprestimo[]> {
  
  await this.clienteService.buscarPorId(id)

  const emprestimos = await this.repository.find({
    where: {
      cliente: {
        id: id
      }
    },
    relations: {
      cliente: true,
      listaLivros: true
    }
  });

  return emprestimos;
}

}