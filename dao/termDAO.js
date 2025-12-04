class TermDAO {
    constructor(db) {
        this.db = db;
    }

    getAllTerms() {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM term';

            this.db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
}

export default TermDAO;