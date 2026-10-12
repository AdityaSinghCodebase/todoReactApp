import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useEffect, useState } from "react";

function App() {
  const [dialog, setDialog] = useState(false);

  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const handleAddTodo = () => {
    if (!title.trim()) {
      return;
    }

    const newTodo = {
      id: nextId,
      title: title.trim(),
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setTitle("");
    setDialog((prev) => !prev);
  };

  const nextId =
    todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Typography variant="h2" align="center">
          Todo
        </Typography>
      </AppBar>

      <Container sx={{ pt: 12 }}>
        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id}>
              <Checkbox
                checked={todo.completed}
                onChange={() => {
                  setTodos((prevTodos) =>
                    prevTodos.map((item) =>
                      item.id === todo.id
                        ? { ...item, completed: !item.completed }
                        : item,
                    ),
                  );
                }}
              />
              <ListItemText
                primary={todo.title}
                secondary={`ID: ${todo.id}`}
                slotProps={{
                  primary: {
                    sx: {
                      textDecoration: todo.completed ? "line-through" : "none",
                    },
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
        <Fab
          onClick={() => setDialog(true)}
          color="primary"
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 99,
          }}
        >
          <AddIcon />
        </Fab>

        <Dialog open={dialog}>
          <DialogTitle>Add New Todo</DialogTitle>
          <DialogContent>
            <TextField
              label="Todo Title"
              fullWidth
              margin="normal"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={handleAddTodo}
              disabled={!title.trim()}
            >
              Create Todo
            </Button>
            <Button
              variant="contained"
              color="danger"
              onClick={() => setDialog(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default App;
