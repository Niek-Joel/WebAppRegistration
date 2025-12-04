import express from 'express';
import ScheduleTypeDAO from '../dao/scheduletypeDAO.js';

const router = express.Router();

router.get('/', (req, res) => {
    const db = req.app.locals.db;
    const scheduleTypeDAO = new ScheduleTypeDAO(db);

    scheduleTypeDAO.getAllScheduleTypes()
        .then(rows => res.json({success: true, data: rows}))
        .catch(err => res.json({success: false, error: err.message}));
});

export default router;