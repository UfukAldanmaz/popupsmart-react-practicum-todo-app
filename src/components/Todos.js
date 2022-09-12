import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const Todos = () => {

    const [todos, setTodos] = useState([]);
    const [addTodo, setAddTodo] = useState('');

    const fetchData = () => {
        axios.get("https://6317245a82797be77ff48a60.mockapi.io/todos")
            .then(res => setTodos(res.data))
            .catch(error =>
                console.log(error));
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleDelete = (id) => {
        setTodos(curr =>
            curr.filter(item => {
                return item.id !== id;
            }))
    }

    const handleEdit = (editedTodo) => {
        const editedTodoList = [...todos];
        let editedTodoItem = editedTodoList.find((item) => item.id === editedTodo.id);
        editedTodoItem = editedTodo;

        setTodos(editedTodoList);
    }

    const handleAddTodo = (e) => {
        e.preventDefault()

        axios.post(`https://6317245a82797be77ff48a60.mockapi.io/todos/`, {
            content: addTodo
        }).then((response) => {
            setTodos([...todos, response.data])
            setAddTodo('');
        })
    }


    return <div>
        <form>
            <input value={addTodo} onChange={(e) => setAddTodo(e.target.value)} />
            <button onClick={handleAddTodo}>Add</button>
        </form>
        <ul > {
            todos.map(todo =>
                <li key={todo.id}>
                    <TodoItem data={todo} onDelete={handleDelete} onEdit={handleEdit} />
                </li>
            )
        }
        </ul>
    </div>
}

export default Todos;