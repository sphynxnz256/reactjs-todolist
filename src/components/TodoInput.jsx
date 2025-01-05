import { useState } from "react";

//builds the input for the todo list
export default function TodoInput(props){

    const {handleAddTodos, todoValue, setTodoValue, isDarkMode} = props;    

    return(
        <header>
            <input value={todoValue} onChange={(e) => {
                setTodoValue(e.target.value);
            }} placeholder="Enter todo..." style={{color: isDarkMode ? "white" : "hsl(225, 6%, 13%)", 
                backgroundColor: isDarkMode ? "hsl(214, 100.00%, 25.30%)" : "white"
            }}/>
            <button onClick={() => {
                if(todoValue.trim() !== ""){
                    handleAddTodos(todoValue);
                    setTodoValue("");
                }
            }} style={{color: isDarkMode ? "white" : "hsl(225, 6%, 13%)", 
                backgroundColor: isDarkMode ? "hsl(214, 100.00%, 25.30%)" : "white"}}>
                Add
            </button>            
        </header>
    )
}