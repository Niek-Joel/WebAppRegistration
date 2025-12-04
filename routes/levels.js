import express from 'express';
import LevelDAO from '../dao/levelDAO.js';

const router = express.Router();

router.get('/', (req, res) => {
    const db = req.app.locals.db;
    const levelDAO = new LevelDAO(db);

    levelDAO.getAllLevels()
        .then(rows => res.json({success: true, data: rows}))
        .catch(err => res.json({success: false, error: err.message}));
});

export default router;
