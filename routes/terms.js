import express from "express";
import TermDAO from "../dao/termDAO.js";

const router = express.Router();

router.get("/", (req, res) => {
    const db = req.app.locals.db;
    const termDAO = new TermDAO(db);

    termDAO.getAllTerms()
        .then(rows => res.json({success: true, data: rows}))
        .catch(err => res.json({success: false, error: err.message}));
});

export default router;