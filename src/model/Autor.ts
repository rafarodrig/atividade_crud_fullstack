import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Livro } from "./Livro";
@Entity()
export class Autor {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    nome?: string;
    @Column("text")
    biografia?: string;
    @OneToMany(()=> Livro, (livro) => livro.autor)
    livros?: Livro[];
}