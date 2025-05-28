import { Repository } from 'typeorm';
import { Livro, LivroStatus} from '../model/Livro';
import { injectable } from 'tsyringe';

@injectable()
export class LivroService {
  private repository: Repository<Livro>;

  constructor(repository: Repository<Livro>) {
    this.repository = repository;
  }

    async inserir(livro: Livro, capaFilename: string | undefined): Promise<Livro> {
    if(!livro.titulo  || !livro.autor || !livro.isbn) {
        throw ({id: 400, msg: "Falta dados obrigatorios"});    
    }
    if(capaFilename) livro = await this.atualizarFotoCapa(livro, capaFilename);
    
    return await this.repository.save(livro);
  }

  async listar(): Promise<Livro[]> {
    return await this.repository.find();
  }

  async buscarPorId(id: number): Promise<Livro> {
    let livro = await this.repository.findOne({
        relations: {
            autor: true
        },
        where: {        
            id: id
        }
    });
    if(!livro) {
        throw ({id: 404, msg: "Livro nao encontrado"});    
    }
    return livro;
  }

  async atualizar(id: number, livro: Livro, capaFilename: string | undefined): Promise<Livro> {
    if(!livro.titulo  || !livro.autor || !livro.isbn) {
        throw ({id: 400, msg: "Falta dados obrigatorios"});    
    }
    let livroAlt = await this.repository.findOneBy({id: id});
    console.log("livro ", livroAlt)
    if (!livroAlt || livroAlt == null) {
      throw ({id: 404, msg: "Livro nao encontrado"});    
    }    
    else {
      livroAlt.titulo = livro.titulo;
      livroAlt.autor = livro.autor;
      livroAlt.isbn = livro.isbn;
      if(capaFilename) livroAlt = await this.atualizarFotoCapa(livroAlt, capaFilename)
      return await this.repository.save(livroAlt);
    }
  }

  async deletar(id: number): Promise<Livro> {
    let livroDeletado = await this.repository.findOneBy({id: id});
    if (!livroDeletado) {
        throw ({id: 404, msg: "Livro nao encontrado"});    
    }    
    else {
      await this.repository.remove(livroDeletado);
      return livroDeletado;
    }
  }
  
  async alterarStatusLivrosParaEmprestado(livros: Livro[]):Promise<Livro[]>  {
    const livrosAlt : Livro[] = [];
    for (const livro of livros ) {

      let livroAlt = await this.repository.findOneBy({id: livro.id})

      if (!livroAlt || livroAlt == null) {
        throw ({id: 404, msg: `Livro de id "${livro.id}" nao encontrado`});    
      }

      else if( livroAlt.status === LivroStatus.EMPRESTADO){
        throw ({id: 409, msg: `Livro de id ${livro.id} nao esta disponivel no momento`})
      } 
      else {
        livrosAlt.push(livroAlt)
      }

    }

    for (let livroAlt of livrosAlt){
      livroAlt.status = LivroStatus.EMPRESTADO
      await this.repository.save(livroAlt);
    }
    return livrosAlt
  }

  async alterarStatusLivrosParaDisponivel(livros: Livro[]):Promise<void> {

    for(let livro of livros) {
      livro.status = LivroStatus.DISPONIVEL
      await this.repository.save(livro);
    }
  }

  async atualizarFotoCapa(livro:Livro, capaFilename: string ){  
    livro.capaUrl = `/uploads/${capaFilename}`; 
    return await this.repository.save(livro);
  }

}