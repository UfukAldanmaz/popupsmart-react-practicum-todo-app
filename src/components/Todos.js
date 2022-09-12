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
    const onComplete = (id) => {
        console.log("first", todos)
        const editedTodoList = [...todos];
        let completedTodoItem = editedTodoList.find((item) => item.id === id);
        completedTodoItem.isCompleted = !completedTodoItem.isCompleted;
        console.log("second", editedTodoList);
        // console.log('m', completedTodoCopy);

        // console.log('deneme', editedTodoList);

        setTodos(editedTodoList);
    }

    return <div className='container'>
        <form>
            <h1 className='title'>TODOS</h1>
            <input className='add-input' value={addTodo} onChange={(e) => setAddTodo(e.target.value)} />
            <button className='add-btn' onClick={handleAddTodo}>Add</button>
        </form>
        <ul > {
            todos.map((todo) =>
                <li key={todo.id}>
                    <TodoItem data={todo} onDelete={handleDelete} onEdit={handleEdit} onComplete={onComplete} />
                </li>
            )
        }
        </ul>
    </div>
}

export default Todos;