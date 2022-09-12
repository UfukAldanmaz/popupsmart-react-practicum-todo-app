import { useState, useLayoutEffect, useRef, useEffect } from 'react';
import axios from 'axios';
import '../style.css'

const TodoItem = ({ index, data, onDelete, onEdit, onComplete }) => {
    const [loading, setLoading] = useState(false);
    const [editingContent, setEditingContent] = useState('');
    const [inEditMode, setInEditMode] = useState(false);

    const url = `https://6317245a82797be77ff48a60.mockapi.io/todos/${data.id}`;

    const editInput = useRef(null);

    useLayoutEffect(() => {
        setEditingContent(data.content);

    }, [data])

    useLayoutEffect(() => {
        console.log("le", data.isCompleted);

        editInput.current.style.textDecoration = data.isCompleted ? 'line-through' : '';

    }, [data.isCompleted])


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

                    editInput.current.className = "read-mode";
                })
        } else {
            setInEditMode(true);
            editInput.current.className = "edit-mode";
        }
    }

    useEffect(() => {
        editInput.current.focus()
    }, [handleEditTodo])

    const handleComplete = () => {
        if (inEditMode) {
            return;
        }
        axios.put(url, {
            isCompleted: !data.isCompleted
        }).then(() => onComplete(data.id))
    }

    return (
        <>

            <input type="text" readOnly={!inEditMode} className='read-mode' ref={editInput}
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                onClick={() => handleComplete()}
            />
            {/* <input type="checkbox" disabled={inEditMode} /> */}
            <button onClick={() => handleEditTodo()} className={inEditMode ? 'save-btn' : 'edit-btn'}>{inEditMode ? "Save" : "Edit"}</button>
            <button disabled={loading} className={loading ? 'loading-del-btn' : 'delete-btn'} onClick={() => deleteTodo(data.id)}>{loading ? 'Deleting...' : 'Delete'}</button>
        </>);
}

export default TodoItem;