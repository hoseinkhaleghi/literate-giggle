import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask, fetchMaxTaskId } from './tasksSlice';
import { AppDispatch } from '../../app/store';
import { RootState } from '../../app/store';

interface TaskFormProps {
    taskToEdit?: { id: number; title: string; description: string; completed: boolean };
    setTaskToEdit: (task: undefined | { id: number; title: string; description: string; completed: boolean }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ taskToEdit, setTaskToEdit }) => {
    const [task, setTask] = useState({ title: '', description: '', completed: false });
    const dispatch = useDispatch<AppDispatch>();
    const maxTaskId = useSelector((state: RootState) => state.tasks.maxTaskId);

    useEffect(() => {
        if (taskToEdit) {
            setTask(taskToEdit);
        } else {
            dispatch(fetchMaxTaskId());
        }
    }, [taskToEdit, dispatch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskToEdit) {
            dispatch(updateTask({ id: taskToEdit.id, task }));
        } else {
            dispatch(addTask({ title: task.title, description: task.description, completed: task.completed, id: maxTaskId }));
        }
        setTask({ title: '', description: '', completed: false });
        setTaskToEdit(undefined);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 bg-info w-full p-4">
            <h1 className="text-center">Task Management App</h1>
            <h2>{taskToEdit ? 'Edit Task' : 'Add Task'}</h2>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Title"
                    value={task.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                    required
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Description"
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                    required
                    className="form-control"
                />
            </div>
            <div className="form-check mb-3">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => setTask({ ...task, completed: !task.completed })}
                    className="form-check-input"
                    id="completedCheck"
                />
                <label className="form-check-label" htmlFor="completedCheck">Completed</label>
            </div>
            <button type="submit" className="btn btn-primary">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
        </form>
    );
};

export default TaskForm;
