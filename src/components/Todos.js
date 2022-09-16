import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ThreeDots } from "react-loader-spinner";
import TodoItem from './TodoItem';
import ThemeContext from '../contexts/ThemeContext';
import { useLocation } from 'react-router-dom';

const Todos = () => {

    const [todos, setTodos] = useState([]);
    const [addTodo, setAddTodo] = useState('');
    const [error, setError] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [activeFilter, setActiveFilter] = useState("all");
    const [loading, setLoading] = useState(false);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const location = useLocation();

    const fetchData = () => {
        setLoading(true);
        axios.get("https://6317245a82797be77ff48a60.mockapi.io/todos")
            .then(res => {
                setTodos(res.data);
                setFiltered(res.data);
                setLoading(false)
            })
            .catch(error =>
                console.log(error));
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        filterTodos();
    }, [todos])

    const handleDelete = (id) => {
        setTodos(curr =>
            curr.filter(item => {
                return item.id !== id;
            }))
    }

    const handleEdit = (editedTodo) => {
        const editedTodoList = todos.map((item) => {
            return item.id === editedTodo.id ? editedTodo : item;
        })

        setTodos(editedTodoList);
    }

    const handleAddTodo = (e) => {
        e.preventDefault()

        if (addTodo.trim().length > 2) {
            axios.post(`https://6317245a82797be77ff48a60.mockapi.io/todos/`, {
                content: addTodo
            }).then((response) => {
                setActiveFilter("all")
                setTodos([...todos, response.data])
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

        setTodos(editedTodoList);
    }

    const filterTodos = () => {
        if (activeFilter === 'all') {
            setFiltered([...todos])
        } else if (activeFilter === 'active') {
            setFiltered(todos.filter(todo => !todo.isCompleted))
        }
        else {
            setFiltered(todos.filter(todo => todo.isCompleted))
        }
    }

    useEffect(() => {
        filterTodos();
    }, [activeFilter]);

    const handleListingTodos = (filter) => {
        setActiveFilter(filter);

    }

    return <>
        <div className='header'>
            <p className='welcome'>Welcome {location.state.username}!</p>
            <button onClick={toggleTheme} className="theme-btn">
                {theme === 'dark' ? <span>🌞</span> : <span>🌙</span>}
            </button>
        </div>
        <div className='container'>
            <div className='form-column' id='column' style={{ background: theme === 'dark' ? 'black' : '' }}>
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
                />
                    : <ul className='todo-list-container'>
                        {
                            filtered.map((todo) =>
                                <li className='todo-list-item' key={todo.id}>
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
        </div></>
}

export default Todos;