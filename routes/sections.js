import express from "express";
import SectionDAO from "../dao/sectionDAO.js";

const router = express.Router();

// path is only "/" because my server specifies the route
router.get("/", (req, res) => {
    const db = req.app.locals.db;
    const sectionDAO = new SectionDAO(db);

    const filters = {
        termid: req.query.termid,
        crn: req.query.crn,
        subjectid: req.query.subjectid,
        num: req.query.num,
        section: req.query.section,
        scheduletypeid: req.query.scheduletypeid,
        instructor: req.query.instructor,
        start: req.query.start,
        end: req.query.end,
        days: req.query.days,
        location: req.query.location
    };

    sectionDAO.searchSections(filters)
        .then(rows => res.json({success: true, data: rows}))
        .catch(err => res.json({success: false, error: err.message}));
});

export default router;