import {useState} from 'react';
import {getById, postNewEmployee, updateById} from './api';

function EmployeeUpdater() {
    const [empId, setEmpId] = useState("");
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [avatar, setAvatar] = useState("");

    async function handleGet(event) {
        event.preventDefault();
        const res = await getById(empId);

        if (res.status != 200) {
            alert(`Error ${res.status}: ${res.statusText}`);
            return;
        }

        const retEmp = (await res.json())[0];

        setName(retEmp.name);
        setTitle(retEmp.title);
        setAvatar(retEmp.avatar);
    }

    async function handleSave(event) {
        event.preventDefault();
        const employee = {
            name: name,
            title: title,
            avatar: avatar
        };

        if (empId == "") {
            const res = await postNewEmployee(employee);

            if (res.status == 201) {
                alert(`Successfully created new employee`);
            } else {
                alert(`Error ${res.status}: ${res.statusText}`);
            }
        } else {
            const res = await updateById(empId, employee);

            if (res.status == 204) {
                alert(`Successfully updated employee #${empId}.`);
            } else {
                alert(`Error ${res.status}: ${res.statusText}`);
            }
        }
    }

    return (
        <>
            <form onSubmit={handleGet}>
                <p>
                    <label htmlFor="empId">
                        ID:&nbsp;
                    </label>
                    <input 
                        type="text" 
                        id="empId"
                        value={empId}
                        onChange={(e) => setEmpId(e.target.value)} />
                    &nbsp;
                    <input type="submit" value="Get" />
                </p>
            </form>
            <form onSubmit={handleSave}>
                <p>
                    <label htmlFor="name">
                        Name:&nbsp;
                    </label>
                    <input 
                        type="text" 
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="title">
                        Title:&nbsp;
                    </label>
                    <input 
                        type="text" 
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="avatar">
                        Avatar URL:&nbsp;
                    </label>
                    <input 
                        type="text" 
                        id="avatar"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)} />
                </p>
                <input type="submit" value="Save" />
            </form>
        </>
    );
}

export default EmployeeUpdater;