import { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaSignOutAlt } from "react-icons/fa";
import API from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const loadTodos = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;

    await API.post("/todos", { title });

    setTitle("");
    loadTodos();
  };

  const deleteTodo = async (id) => {
    await API.delete(`/todos/${id}`);
    loadTodos();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-container">

      <div className="dashboard-card">

        <div className="dashboard-header">
          <h1>📝 My Todo List</h1>

          <button
            className="logout-btn"
            onClick={logout}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        <div className="todo-input-section">

          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && addTodo()
            }
          />

          <button
            className="add-btn"
            onClick={addTodo}
          >
            <FaPlus />
          </button>

        </div>

        <div className="todo-list">

          {todos.length === 0 ? (
            <div className="empty-state">
              No todos yet 🚀
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo._id}
                className="todo-card"
              >
                <span>{todo.title}</span>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTodo(todo._id)
                  }
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;