import { Icon, IconButton, List, ListItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import React from "react";

type Task = {

    id: number;
    text: string;
    completed: boolean;

}

const TaskManager: React.FC = () => {
  // TaskManager component logic here
  const [task, setTask] = React.useState<string>("");

  // *Tasks* has all the ones that I create from scratch
  // *setTasks* is the function that will modify the state of the tasks
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const addTask = () => {

    if (task.trim() === "") return; // Prevent adding empty tasks
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]); // Add the new task to the list
    setTask(""); // Clear the input field after adding the task

  };

  const deleteTask = (id: number) => {
    
    // Remove the task with the given id from the list    
    setTasks(tasks.filter((task) => task.id !== id));
 
  }

  const toggleCompletion = (id: number) => {
    
    // Toggle the completion status of the task with the given id
    const newTask: Task[] = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task

    );

    setTasks(newTask);
  
  };

  useEffect(() => {
    // Load tasks from local storage when the component mounts
    const storedTasks = localStorage.getItem("tasks");
    
    if (storedTasks) {

        const parseTasks = JSON.parse(storedTasks); // Parse the stored tasks and set them in state

        if (parseTasks.len > 0) {
            
            setTasks(parseTasks); // Set the tasks in state if they exist
        
        }

    }

  }, []); // Empty 'dependency array' means this effect runs once when the component mounts 

  // Guardar tareas en local storage cuando cambia el estado de *tasks*-array
  useEffect(() => {
    
    console.log("hola"); // Es normal q se muestre 2 veces!
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Guardar tareas en local storage
        
  }, [tasks]);  // El 'array de dependencias' vacío significa que solo se ejecuta una vez al cargar el componente
  
  return (

    <div>
      <Typography variant = 'h1' gutterBottom> Administrador de tareas </Typography>
      
      <TextField
        label = "Nueva tarea"
        variant = "standard" 
        fullWidth
        value = {task}
        onChange = { (event) => setTask(event.target.value) }
        onKeyDown = { (e) => e.key === "Enter" && addTask() }
        helperText = "Presiona Enter para agregar la tarea"
        sx = {{
            
            label: {color: "white"},
            input: {color: "white"},
            // Focused label color
            "& .MuiInput-underline:before": { borderBottomColor: "white" }, // Default border color
            "& .MuiInput-underline:hover:before": { borderBottomColor: "white" }, // Hover border color
            "& .MuiInput-underline:after": { borderBottomColor: "white" }, // Focused border color
            "& .MuiFormLabel-root.Mui-focused": { color: "white" }, // Focused label

        }} />
      
      <button onClick = {addTask} style = {{ marginTop: 10 }}>
      Agregar Tarea
      </button>
      
      <List>
        
        {tasks.map((t) => (
            <ListItem key = {t.id} sx = {{color: "white",
            textDecoration : t.completed ? "line-through" : "none",
            }} >
            {t.text}
            <div> 
                <IconButton>

                    // This icon will be shown when the task is completed
                    <CheckIcon onClick = {() => toggleCompletion(t.id)} />
                
                </IconButton>

                <IconButton>
                    
                    // This icon will be shown when the task is not completed
                    <DeleteIcon onClick = {() => deleteTask(t.id)} />

                </IconButton>
            </div>
            
            </ListItem>
            
        ))}

      </List>
      

    </div>
  );
}

export default TaskManager;
// TaskManager component logic here