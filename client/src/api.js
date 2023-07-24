function getAll() {
    return fetch('/api/employees');
}

function getById(id) {
    return fetch(`/api/employees/${id}`);
}

function getAllBySearch(terms) {
    return fetch(`/api/employees/search/${encodeURIComponent(terms)}`);
}

function postNewEmployee(employee) {
    const formData = new URLSearchParams();
    formData.append('name', employee.name);
    formData.append('title', employee.title);
    formData.append('avatar', employee.avatar);

    return fetch('/api/employees', {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData
    });
}

function updateById(id, employee) {
    const formData = new URLSearchParams();
    formData.append('name', employee.name);
    formData.append('title', employee.title);
    formData.append('avatar', employee.avatar);

    return fetch(`/api/employees/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData
    });
}

function deleteById(id) {
    return fetch(`/api/employees/${id}`, {
        method: 'DELETE'
    });
}

export { getAll, getById, getAllBySearch, postNewEmployee, updateById, deleteById };