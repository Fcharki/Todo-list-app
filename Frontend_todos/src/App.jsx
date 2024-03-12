import { useState, useEffect } from 'react';
import TodoList from './assets/todoList';
import AddTodoForm from './assets/addTodoForm';
import './App.css';

function App() {
const [todos, setTodos] = useState([]);
const [editingTodo, setEditingTodo] = useState(null);
const [loadedTodo, setLoadedTodo] = useState(null);

const onEdit = (todo) => {
  setEditingTodo(todo);
}

// lire les todos
const fetchTodos = async () => {
  const response = await fetch('http://localhost:3000/todos');
  const data = await response.json();
  setTodos(data);
  console.log(data); 
}

useEffect (()=> {
  fetchTodos();
}, []);

const onAdd = async (title) => {
  const response = await fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {"Content-Type": 'application/json'},
    body: JSON.stringify({title:title, completed: false})
  });
  if (response.ok) {
    const addedTodo = await response.json();
    setTodos([...todos, addedTodo]);
  }
};

const onDelete = async (id) => {
  const response = await fetch(`http://localhost:3000/todos/${id}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    setTodos(todos.filter((todo)=> todo.id !== id));
  } else {
    console.error('Erreur lors de la suppresion du todo');
  }
}

const onUpdate = async (id, newTitle) => {
  const response = await fetch(`http://localhost:3000/todos/${id}`, {
    method: 'PUT',
    headers: {"Content-Type": 'application/json'},
    body: JSON.stringify({title: newTitle, completed: false})
  });
   if (response.ok) {
    setEditingTodo(null);
    fetchTodos();
   }

   const updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      return {...todo, text: newTitle};
    }
    return todo;
   });

   setTodos(updatedTodos);
}

// 1-Retourner un todo avec son ID
const getOneTodo = async (id) => {
  const response = await fetch(`http://localhost:3000/todos/${id}`);
  if (response.ok) {
    const todo = await response.json();
    setLoadedTodo(todo);
    console.log(todo);
  } else {
    console.error('Todo not found');
  }
 
}

// 2-Filter les todos selon l'etat completed
const completedTodos = async () => {
  const response = await fetch(`http://localhost:3000/todos`);
  if (response.ok) { 
    const data = await response.json();
    const doneTodos =  data.filter((todo) => todo.completed === true);
    return doneTodos;
   
  } else {
    console.error('Error fetching completed todos');
  }
}

// 3-Trier les todos selon l'ID
const SortTodoWithId = async () => {
    const response = await fetch(`http://localhost:3000/todos`);
    if (response.ok) {
      const todos = await response.json();
      const sortedTodos = todos.sort((a, b) => a.id - b.id);
      return sortedTodos;
    }
    else {
    console.error('Error fetching sorted todos:');
  }
};

// 4-Recuperer les todos dans Des pages
const paginatedTodos = async (todosPerPage, pageNumber) => {
  const response = await fetch(`http://localhost:3000/todos`);
  const data = await response.json();
  const startIndex = (pageNumber - 1) * todosPerPage;
  const endIndex = startIndex + todosPerPage;
  return data.slice(startIndex, endIndex);
}

// 5-Rechercher les taches par mots cles
const rechercherParMotCles = async (motCle) => {
  const response = await fetch(`http://localhost:3000/todos`);
  const todos = await response.json();
  return todos.filter((todo) => todo.title.includes(motCle));
}


  return (
    <div className='container-fluid'>
     <h1 className='yellow-color'>React | Express TodoList App</h1>
     <AddTodoForm onAdd = {onAdd} onEdit={onEdit} onUpdate={onUpdate} editingTodo={editingTodo}/>
    <TodoList todos={todos} onDelete={onDelete} onEdit={onEdit} getOneTodo={(todo)=>getOneTodo(todo.id)} completedTodos={completedTodos} sortTodos={SortTodoWithId} paginatedTodos={paginatedTodos} rechercher={rechercherParMotCles}/>
    </div>
  )
}

export default App;
