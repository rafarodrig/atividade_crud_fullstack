import { Repository } from 'typeorm';
import { Autor } from '../model/Autor';

export class AutorService {
  private repository: Repository<Autor>;

  constructor(repository: Repository<Autor>) {
    this.repository = repository;
  }

    async inserir(autor: Autor): Promise<Autor> {
    if(!autor.nome  || !autor.biografia) {
        throw ({id: 400, msg: "Falta dados obrigatorios"});    
    }
    return await this.repository.save(autor);
  }

  async listar(): Promise<Autor[]> {
    return await this.repository.find();
  }

  async buscarPorId(id: number): Promise<Autor> {
    const autor = await this.repository.findOneBy({id: id});
    if(!autor) {
        throw ({id: 404, msg: "Autor nao encontrado"});    
    }
    return autor;
  }

  async atualizar(id: number, autor: Autor): Promise<Autor> {
    if(!autor.nome  || !autor.biografia) {
        throw ({id: 400, msg: "Falta dados obrigatorios"});    
    }
    let autorAlt = await this.repository.findOneBy({id: id});
    
    if (!autorAlt || autorAlt == null) {
      throw ({id: 404, msg: "Autor nao encontrado"});    
    }    
    else {
      autorAlt.nome = autor.nome;
      autorAlt.biografia = autor.biografia;
      return await this.repository.save(autorAlt);
    }
  }

  async deletar(id: number): Promise<Autor> {
    const autor = await this.repository.findOneBy({id: id});
    if (!autor) {
        throw ({id: 404, msg: "Autor nao encontrado"});    
    }    
    else {
      await this.repository.remove(autor);
      return autor;
    }
  }
  
}