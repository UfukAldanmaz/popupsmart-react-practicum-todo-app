import { useState, useLayoutEffect, useRef } from 'react';
import axios from 'axios';

const TodoItem = ({ data, onDelete, onEdit }) => {
    const [loading, setLoading] = useState(false);
    const [editingContent, setEditingContent] = useState('');
    const [inEditMode, setInEditMode] = useState(false);

    const url = `https://6317245a82797be77ff48a60.mockapi.io/todos/${data.id}`;

    const editInput = useRef(null);

    useLayoutEffect(() => {
        setEditingContent(data.content);
    }, [data])

    const deleteTodo = () => {
        setLoading(true)
        axios.delete(url)
            .then(() => {
                onDelete(data.id);
                setLoading(false);
            })
    }

    const handleEditTodo = () => {

        if (inEditMode) {
            axios.put(url,
                {
                    content: editingContent
                }
            )
                .then((response) => {
                    setInEditMode(false);
                    onEdit(response.data)

                    editInput.current.disabled = true;
                    editInput.current.className = "read-mode";
                })
        } else {
            setInEditMode(true);

            editInput.current.disabled = false;
            editInput.current.className = "edit-mode";
        }
    }

    return (
        <>
            <input type="text" disabled={true} className='read-mode' ref={editInput} value={editingContent} onChange={(e) => setEditingContent(e.target.value)} />
            <button onClick={() => handleEditTodo()}>{inEditMode ? "Save" : "Edit"}</button>
            <button disabled={loading} onClick={() => deleteTodo(data.id)}>Delete</button>

        </>);
}

export default TodoItem;