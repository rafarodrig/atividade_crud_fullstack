import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Emprestimo } from "./Emprestimo";

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    nome?: string;
    @Column()
    email?: string;
    @OneToMany(()=> Emprestimo, (emprestimo) => emprestimo.cliente)
    emprestimos?: Emprestimo[];
}