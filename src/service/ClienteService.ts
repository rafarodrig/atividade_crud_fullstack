import { Repository } from 'typeorm';
import { Cliente} from '../model/Cliente';

export class ClienteService {
  private repository: Repository<Cliente>;

  constructor(repository: Repository<Cliente>) {
    this.repository = repository;
  }

    async inserir(cliente: Cliente): Promise<Cliente> {
    if(!cliente.nome  || !cliente.email ) {
        throw ({id: 400, msg: "Falta dados obrigatorios"});    
    }
    return await this.repository.save(cliente);
  }

  async listar(): Promise<Cliente[]> {
    return await this.repository.find();
  }

  async buscarPorId(id: number): Promise<Cliente> {
    const cliente = await this.repository.findOneBy({id:id});
    if(!cliente) {
        throw ({id: 404, msg: "Cliente nao encontrado"});    
    }
    return cliente;
  }

  async atualizar(id: number, cliente: Cliente): Promise<Cliente> {
    if(!cliente.nome  || !cliente.email ) {
        throw ({id: 400, msg: "Falta dados obrigatorios"});    
    }
    
    let clientAlt = await this.repository.findOneBy({id: id});
    console.log("cliente ", clientAlt)

    if (!clientAlt || clientAlt == null) {
      throw ({id: 404, msg: "Cliente nao encontrado"});    
    } 
    else {
      clientAlt.nome = cliente.nome;
      clientAlt.email = cliente.email;
      return await this.repository.save(clientAlt);
    }
  }

  async deletar(id: number): Promise<Cliente> {
    const cliente = await this.repository.findOneBy({id: id});
    if (!cliente) {
        throw ({id: 404, msg: "Cliente nao encontrado"});    
    }    
    else {
      await this.repository.remove(cliente);
      return cliente;
    }
  }
}