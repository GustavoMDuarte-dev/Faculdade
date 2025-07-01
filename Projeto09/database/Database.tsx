import * as SQLite from 'expo-sqlite';

interface Query {
    sql: string
    args?: (string | number)[]
}

const table = "cachorro"

export class Database {
    static getConnection() {
        return SQLite.openDatabaseAsync("cachorroapp.db")
    }

    static async initDb(syncDb?: boolean) {
        const db = this.getConnection()
        console.log(db)

        if (syncDb || !(await this.isDbCreated())) {
            await this.dropDb()
            await this.createDb()
        }

    }

    static async ReinitDb(syncDb?: boolean) {
        const db = this.getConnection()
        console.log(db)

        await this.dropDb()
        await this.createDb()

    }

    private static async isDbCreated() {
        try {
            await this.runQuery(`SELECT 1 FROM  ${table};`)
            return true
        } catch (e) {
            return false
        }
    }

    private static async dropDb() {
        const db = this.getConnection();
        const queries = `DROP TABLE IF EXISTS 'cachorro';` ;
        (await db).runAsync(queries);
    }



    private static async createDb() {
        const db = this.getConnection();
        const queries = 
            `create table if not exists cachorro (
                id integer primary key autoincrement,
                nome text,
                raca text,
                pelagem text,
                datanasc text              
                );`;
        (await db).runAsync(queries);
    }

    static async runQuery(sql: Query['sql'], args?: Query['args']) {
        const db = this.getConnection()
        const result = (await db).runAsync(sql,args);
        return((await result).lastInsertRowId);
    }

    static async getAll() {
        const db = this.getConnection()
        const result = (await db).getAllAsync(`SELECT * FROM  ${table};`);
        return result;
    }
}
