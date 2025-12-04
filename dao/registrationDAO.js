
class RegistrationDAO {
    constructor(db) {
        this.db = db;
    }

    searchRegistrations(filters) {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM registration WHERE 1=1';
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

    addRegistration(studentid, termid, crn) {
        return new Promise((resolve, reject) => {
            let query = 'INSERT INTO registration (studentid, termid, crn) VALUES (?, ?, ?)';
            let params = [studentid, termid, crn];

            this.db.run(query, params, function(err){
                if (err) {
                    reject(err);
                }
                else {
                    resolve({id: this.lastID, changes: this.changes});
                }
            });
        });
    }

    // Specific section
    deleteRegistration(studentid, termid, crn) {
        return new Promise((resolve, reject) => {
            let query = 'DELETE FROM registration WHERE studentid = ? AND termid = ? AND crn = ?';
            let params = [studentid, termid, crn];

            this.db.run(query, params, function(err){
                if (err) {
                    reject(err);
                }
                else if (this.changes === 0) {
                    reject(new Error('Registration not found'));
                }
                else {
                    resolve({changes: this.changes});
                }
            });
        })
    }

    withdrawFromAll(studentid, termid) {
        return new Promise((resolve, reject) => {
            let query = 'DELETE FROM registration WHERE studentid = ? AND termid = ?';
            let params = [studentid, termid];

            this.db.run(query, params, function(err){
                if (err) {
                    reject(err);
                }
                else if (this.changes === 0) {
                    reject(new Error('No registrations found'));
                }
                else {
                    resolve({changes: this.changes});
                }
            });
        });
    }

}

export default RegistrationDAO;