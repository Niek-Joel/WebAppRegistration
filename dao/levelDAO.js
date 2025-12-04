class LevelDAO {
    constructor(db) {
        this.db = db;
    }

    getAllLevels() {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM level';
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

export default LevelDAO;