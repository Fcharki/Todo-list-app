import React, {useState} from 'react';
import '../App.css';


const TodoItem = ({todo, onDelete, onEdit}) => {
    const[done, setDone] = useState(todo.completed);
    

    const handleCheckboxChange = () => {
        setDone(!done); 
    };

    return (
        <li>
            <span>{todo.title}</span>
            {todo.completed && <> <input type="checkbox" checked={done} onChange={handleCheckboxChange}/>
            <button className='button2'  onClick={() => onDelete(todo.id)}>Supprimer</button>
            </>}
            <button className='button2'  style={{margin: "6px"}} onClick={() => onEdit(todo)}>Modifier</button>
        </li>
    );
}

export default TodoItem;