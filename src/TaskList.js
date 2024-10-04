import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Draggable } from "react-beautiful-dnd";
import {
  DragHandle,
  Remove,
  PriorityHigh,
  Star,
  StarHalf,
  StarOutline,
} from "@mui/icons-material";

const TaskList = ({ tasks, onDeleteTask, onUpdateTask }) => {
  const difficultyIcons = {
    Easy: <StarOutline />,
    Medium: <StarHalf />,
    Hard: <Star />,
  };

  const urgencyIcons = {
    "Not Urgent": <Remove />,
    Medium: <DragHandle />,
    Urgent: <PriorityHigh />,
  };

  return (
    <List>
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided) => (
            <ListItem
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              divider
              style={{
                ...provided.draggableProps.style,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "16px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ListItemText primary={task.text} />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDeleteTask(task.id)}
                >
                  <Delete />
                </IconButton>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  flexDirection: "column",
                  rowGap: "15px",
                }}
              >
                <FormControl variant="outlined" style={{ minWidth: "150px" }}>
                  <InputLabel>Складність</InputLabel>
                  <Select
                    value={task.difficulty}
                    onChange={(e) =>
                      onUpdateTask(task.id, { difficulty: e.target.value })
                    }
                    label="Складність"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <MenuItem value="Easy">
                      <span style={{ marginRight: "8px" }}>
                        {difficultyIcons["Easy"]}
                      </span>{" "}
                      Легко
                    </MenuItem>
                    <MenuItem value="Medium">
                      <span style={{ marginRight: "8px" }}>
                        {difficultyIcons["Medium"]}
                      </span>{" "}
                      Середньо
                    </MenuItem>
                    <MenuItem value="Hard">
                      <span style={{ marginRight: "8px" }}>
                        {difficultyIcons["Hard"]}
                      </span>{" "}
                      Складно
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" style={{ minWidth: "150px" }}>
                  <InputLabel>Важливість</InputLabel>
                  <Select
                    value={task.urgency}
                    onChange={(e) =>
                      onUpdateTask(task.id, { urgency: e.target.value })
                    }
                    label="Важливість"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <MenuItem value="Not Urgent">
                      <span style={{ marginRight: "8px" }}>
                        {urgencyIcons["Not Urgent"]}
                      </span>{" "}
                      Не важливо
                    </MenuItem>
                    <MenuItem value="Medium">
                      <span style={{ marginRight: "8px" }}>
                        {urgencyIcons["Medium"]}
                      </span>{" "}
                      Середньо
                    </MenuItem>
                    <MenuItem value="Urgent">
                      <span style={{ marginRight: "8px" }}>
                        {urgencyIcons["Urgent"]}
                      </span>{" "}
                      Важливо
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </ListItem>
          )}
        </Draggable>
      ))}
    </List>
  );
};

export default TaskList;
