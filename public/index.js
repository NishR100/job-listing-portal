const API_URL = `${window.location.href}jobs`;

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
        await axios.post(API_URL, data)
            .then(response => {
                if (response.status === 200) {
                    $('#modal-job').modal('hide');
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
