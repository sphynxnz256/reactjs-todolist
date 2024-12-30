import { useState } from "react";

export default function TodoInput(props){

    const {handleAddTodos, todoValue, setTodoValue, isDarkMode} = props;
    

    return(
        <header>
            <input value={todoValue} onChange={(e) => {
                setTodoValue(e.target.value);
            }} placeholder="Enter todo..." style={{color: isDarkMode ? "white" : "hsl(225, 6%, 13%)"}}/>
            <button onClick={() => {
                if(todoValue.trim() !== ""){
                    handleAddTodos(todoValue);
                    setTodoValue("");
                }
            }} style={{color: isDarkMode ? "white" : "hsl(225, 6%, 13%)"}}>
                Add
            </button>            
        </header>
    )
}