import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Autor } from "./Autor";

export enum LivroStatus {
    DISPONIVEL = "disponivel",
    EMPRESTADO = "emprestado"
}
// (título, autor, ISBN, categoria, status: disponível/emprestado)
@Entity()
export class Livro {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    titulo?: string;
    @ManyToOne(()=> Autor, (autor) => autor.livros)
    autor?: Autor;
    @Column()
    isbn?:string;
    @Column({
            type : "enum",
            enum: LivroStatus,
            default: LivroStatus.DISPONIVEL
        })
        status?: LivroStatus;
  }