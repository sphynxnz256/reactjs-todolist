import React from 'react'

//builds a card for an individual todo task
export default function TodoCard(props) {

    const {children, handleDeleteTodo, index, handleEditTodo, moveTodoUp, moveTodoDown, isDarkMode} = props;

    return(
    <li className='todoItem' style={{backgroundColor: isDarkMode ? "hsl(214, 100.00%, 25.30%)" : "white"}}>
        {children}
        <div className='actionsContainer'>
            <button onClick={() => {
                moveTodoUp(index);
            }}>
                <i className="fa-solid fa-arrow-up" style={{color: isDarkMode ? "white" : "black"}}></i>    
            </button>
            <button onClick={() => {
                moveTodoDown(index);
            }}>
                <i className="fa-solid fa-arrow-down" style={{color: isDarkMode ? "white" : "black"}}></i>
            </button>
            <button onClick={() => {
                handleEditTodo(index);
            }}>
                <i className="fa-solid fa-pen-to-square" style={{color: isDarkMode ? "white" : "black"}}></i>
            </button>
            <button onClick={() => {
                handleDeleteTodo(index);
            }}>
                <i className="fa-regular fa-trash-can" style={{color: isDarkMode ? "white" : "black"}}></i>
            </button>                       
        </div>            
    </li>
  );
}
