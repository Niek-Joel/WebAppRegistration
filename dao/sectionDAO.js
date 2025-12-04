
class SectionDAO {
    constructor(db) {
        this.db = db;
    }

    searchSections(filters) {
        return new Promise((resolve, reject) => {
            // Note: 1=1 makes the query dynamic. It avoids the base case ("WHERE AND") error when no params are specified.
            let query = 'SELECT * FROM section WHERE 1=1';
            let params = [];

            // If param was given, then add to query
            Object.entries(filters).forEach(([key, value]) => {
                if (value) { // If param was given
                    query += ` AND ${key} = ?`;
                    params.push(value);
                }
            });

            this.db.all(query, params, (err, rows) => {
                if (err) {
                    reject(err); // Triggers .catch in the promise
                }
                else {
                    resolve(rows);  // Triggers .then in the promise
                }
            });
        });
    }
}

export default SectionDAO;