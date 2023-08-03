//para que otras paginas puedan acceder a los datos de las Tasks se una otro contexto
import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest } from '../api/task'
//---------------------------------------------------------------------

const TaskContext = createContext();

export const useTasks = () => {

    const context = useContext(TaskContext);

    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }

    return context;
}

export function TaskProvider({ children }) {

    const [tasks, setTasks] = useState([]);

    //guardar tareas en el backend
    const createTask = async (task) => {
        const res = await createTaskRequest(task);
        console.log(res);
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id);
            //crear un arreglo nuevo sin la tarea que se dio click o se elimino
            if (res.status === 204) setTasks(tasks.filter(task => task._id != id));
        } catch (error) {
            console.log(error);
        }
    }

    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getTask = async (id) => {

        try {
            const res = await getTaskRequest(id);
            return res.data
        } catch (error) {
            console.log(error);
        }

    }

    const updateTask = async (id, task) => {
        try {
            await updateTaskRequest(id, task);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TaskContext.Provider value={{
            tasks,
            createTask,
            getTasks,
            deleteTask,
            getTask,
            updateTask,
        }}>
            {children}
        </TaskContext.Provider>
    )
}