import { useEffect, useReducer } from "react";
import { TodoReducer } from "./TodoReducer";

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
};

export const useTodo = () => {
    
    const [todos, dispatch] = useReducer(TodoReducer, [], init);

    useEffect(() => {

        localStorage.setItem('todos', JSON.stringify(todos) || [] );

    }, [todos]);
    

    const handleNewTodo = (todo) => {
        const action = {
            type: 'add',
            payload: todo
        };

        dispatch(action);
    };

    const handleDelete = (id) => {
        dispatch({
            type: 'delete',
            payload: id
        });
    };

    const handleToggleTodo = (id) => {
        dispatch({
            type: 'toggle',
            payload: id
        });
    };

    const todosCount = todos.length;

    const pendingTodosCount = todos.filter( todo => !todo.done ).length;

    return{
        todos,
        handleNewTodo,
        handleDelete,
        handleToggleTodo,
        todosCount,
        pendingTodosCount
    };
}
