const sqlite3 = require('sqlite3');

class Database {

    constructor() {
        this._db = new sqlite3.Database('dbfile.db');
        this._db.prepare('CREATE TABLE IF NOT EXISTS invoices(id, ammount, duedate)').run().finalize();
        this.errors = [];
        process.on('uncaughtException', () => this._db.close());
    }

    close() {
        this._db.close();
    }

    add({ id, ammount, duedate }) {
        this._db.run(`INSERT INTO invoices(id, ammount, duedate) VALUES(?, ?, ?)`, [id, ammount, duedate], err => {
            if (err) console.error(err);
        });
    }

    async get() {
        return new Promise((resolve, reject) => {
            this._db.all('SELECT * from invoices', (err, rows) => {
                resolve(rows)
            });
        });
    }
}

module.exports = new Database();