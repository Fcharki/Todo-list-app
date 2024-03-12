import express from 'express';
import generateUniqueId from 'generate-unique-id';
import { getTodos, createTodo, updateTodo, deleteTodo, getOneTodo, completedTodos, 
        SortTodoWithId, paginatedTodos, rechercherParMotCles, rappelTodo } from './storage_todos.js';
import todos from '../storage/todos.js';

//router
const router = express.Router();

//route pour retourner la liste des todos
router.get('/', (req, res) => {
  res.json(getTodos());
});

//route pour ajouter un todo
router.post('/', (req, res) => {
  //generer ID
  const id=generateUniqueId({length:10, useLetters: false});
  const newTodo = createTodo({
    id:id,
    title:req.body.title,
    completed:req.body.completed
  });
  res.status(201).json(newTodo);
});

//route pour modifier un todo
router.put('/:id', (req, res) => {
  const updatedTodo = updateTodo(req.params.id, req.body);
  console.log(req.params.id)
  console.log(req.body)
  if (updatedTodo) {
    res.json(updatedTodo);
  } else {
    res.status(404).send('Todo non trouvé');
  }
});

//route pour suprimer un todo
router.delete('/:id', (req, res) => {
  const deletedTodo = deleteTodo(req.params.id);
  if (deletedTodo) {
    res.json(deletedTodo);
  } else {
    res.status(404).send('Todo non trouvé'); }
});

// route pour retourner un todo avec un ID
router.get('/:id', (req, res) => {
  const returnedTodo = getOneTodo(req.id.params);
  if (returnedTodo) {
    res.json(returnedTodo);
  } else {
    res.status(404).send('Todo non trouvé'); }
    
  
})

// route pour filter les todos selon l'etat completed
router.get('/completed', (req, res) => {
  const completed = completedTodos();
  if (completed) {
    res.json(completed);
  } else {
    res.status(404).send('Todo non trouvé'); }
    
  
})

// route pour trier  les todos selon l'ID
router.get('/:id', (req, res) => {
  const sortedTodos = SortTodoWithId();
  if (sortedTodos) {
    res.json(sortedTodos);
  } else {
    res.status(404).send('Todo non trouvé'); }
    
  
})

//route pour recuperer les todos dans Des pages
router.get('/page', (req, res) => {
  const paginated = paginatedTodos();
  if (paginated) {
    res.json(paginated);
  } else {
    res.status(404).send('Todo non trouvé'); }
});

// route pour rechercher les taches par mots cles
router.get('/search', (req, res) => {
  const searchedTodo = rechercherParMotCles();
  if (searchedTodo) {
    res.json(searchedTodo);
  } else {
    res.status(404).send('Todo non trouvé'); }
});

// route pour definir des rappels pour les todos a faire bientot ou en retard
router.get('/rappel', (req, res) => {
  const rappel= rappelTodo();
  if (rappel) {
    res.json(rappel);
  } else {
    res.status(404).send('Todo non trouvé'); }
});
export default router;

