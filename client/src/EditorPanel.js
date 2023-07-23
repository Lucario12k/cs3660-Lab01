import { useState } from 'react';
import { getById, postNewEmployee, updateById } from './api';
import './EditorPanel.css';

function EditorPanel() {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [avatar, setAvatar] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        if (event.nativeEvent.submitter.id == "editor-cancel") {
            handleCancel();
        } else {
            handleSave();
        }
    }

    function handleCancel() {
        console.log("Cancel");
    }

    function handleSave() {
        const employee = {
            name: name,
            title: title,
            avatar: avatar
        };

        console.log("Save");

        /*const res = await updateById(empId, employee);

        if (res.status == 204) {
            alert(`Successfully updated employee #${empId}.`);
        } else {
            alert(`Error ${res.status}: ${res.statusText}`);
        }*/
    }

    return (
        <div className="EditorPanel">
            <img src="https://api.dicebear.com/6.x/bottts/svg?seed=test" />
            <form onSubmit={handleSubmit}>
                <label id="editor-label-name" htmlFor="editor-input-name">
                    Name:
                </label>
                <input
                    type="text"
                    id="editor-input-name"
                    placeholder="Enter Name Here"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />

                <label id="editor-label-title" htmlFor="editor-input-title">
                    Title:
                </label>
                <input
                    type="text"
                    id="editor-input-title"
                    placeholder="Enter Title Here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />

                <label id="editor-label-avatar" htmlFor="editor-input-avatar">
                    Avatar:
                </label>
                <input
                    type="text"
                    id="editor-input-avatar"
                    placeholder="Leave Empty for Default"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)} />

                <input id="editor-cancel" type="submit" value="Cancel" />
                <input id="editor-save" type="submit" value="Save" />
            </form>
        </div>
    );
}

export default EditorPanel;