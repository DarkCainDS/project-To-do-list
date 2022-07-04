import React, { useEffect, useReducer } from 'react'
import { JuegoReducer } from '../reducer/JuegoReducer';




const init = () => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

export const Tasks = () => {

    const [tasks, dispatch] = useReducer(JuegoReducer, [], init);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const deleteMe = id => {
        const action = {
            type: "delete",
            payload: id
        };
        dispatch(action);
    }
    const edith = (e, id) => {
        console.log(e.target.value, "edith", id)
        let task = {

            id,
            title: e.target.value,
            description: e.target.value
        };
        const action = {
            type: "edith",
            payload: task
        };
        dispatch(action);
    }
    const getFormGames = e => {
        e.preventDefault();

        let task = {

            id: new Date().getTime(),
            title: e.target.title.value,

        };
        const action = {
            type: "create",
            payload: task
        };


        dispatch(action);

        console.log(tasks);
    }



    return (
        <div className='background-to-do'>

            <div className='to-do-list'>
                <h1> Task</h1>
                <h2>Add Task</h2>
                <form onSubmit={getFormGames} className='add-task'>
                    <input type="text" name="title" placeholder="Title" /><br/>
                    <input type="submit" value="Save" />
                </form>
                <p>Pending Tasks: {tasks.length}</p>
                <h5>press enter to edit</h5>
                <ul>
                    {
                        tasks.map(task => (
                            <li key={task.id}>
                                <input type='checkbox'></input>
                                <div className='task'>{task.title}</div>
                                &nbsp; 
                                <input type='text' placeholder='Edit' onBlur={e => {edith(e, task.id)}}
                                    onKeyPress={e => {
                                        if (e.key === "Enter") {
                                            edith(e, task.id);
                                            console.log("Has presionado enter")
                                        }
                                    }}
                                /><button onClick={e => deleteMe(task.id)}>X</button>
                            </li>
                        ))
                    }
                </ul>

            </div>
        </div>
    )
}
