import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks } from './features/tasks/tasksSlice';
import TaskForm from './features/tasks/TaskForm';
import TaskList from './components/TaskList';
import { AppDispatch } from './app/store';

const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>(); 
    const [taskToEdit, setTaskToEdit] = useState<undefined | { id: number; title: string; description: string; completed: boolean }>(undefined);
    
    useEffect(() => {
      dispatch(fetchTasks());
  }, [dispatch]);
  
    return (
        <div className="container mt-5 ">
            <TaskForm taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
            <TaskList setTaskToEdit={setTaskToEdit} />
        </div>
    );
};

export default App;
