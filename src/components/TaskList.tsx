import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../features/tasks/tasksSlice';
import { RootState } from '../app/store';
import { AppDispatch } from '../app/store';

const TaskList: React.FC<{ setTaskToEdit: (task?: { id: number; title: string; description: string; completed: boolean }) => void }> = ({ setTaskToEdit }) => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="mt-4 bg-secondary p-4 ">
            <h2>Task List</h2>
            <ul className="list-group ">
                {Array.isArray(tasks) && tasks.length > 0 ? (
                    tasks.map((task) => (
                        <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5>{task.title}</h5>
                                <p>{task.description}</p>
                                <small className={`text-${task.completed ? 'success' : 'danger'}`}>
                                    {task.completed ? 'Completed' : 'Not Completed'}
                                </small>
                            </div>
                            <div>
                                <button className="btn btn-primary me-2" onClick={() => setTaskToEdit(task)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => dispatch(deleteTask(task.id))}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No tasks available</li>
                )}
            </ul>
        </div>
    );
};

export default TaskList;
