import express from "express";
import RegistrationDAO from "../dao/registrationDAO.js";

const router = express.Router();

router.get("/", (req, res) => {
    const db = req.app.locals.db;
    const registrationDAO = new RegistrationDAO(db);

    const filters = {
        studentid: req.query.studentid,
        termid: req.query.termid,
        crn: req.query.crn
    };

    registrationDAO.searchRegistrations(filters)
        .then(rows => res.json({success: true, data: rows}))
        .catch(err => res.json({success: false, error: err.message}));
});

router.post("/", (req, res) => {
    const studentid = req.body.studentid;
    const termid = req.body.termid;
    const crn = req.body.crn;

    // Validate request
    if (!studentid || !termid || !crn) {
        return res.json({success: false, error: "Missing required fields"});
    }

    const db = req.app.locals.db;
    const registrationDAO = new RegistrationDAO(db);

    registrationDAO.addRegistration(studentid, termid, crn)
        .then(() => res.json({success: true, message: "Registration added successfully"}))
        .catch(err => res.json({success: false, error: err.message}));
});

// Drop a registration for a particular section (within the registration table)
router.delete("/", (req, res) => {
    const studentid = req.body.studentid;
    const termid = req.body.termid;
    const crn = req.body.crn;

    // Validate request
    if (!studentid || !termid || !crn) {
        return res.json({success: false, error: "Missing required fields"});
    }

    const db = req.app.locals.db;
    const registrationDAO = new RegistrationDAO(db);

    registrationDAO.deleteRegistration(studentid, termid, crn)
        .then(() => res.json({success: true, message: "Registration dropped successfully"}))
        .catch(err => res.json({success: false, error: err.message}));
});

// Withdraw from ALL sections
router.delete("/withdraw", (req, res) => {
    const studentid = req.body.studentid;
    const termid = req.body.termid;

    // Validate request
    if (!studentid || !termid) {
        return res.json({success: false, error: "Missing required fields"});
    }

    const db = req.app.locals.db;
    const registrationDAO = new RegistrationDAO(db);

    registrationDAO.withdrawFromAll(studentid, termid)
        .then(() => res.json({success: true, message: "Withdrawal successful"}))
        .catch(err => res.json({success: false, error: err.message}));
});

export default router;


