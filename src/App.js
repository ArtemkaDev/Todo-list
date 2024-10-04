import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskList from "./TaskList";

const App = () => {
  const [newTodo, setNewTodo] = useState("");
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTasks((prev) => ({
        ...prev,
        todo: [
          ...prev.todo,
          {
            id: `task-${Date.now()}`,
            text: newTodo,
            difficulty: "Easy",
            urgency: "Not Urgent",
          },
        ],
      }));
      setNewTodo("");
    }
  };

  const handleDeleteTask = (taskId, listName) => {
    setTasks((prev) => ({
      ...prev,
      [listName]: prev[listName].filter((task) => task.id !== taskId),
    }));
  };

  const handleUpdateTask = (taskId, listName, updatedTask) => {
    setTasks((prev) => ({
      ...prev,
      [listName]: prev[listName].map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      ),
    }));
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceList = Array.from(tasks[source.droppableId]);
    const [movedTask] = sourceList.splice(source.index, 1);
    const destinationList = Array.from(tasks[destination.droppableId]);
    destinationList.splice(destination.index, 0, movedTask);

    setTasks((prev) => ({
      ...prev,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList,
    }));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>
      <TextField
        label="Нова задача"
        variant="outlined"
        fullWidth
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleAddTodo}
        style={{ marginTop: "10px" }}
      >
        Додати задачу
      </Button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          {["todo", "inProgress", "done"].map((status) => (
            <Grid item xs={4} key={status}>
              <Paper style={{ padding: "10px" }}>
                <Typography variant="h6">
                  {status === "todo"
                    ? "На майбутнє"
                    : status === "inProgress"
                    ? "В процесі"
                    : "Зроблено"}
                </Typography>
                <Droppable droppableId={status}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        minHeight: "100px",
                        padding: "8px",
                        backgroundColor: "#f4f4f4",
                      }}
                    >
                      <TaskList
                        tasks={tasks[status]}
                        onDeleteTask={(taskId) =>
                          handleDeleteTask(taskId, status)
                        }
                        onUpdateTask={(taskId, updatedTask) =>
                          handleUpdateTask(taskId, status, updatedTask)
                        }
                      />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </Container>
  );
};

export default App;
