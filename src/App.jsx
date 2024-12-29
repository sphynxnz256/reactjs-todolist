import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"


function App() { 

  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({todos: newList}));
  }

  function handleAddTodos(newTodo){
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleDeleteTodo(index){
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index;
    });
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleEditTodo(index){
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index);
  }

  function moveTodoUp(index) {
    if(index > 0){
      const newTodoList = [...todos];
      [newTodoList[index], newTodoList[index - 1]] 
        = [newTodoList[index - 1], newTodoList[index]];
    persistData(newTodoList);
    setTodos(newTodoList);
    }
  }

  function moveTodoDown(index) {
    if(index < todos.length - 1){
      const newTodoList = [...todos];
      [newTodoList[index], newTodoList[index + 1]]
        = [newTodoList[index + 1], newTodoList[index]];
      persistData(newTodoList);
      setTodos(newTodoList);
    }

  }

  useEffect(() => {
    if(!localStorage) {
      return;
    }
    let localToDos = localStorage.getItem("todos");
    if (!localToDos) {
      return;      
    }
    localToDos = JSON.parse(localToDos).todos;
    setTodos(localToDos);
  }, []);

  return (
    <>
      <div className="title">
        <h1>Todo List</h1>
      </div>
      
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue}
        handleAddTodos = {handleAddTodos}/>
      <TodoList handleEditTodo={handleEditTodo}
        handleDeleteTodo={handleDeleteTodo} todos={todos}
        moveTodoUp={moveTodoUp} moveTodoDown={moveTodoDown}/>
    </>
  );
}

export default App;
