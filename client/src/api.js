export function filterByActive(list, active) {
    return list.filter((employee) => employee.active == active);
}

export function getAll() {
    return fetch(`/api/employees`);
}

export function getById(id) {
    return fetch(`/api/employees/${id}`);
}

export function getAllBySearch(terms) {
    return fetch(`/api/employees/search/${encodeURIComponent(terms)}`);
}

export function postNewEmployee(employee) {
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

export function updateById(id, employee) {
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

export function deleteById(id) {
    return fetch(`/api/employees/${id}`, {
        method: 'DELETE'
    });
}

export function activateById(id) {
    return fetch(`/api/employees/activate/${id}`, {
        method: 'PUT'
    });
}