import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./Cliente";
import { Livro } from "./Livro";

export enum EmprestimoStatus {
    ATIVO = "ativo",
    CONCLUIDO = "concluido",
    ATRASADO = "atrasado",
}



// {
//     "cliente" : int ,
//     "data_devolucao_prevista" : "YYYY-MM-DD HH:MM"
    // "listaLivros" : [{"id": int },]
// }


@Entity()
export class Emprestimo {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: 'timestamptz',
        default: () => "CURRENT_TIMESTAMP",
    })
    data_emprestimo?: Date;

    @Column('timestamptz')
    data_devolucao_prevista?: Date;

    @Column({
        type: 'timestamptz',
        default: null,
    })
    data_devolucao?: Date;

    @ManyToOne(()=> Cliente, (cliente) => cliente.emprestimos)
    cliente?: Cliente;

    @ManyToMany(()=>Livro)
    @JoinTable()
    listaLivros?: Livro[];

    @Column({
        type : "enum",
        enum: EmprestimoStatus,
        default: EmprestimoStatus.ATIVO
    })
    status?: EmprestimoStatus;
}