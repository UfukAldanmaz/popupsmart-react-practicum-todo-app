import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ThreeDots } from "react-loader-spinner";
import TodoItem from './TodoItem';
import ThemeContext, { ThemeProvider } from '../contexts/ThemeContext';
import { useLocation } from 'react-router-dom';

const Todos = () => {

    const [todos, setTodos] = useState([]);
    const [addTodo, setAddTodo] = useState('');
    const [error, setError] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [currentFiltered, setCurrentFiltered] = useState("all");
    const [loading, setLoading] = useState(false);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const location = useLocation();

    const fetchData = () => {
        setLoading(true);
        axios.get("https://6317245a82797be77ff48a60.mockapi.io/todos")
            .then(res => {
                setTodos(res.data);
                setFiltered(res.data)
                setLoading(false)
            })
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
        setFiltered(curr =>
            curr.filter(item => {
                return item.id !== id;
            }))
    }

    const handleEdit = (editedTodo) => {
        const editedTodoList = [...todos];
        let editedTodoItem = editedTodoList.find((item) => item.id === editedTodo.id);
        editedTodoItem = editedTodo;

        setTodos(editedTodoList);
        setFiltered(editedTodoList)
    }

    const handleAddTodo = (e) => {
        e.preventDefault()

        if (addTodo.trim().length > 2) {
            axios.post(`https://6317245a82797be77ff48a60.mockapi.io/todos/`, {
                content: addTodo
            }).then((response) => {
                setTodos([...todos, response.data])
                setFiltered([...todos, response.data])
                setAddTodo('');
            })
            setError("")
        }
        else {
            setError("The input field must have three valid characters at least!");
            setAddTodo('');
        }
    }
    const onComplete = (id) => {
        const editedTodoList = [...todos];
        let completedTodoItem = editedTodoList.find((item) => item.id === id);
        completedTodoItem.isCompleted = !completedTodoItem.isCompleted;
        console.log("second", editedTodoList);

        setTodos(editedTodoList);
        // let filteredTodoItem = filtered.find((item) => item.id === id)
        // filteredTodoItem.isCompleted 
        // setFiltered(
        //     filtered.map(todo => {
        //         if (todo.id === id) {
        //             return {
        //                 ...todo,
        //                 isCompleted: !todo.isCompleted
        //             }
        //         }
        //         return todo;
        //     })
        // );
    }

    //     useEffect(() => {
    //   setFiltered(fetchData())
    //     }, [third])

    // const filteredTodos = todos.filter(item => item.isCompleted)
    // console.log('COMP', filteredTodos);
    const handleListingTodos = (filter) => {
        setCurrentFiltered(filter)
        if (filter === 'all') {
            setFiltered([...todos])
        } else if (filter === 'active') {
            setFiltered(todos.filter(todo => !todo.isCompleted))
        }
        else {
            setFiltered(todos.filter(todo => todo.isCompleted))
        }
        // const filteredTodos = todos.filter(item => item.isCompleted)
        // let listedTodo = filteredTodos.includes(isCompleted)
        // listedTodo ? 'completed' : 'all'
    }

    // <ThemeProvider>
    return <div className='container'>
        <div className='header'>
            <p className='welcome'>Welcome {location.state.username}!</p>
            <button onClick={toggleTheme} className="theme-btn">
                {theme === 'dark' ? <span>🌞</span> : <span>🌙</span>}
            </button></div>
        <div className='column' id='column'>
            <form className='form-container'>
                <h1 className='title'>TODOS</h1>
                <input className='add-input' value={addTodo} onChange={(e) => setAddTodo(e.target.value)} />
                <button className='add-btn' onClick={handleAddTodo}>Add</button> </form>
            <span className='add-error'>{error}</span>
            {loading ? <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#FFF"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            /> : <ul>
                {
                    todos.map((todo) =>
                        <li key={todo.id}>
                            <TodoItem data={todo} onDelete={handleDelete} onEdit={handleEdit} onComplete={onComplete} />
                        </li>
                    )
                }
            </ul>}
            <div className='listing-btn-container'>
                <button onClick={() => handleListingTodos('all')} value='all' className='listing-btn'>All</button>
                <button onClick={() => handleListingTodos('active')} className='listing-btn' value='active'>Active</button>
                <button onClick={() => handleListingTodos('completed')} className='listing-btn' value='completed'>Completed</button></div>
        </div>
    </div>
    // </ThemeProvider>
}

export default Todos;