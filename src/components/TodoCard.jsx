import React from 'react'

export default function TodoCard(props) {

    const {children, handleDeleteTodo, index, handleEditTodo, moveTodoUp, moveTodoDown} = props;

    return(
    <li className='todoItem'>
        {children}
        <div className='actionsContainer'>
            <button onClick={() => {
                moveTodoUp(index);
            }}>
                <i class="fa-solid fa-arrow-up"></i>    
            </button>
            <button onClick={() => {
                moveTodoDown(index);
            }}>
                <i class="fa-solid fa-arrow-down"></i>
            </button>
            <button onClick={() => {
                handleEditTodo(index);
            }}>
                <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button onClick={() => {
                handleDeleteTodo(index);
            }}>
                <i className="fa-regular fa-trash-can"></i>
            </button>                       
        </div>            
    </li>
  );
}
