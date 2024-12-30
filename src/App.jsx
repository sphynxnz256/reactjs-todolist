import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"


function App() { 

  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({todos: newList}));
  }

  function handleAddTodos(newTodo){
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleDeleteTodo(index){
    const newTodoList = todos.filter((_, todoIndex) => {
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

  function handleLightDarkToggle() {
    setIsDarkMode(!isDarkMode);
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

  useEffect(() => {
    const rootDiv = document.getElementById('root');
    if(rootDiv) {
      rootDiv.style.backgroundColor = isDarkMode ? "hsl(214, 100%, 05%)" : "hsl(214, 100%, 95%)";
    }
  });

  return (
    <>
      <div className="title">
        <h1 style={{color: isDarkMode ? "white" : "hsl(225, 6%, 13%)",
          backgroundColor: isDarkMode ? "hsl(214, 100%, 25%)" : "white"
        }}> {/* trying to work out why the title isnt rendering correcly anymore */}
          Todo List
        </h1>
        <button className="day-night-toggle" onClick={handleLightDarkToggle}>          
          <i className="day fa-regular fa-lightbulb" style={{display: isDarkMode ? "none" : "block"}}></i>
          <i className="night fa-solid fa-lightbulb" style={{display: isDarkMode ? "block" : "none"}}></i>
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
