import React, { useState } from 'react';
import TodoItem from './todoItem';
import '../App.css';

const TodoList = ({ todos, onDelete, onEdit, getOneTodo, completedTodos, sortTodos, paginatedTodos, rechercher }) => {
    const [todoId, setTodoId] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [completedResult, setCompletedResult] = useState([]);
    const [sortedResult, setSortedResult] = useState([]);
    const [paginatedResult, setPaginatedResult] = useState([]);
    const [searchedResult, setSearchedResult] = useState([]);
    const [singleTodo, setSingleTodo] = useState(null);

    const handleGetOneTodo = async () => {
        if (!todoId) {
            console.error("Please enter a Todo ID.");
            return;
        }
        const todo = await getOneTodo(todoId);
        setSingleTodo(todo);
    };

    const handleCompletedTodos = async () => {
        const completed = await completedTodos();
        setCompletedResult(completed);
    };

    const handleSortTodos = async () => {
        const sorted = await sortTodos(); 
        setSortedResult(sorted);
    };

    const handlePaginatedTodos = async () => {
        const todosPerPage = 5; 
        const pageNumber = 1; 
        const paginated = await paginatedTodos(todosPerPage, pageNumber);
        setPaginatedResult(paginated);
    };

    const handleRechercher = async () => {
        if (!searchKeyword) {
            console.error("Please enter a search keyword.");
            return;
        }
        const results = await rechercher(searchKeyword);
        setSearchedResult(results);
    };

    return (
        <>
            <div>
                <input
                    type="text"
                    value={todoId}
                    onChange={(e) => setTodoId(e.target.value)}
                    placeholder="Enter Todo ID"
                />
                <button className='button' onClick={handleGetOneTodo}>Get By Id</button>
            </div>
            <button className='button' onClick={handleCompletedTodos}>See completed Todos</button>
            {completedResult.length > 0 && (
                <div>
                    <hr/>
                    <h2>Completed Todos</h2>
                    {completedResult.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
                    ))}
                </div>
            )}
            <button className='button' onClick={handleSortTodos}>Sort Todos</button>
            {sortedResult.length > 0 && (
                <div><hr/>
                    <h2>Sorted Todos</h2>
                    {sortedResult.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
                    ))}
                </div>
            )}
            <button className='button' onClick={handlePaginatedTodos}>Paginate Todos</button>
            {paginatedResult.length > 0 && (
                <div><hr/>
                    <h2>Paginated Todos</h2>
                    {paginatedResult.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
                    ))}
                </div>
            )}
            <div>
                <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="Enter search keyword"
                />
                <button className='button' onClick={handleRechercher}>Rechercher par mot clé</button>
            </div>
            {searchedResult.length > 0 && (
                <div><hr/>
                    <h2>Search Results</h2>
                    {searchedResult.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
                    ))}
                </div>
            )}
            {singleTodo && (
                <div><hr/>
                    <h2>Single Todo</h2>
                    <TodoItem key={singleTodo.id} todo={singleTodo} onDelete={onDelete} onEdit={onEdit} />
                </div>
            )}
        </>
    );
};

export default TodoList;
