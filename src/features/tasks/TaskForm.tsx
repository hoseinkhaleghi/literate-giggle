import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from './tasksSlice';
import { AppDispatch } from '../../app/store';

interface TaskFormProps {
    taskToEdit?: { id: number; title: string; description: string; completed: boolean };
    setTaskToEdit: (task: undefined | { id: number; title: string; description: string; completed: boolean }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ taskToEdit, setTaskToEdit }) => {
    const [task, setTask] = useState({ title: '', description: '', completed: false });
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (taskToEdit) {
            setTask(taskToEdit);
        }
    }, [taskToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskToEdit) {
            dispatch(updateTask({ id: taskToEdit.id, task }));
        } else {
            const newTask = { ...task, id: Date.now() };
            dispatch(addTask(newTask));
        }
        setTask({ title: '', description: '', completed: false });
        setTaskToEdit(undefined);
    };
        
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Description"
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                required
            />
            <button type="submit">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
        </form>
    );
};

export default TaskForm;
