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

function reloadJobs(arr) {
    if(arr.length === 0) {
        $('#tbl-data').html(`<tr class="text-center"><td colspan="4">No jobs found.</td></tr>`);
        return;
    }

    let html = ``;
    arr.forEach(job => {
        html += `<tr>
            <td>${job.title}</td>
            <td>${job.description}</td>
            <td>${job.skills}</td>
            <td>${moment(job.dateCreated).format("DD-MMM-YYYY")}</td>
        </tr>`;
    });

    $('#tbl-data').html(html);
}
