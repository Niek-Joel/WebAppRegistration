class ScheduleTypeDAO {
    constructor(db) {
        this.db = db;
    }

    getAllScheduleTypes() {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM scheduletype';

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

export default ScheduleTypeDAO;