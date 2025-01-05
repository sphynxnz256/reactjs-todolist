import React from 'react'
import TodoCard from './TodoCard'

//builds the todo list
export default function TodoList(props) {

    const {todos, isDarkMode} = props;
    
    return (
        <ul className='main'>
            {todos.map((todo, todoIndex) => {
                return (
                    <TodoCard {...props} key={todoIndex} index={todoIndex}>
                        <p style={{color: isDarkMode ? "white" : "hsl(225, 6%, 13%)"}}>{todo}</p>
                    </TodoCard>
                );
            })}
        </ul>
    )
}
