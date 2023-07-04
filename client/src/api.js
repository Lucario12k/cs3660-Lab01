function getAll() {
    return fetch('/api/employees')
        .then((response) => response.json());
}

function getById(id) {
    return fetch(`/api/employees/${id}`)
        .then((response) => response.json());
}

function postNewEmployee(employee) {
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('title', employee.title);
    formData.append('avatar', employee.avatar);

    return fetch('/api/employees', {
        method: 'POST',
        body: formData
    }).then((response) => response.json());
}

function updateById(id, employee) {
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('title', employee.title);
    formData.append('avatar', employee.avatar);

    return fetch(`/api/employees/${id}`, {
        method: 'PUT',
        body: formData
    }).then((response) => response.json());
}

function deleteById(id) {
    return fetch(`/api/employees/${id}`, {
        method: 'DELETE'
    }).then((response) => response.json());
}

export {getAll, getById, postNewEmployee, updateById, deleteById};