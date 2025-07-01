import { Database } from "./Database";
import { Cachorro } from "../model/Cachorro";

export class CachorroService {
    static TABLE = `cachorro`;

    static async create(obj: Cachorro) {
        const resultado = await Database.runQuery(`
            INSERT INTO ${this.TABLE} 
            (
                nome,
                raca,
                pelagem,
                datanasc
            )
            VALUES (?,?,?,?)`, 
            [
                obj.nome,
                obj.raca,
                obj.pelagem,
                obj.datanasc
            ]
        )
        console.log(resultado);
        obj.id = resultado;
        return obj;
    }

    static async update(obj: Cachorro) {
        const resultado = await Database.runQuery(`
            UPDATE ${this.TABLE} 
            SET nome=?, raca=?, pelagem=?, datanasc=? 
            WHERE id=?
            `, 
            [
                obj.nome,
                obj.raca,
                obj.pelagem,
                obj.datanasc,
                obj.id
            ]
        )
        return resultado.rowsAffected;
    }

    static async delete(obj: Cachorro) {
        const resultado = await Database.runQuery(`
                DELETE FROM ${this.TABLE} WHERE id = ?;
            `, [obj.id]);
        
        return resultado.rowsAffected;
    }

    static async findAll() {
        const allRows = await Database.getAll();
        return allRows.map(row => new Cachorro(row))
    }
}