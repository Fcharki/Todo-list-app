import todos from '../storage/todos.js';

//liste des todos
export const getTodos = () => todos;

//ajouter un todo 
export const createTodo = (newTodo) => {
  todos.push(newTodo);
  return newTodo;
};
//modifier un todo
export const updateTodo = (id, updatedTodo) => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...updatedTodo };
    return todos[index];
  }
  return null;
};

//supprimer un todo
export const deleteTodo = (id) => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    return todos.splice(index, 1)[0];
  }
  return null;
};

//*__________________________________________________________________________________________________________

//TODO :  Partie Backend Du TAF01:

// 1-Retourner un todo avec son ID
export const getOneTodo = (id) => {
  return todos.find((todo) => todo.id == id);
}

// 2-Filter les todos selon l'etat completed
export const completedTodos = () => {
  return todos.filter((todo) => todo.completed == true);
  
}

// 3-Trier les todos selon l'ID
export const SortTodoWithId = () => {
  todos.sort((a, b) => a.id - b.id);
  return todos;
}

// 4-Recuperer les todos dans Des pages
export const paginatedTodos = (todosPerPage, pageNumber) => {
  const startIndex = (pageNumber - 1) * todosPerPage;
  const endIndex = startIndex + todosPerPage;
  return todos.slice(startIndex, endIndex);
}

// 5-Rechercher les taches par mots cles
export const rechercherParMotCles = (motCle) => {
  return todos.filter((todo) => todo.title.includes(motCle));
}

// 6-Definir des rappels pour les todos a faire bientot ou en retard
export const rappelTodo = () => {
    const undoneTodos = todos.filter((todo)=> todo.completed == false);
    if (undoneTodos.length > 0) {
      return "Vous n'avez pas terminé toutes les tâches !";
  } else {
      return "Félicitations ! Vous avez terminé toutes les tâches.";
  }
  
}

