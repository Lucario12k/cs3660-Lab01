function getAll() {
    return fetch('/api/employees')
        .then((response) => response.json());
}

function getById(id) {
    return fetch(`/api/employees/${id}`)
        .then((response) => response.json());
}