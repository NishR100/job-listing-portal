const API_URL = `${window.location.href}jobs`;

(async () => {
    const jobs = await getJobs();
    reloadJobs(jobs);
})();

$('#btn-create').click(e => {
    $('#modal-job').modal('show');
});

$('#modal-job').on('hidden.bs.modal', function (e) {
    clearForm();
});

$('#btn-save-changes').click(e => {
    let id = $('#txt-id').val() || null;
    let title = $('#txt-title').val();
    let description = $('#txt-description').val();
    let skills = $('#txt-skills').val();

    if (id && id.length > 0) {
        // udpate
        let data = {
            title,
            description,
            skills,
            dateUpdated: moment().format()
        };
        axios.post(`${API_URL}/${id}`, data)
            .then(async response => {
                if (response.status === 200) {
                    $('#modal-job').modal('hide');
                    const jobs = await getJobs();
                    reloadJobs(jobs);
                }
            })
            .catch(err => {
                alert(`Error: ${err.response.data}`);
            });
    } else {
        // create
        let data = {
            title,
            description,
            skills,
            dateCreated: moment().format(),
            dateUpdated: moment().format()
        };
        axios.post(API_URL, data)
            .then(async response => {
                if (response.status === 200) {
                    $('#modal-job').modal('hide');
                    const jobs = await getJobs();
                    reloadJobs(jobs);
                }
            })
            .catch(err => {
                alert(`Error: ${err.response.data}`);
            });
    }
});

function clearForm() {
    $("#modal-title").html("Create Job");
    $('#txt-id').val("");
    $('#txt-title').val("");
    $('#txt-description').val("");
    $('#txt-skills').val("");
}

function getJobs() {
    return new Promise((resolve, reject) => {
        axios.get(API_URL)
            .then(response => {
                if (response.status === 200) {
                    resolve(response.data);
                }
            })
            .catch(err => {
                reject(err.response.data);
            });
    });
}

function getJob(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/${id}`)
            .then(response => {
                if (response.status === 200) {
                    resolve(response.data);
                }
            })
            .catch(err => {
                reject(err.response.data);
            });
    });
}

async function editJob(id) {
    let job = await getJob(id);
    $("#modal-title").html("Update Job");
    $('#txt-id').val(job._id);
    $('#txt-title').val(job.title);
    $('#txt-description').val(job.description);
    $('#txt-skills').val(job.skills);
    $('#modal-job').modal('show');
}

function reloadJobs(arr) {
    if(arr.length === 0) {
        $('#tbl-data').html(`<tr class="text-center"><td colspan="5">No jobs found.</td></tr>`);
        return;
    }

    let html = ``;
    arr.forEach(job => {
        html += `<tr>
            <td class="text-left">${job.title}</td>
            <td class="text-left">${job.description}</td>
            <td class="text-left">${job.skills}</td>
            <td>${moment(job.dateCreated).format("DD-MMM-YYYY")}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editJob('${job._id}')">Edit</button>
                <button class="btn btn-sm btn-danger">Delete</button>
            </td>
        </tr>`;
    });

    $('#tbl-data').html(html);
}
