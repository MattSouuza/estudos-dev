import fs from 'node:fs/promises';

const databasePath = new URL("db.json", import.meta.url);

export default class Database {
    // atributo privado, o que define que ele é privado é o "#"
    #database = {};

    constructor() {
        fs.readFile(databasePath, "utf8")
            .then(data => {
                this.#database = JSON.parse(data);
            })
            .catch(() => {
                this.#persist();
            })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    select(table, search) {
        let data = this.#database[table];

        if (!data) {
            return [];
        }

        if (search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => row[key].toLowerCase().includes(value.toLowerCase()))
            })
        }

        return data;
    }

    insert(table, data) {
        if (!data) {
            return;
        }

        if (!Array.isArray(this.#database[table])) {
            this.#database[table] = new Array(data);

            return;
        }

        this.#database[table].push(data);
        this.#persist();
    }

    update(table, id, newData) {
        if (!this.#database[table]) {
            throw new TypeError(`Tabela ${table} não existe!`);
        }

        const rowIndex = this.#database[table].findIndex(row => row.id === id);

        if (rowIndex === -1) {
            throw new RangeError(`A entidade de ID '${id}' e/ou a tabela '${table}', não existe(m)!'`)
        }

        this.#database[table][rowIndex] = { id, ...newData };
        this.#persist();
    }

    delete(table, id) {
        if (!this.#database[table]) {
            throw new TypeError(`Tabela ${table} não existe!`);
        }

        const rowIndex = this.#database[table].findIndex(row => row.id === id);

        if (rowIndex === -1) {
            throw new RangeError(`A entidade de ID '${id}' e/ou a tabela '${table}', não existe(m)!'`)
        }

        this.#database[table].splice(rowIndex, 1);
        this.#persist();
    }
}