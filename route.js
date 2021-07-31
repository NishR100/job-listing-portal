const router = require('express').Router();
// all operations related to jobs are managed inside a single file, called manager
// to call any method from route, we'll call it via manager
const jobManager = require('./manager');

// GET - to get all jobs
// this will be called on /jobs/ path
router.get('/', async (req, res) => {
    try {
        // not taking any input parameters
        // calling manager method to get all jobs
        const t = await jobManager.getAll();
        // returning the jobs to response
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

// POST - to create new job
// this will be called for /jobs/ path to create new job
router.post('/', async (req, res) => {
    try {
        // calling manager method to add new job in the database
        let t = await jobManager.add(req.body);
        // returning the newly created job to response
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

// POST - to update existing job
// this will be called for /jobs/<job-id>
router.post('/:id', async (req, res) => {
    try {
        // getting request parameter
        const id = req.params.id;
        // calling manager method to update a job with its ID
        const t = await jobManager.update(id, { ...req.body });
        // return udpated job to response
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

// DELETE - delete a job by its ID
router.delete('/:id', async (req, res) => {
    try {
        // getting request parameter
        const id = req.params.id;
        // calling manager method to delete a job with its ID
        const r = await jobManager.delete(id);
        // return results to response
        return res.status(200).send(r);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

module.exports = router;