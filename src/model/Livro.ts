import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Autor } from "./Autor";

export enum LivroStatus {
    DISPONIVEL = "disponivel",
    EMPRESTADO = "emprestado"
}

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
        nullable: true
    })
    capaUrl?:string;
    @Column({
            type : "enum",
            enum: LivroStatus,
            default: LivroStatus.DISPONIVEL
        })
        status?: LivroStatus;
  }