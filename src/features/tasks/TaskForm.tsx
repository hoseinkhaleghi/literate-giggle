import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask, fetchMaxTaskId } from "./tasksSlice";
import { AppDispatch } from "../../app/store";
import { RootState } from "../../app/store";

interface TaskFormProps {
  taskToEdit?: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  };
  setTaskToEdit: (
    task:
      | undefined
      | { id: number; title: string; description: string; completed: boolean }
  ) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ taskToEdit, setTaskToEdit }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const maxId = Math.max(...tasks.map((task) => task.id)) + 1;

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    } else {
      dispatch(fetchMaxTaskId());
    }
  }, [taskToEdit, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (taskToEdit) {
      await dispatch(updateTask({ id: taskToEdit.id, task }));
    } else {
      {
        const addResult = await dispatch(
          addTask({
            title: task.title,
            description: task.description,
            completed: task.completed,
            id: maxId,
          })
        );
        if (addTask.fulfilled.match(addResult)) {
          console.log("Task to be added:", {
            title: task.title,
            description: task.description,
            completed: task.completed,
            id: maxId,
          });
          console.log("Task added successfully");
        } else {
          console.error("Failed to add task:", addResult.error);
        }
      }
    }

    setTask({ title: "", description: "", completed: false });
    setTaskToEdit(undefined);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 w-full p-4 bg-secondary rounded"
    >
      <h1 className="text-center">Task Management App</h1>
      <h2>{taskToEdit ? "Edit Task" : "Add Task"}</h2>
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
        <label className="form-check-label" htmlFor="completedCheck">
          Completed
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        {taskToEdit ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
