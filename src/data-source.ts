import { DataSource } from "typeorm";
import { Cliente } from "./model/Cliente";
import { Emprestimo } from "./model/Emprestimo";
import { Livro } from "./model/Livro";
import { Autor } from "./model/Autor";

export const AppDataSource = new DataSource({
    type: "postgres",    
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "123456",
    database: "api_atividade_biblioteca",
    synchronize: true,
    logging: true,
    // dropSchema: true, //adicionar se quiser limpar o banco
    entities: [ Livro, Cliente, Emprestimo, Autor],
    subscribers: [],
    migrations: [],
})
