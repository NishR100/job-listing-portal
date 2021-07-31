const Job = require('./model');

const Manager = {
    // get all jobs from MongoDB using Job Model
    getAll: async () => {
        return await Job.find({});
    },
    // create new jobs using Job Model
    add: async t => {
        let job = new Job({ ...t });
        const r = await job.save();
        if (r === null)
            return false;

        // return newly created job object
        return r;
    },
    // update a job with its ID
    update: async (id, t) => {
        const r = await Job.findByIdAndUpdate(id, {
            $set: {
                title: t.title,
                description: t.description,
                skills: t.skills,
                dateUpdated: t.dateUpdated
            }
        }, {
            new: true
        });

        // return updated job object
        return r;
    },
    // delete a job by its ID
    delete: async id => {
        const t = await Job.findByIdAndDelete(id);
        if (t === null) return false;

        // return deletion results
        return t;
    }
};

module.exports = Manager;