import express from "express";
import SubjectDAO from "../dao/subjectDAO.js";

const router = express.Router();

router.get("/", (req, res) => {
    const db = req.app.locals.db;
    const subjectDAO = new SubjectDAO(db);

    subjectDAO.getAllSubjects()
        .then(rows => res.json({success: true, data: rows}))
        .catch(err => res.json({success: false, error: err.message}));
});

export default router;