
class SubjectDAO {
    constructor(db) {
        this.db = db;
    }

    getAllSubjects() {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM subject';

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

export default SubjectDAO;