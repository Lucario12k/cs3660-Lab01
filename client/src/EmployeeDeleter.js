import {useState} from 'react';
import {deleteById} from './api';

function EmployeeDeleter() {
    const [empId, setEmpId] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        const res = await deleteById(empId);
        if (res.status == 204) {
            alert(`Successfully deleted employee #${empId}.`);
        } else {
            alert(`Error ${res.status}: ${res.statusText}`);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
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
                <input type="submit" value="Delete" />
            </p>
        </form>
    );
}

export default EmployeeDeleter;