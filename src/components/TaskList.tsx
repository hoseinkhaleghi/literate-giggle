import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../features/tasks/tasksSlice';
import { RootState } from '../app/store';
import { AppDispatch } from '../app/store';

const TaskList: React.FC<{ setTaskToEdit: (task?: { id: number; title: string; description: string; completed: boolean }) => void }> = ({ setTaskToEdit }) => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const dispatch = useDispatch<AppDispatch>();
    console.log("task",tasks)

    return (
        <ul>
            {Array.isArray(tasks) ? (
                tasks.map((task) => (
                    <li key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <button onClick={() => setTaskToEdit(task)}>Edit</button>
                        <button onClick={() => dispatch(deleteTask(task.id))}>
                            Delete
                        </button>
                    </li>
                ))
            ) : (
                <li>No tasks available</li>
            )}
        </ul>
    );
};

export default TaskList;
