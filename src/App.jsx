import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"


function App() { 

  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  //function to store data so the todo list isnt wiped if the website is reloaded.
  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({todos: newList}));
  }

  //function to add a new todo task to the todo list
  function handleAddTodos(newTodo){
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  //function to delete a todo task from the todo list
  function handleDeleteTodo(index){
    const newTodoList = todos.filter((_, todoIndex) => {
      return todoIndex !== index;
    });
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  //function to edit a todo task from the todo list
  function handleEditTodo(index){
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index);
  }

  //function to move a todo task up one place in the todo list
  function moveTodoUp(index) {
    if(index > 0){
      const newTodoList = [...todos];
      [newTodoList[index], newTodoList[index - 1]] 
        = [newTodoList[index - 1], newTodoList[index]];
    persistData(newTodoList);
    setTodos(newTodoList);
    }
  }

  //function to  move a todo task down one place in the todo list
  function moveTodoDown(index) {
    if(index < todos.length - 1){
      const newTodoList = [...todos];
      [newTodoList[index], newTodoList[index + 1]]
        = [newTodoList[index + 1], newTodoList[index]];
      persistData(newTodoList);
      setTodos(newTodoList);
    }
  }

  //function to toggle the dark/light mode theme of the website
  function handleLightDarkToggle() {
    setIsDarkMode(!isDarkMode);
  }

  //useEffect for storing data(todos) to localStorage
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

  //useEffect to toggle background color based on if dark mode is set or not
  useEffect(() => {
    const rootDiv = document.getElementById('root');
    if(rootDiv) {
      rootDiv.style.backgroundColor = isDarkMode ? "hsl(214, 100%, 05%)" : "hsl(214, 100%, 95%)";
    }
  });

  //return the website
  return (
    <>
      <div className="title" style={{backgroundColor: isDarkMode ? "hsl(214, 100.00%, 25.30%)" : "white"}}>
        <h1 style={{color: isDarkMode ? "white" : "hsl(225, 6%, 13%)"}}>
          Todo List
        </h1>
        <button className="day-night-toggle" onClick={handleLightDarkToggle} style={{backgroundColor: isDarkMode ? "hsl(214, 100.00%, 25.30%)" : "white"}}>          
          <i className="day fa-regular fa-lightbulb" style={{color: isDarkMode ? "white" : "black"}}></i>
        </button>        
      </div>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue}
        handleAddTodos = {handleAddTodos} isDarkMode={isDarkMode}/>
      <TodoList handleEditTodo={handleEditTodo} isDarkMode={isDarkMode}
        handleDeleteTodo={handleDeleteTodo} todos={todos}
        moveTodoUp={moveTodoUp} moveTodoDown={moveTodoDown}/>
    </>
  );
}

export default App;
