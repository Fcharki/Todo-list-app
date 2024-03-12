import React, {useEffect, useState} from 'react';
import '../App.css';

const AddTodoForm = ({onAdd, onUpdate, editingTodo}) => {
    const [text, setText] = useState('');

useEffect(() => {
    if (editingTodo) {
        setText(editingTodo.title);
    }
}, [editingTodo]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingTodo) {
            onUpdate(editingTodo.id, text);
        } else {
            onAdd(text);
        }
        
        setText('');
    };

    return (
        <form onSubmit ={handleSubmit}> 
            <input type='text' value={text} onChange={(e)=> setText(e.target.value)} required/>
            <button className='button' type='submit'>{editingTodo ? 'Modifier' : 'Ajouter'}</button>
        </form>
    )
} 

export default AddTodoForm;