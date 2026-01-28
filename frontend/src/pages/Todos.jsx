import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Todos() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [descriptions, setDescriptions] = useState("");
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescriptions, setEditDescriptions] = useState("");

    const fetchTodos = async () => {
        try {
        const res = await api.get("/todos", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTodos(res.data);
        } catch (err) {
        console.error(err);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        window.location.href = "/login";
        return;
        }
        fetchTodos();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
        await api.post("/todos", { title, descriptions });
        setTitle("");
        setDescriptions("");
        fetchTodos();
        } catch (err) {
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    const toggleDone = async (id, is_done) => {
        const newStatus = !is_done;
        setTodos((prev) =>
        prev.map((todo) =>
            todo.id === id ? { ...todo, is_done: newStatus } : todo,
        ),
        );

        try {
        await api.patch(`/todos/${id}`, { is_done: newStatus });
        } catch (err) {
        console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
        await api.delete(`/todos/${id}`);
        fetchTodos();
        } catch (err) {
        console.error(err);
        }
    };

    const startEdit = (todo) => {
        setEditingId(todo.id);
        setEditTitle(todo.title);
        setEditDescriptions(todo.descriptions || "");
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditTitle("");
        setEditDescriptions("");
    };

    const saveEdit = async (id) => {
        try {
        await api.patch(`/todos/${id}`, {
            title: editTitle,
            descriptions: editDescriptions,
        });
        cancelEdit();
        fetchTodos();
        } catch (err) {
        console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <div style={styles.container}>
        <div style={styles.card}>
            {/* Header */}
            <div style={styles.header}>
            <h3 style={styles.title}>My Todo List</h3>
            <button style={styles.logoutButton} onClick={handleLogout}>
                Logout
            </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreate} style={styles.form}>
            <input
                style={styles.input}
                placeholder="Todo title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                style={styles.textarea}
                placeholder="Descriptions (optional)"
                value={descriptions}
                onChange={(e) => setDescriptions(e.target.value)}
            />
            <button style={styles.button} disabled={loading}>
                {loading ? "Saving..." : "Add Todo"}
            </button>
            </form>

            {/* Table List */}
            {todos.length === 0 ? (
            <p style={styles.empty}>No todos yet</p>
            ) : (
            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>Title</th>
                    <th style={styles.th}>Descriptions</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Action</th>
                </tr>
                </thead>
                <tbody>
                {todos.map((todo) => (
                    <tr key={todo.id} style={styles.tr}>
                    <td style={styles.td}>
                        {editingId === todo.id ? (
                        <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        ) : (
                        todo.title
                        )}
                    </td>
                    <td style={styles.td}>
                        {editingId === todo.id ? (
                        <input
                            value={editDescriptions}
                            onChange={(e) => setEditDescriptions(e.target.value)}
                        />
                        ) : (
                        todo.descriptions || "-"
                        )}
                    </td>
                    <td style={styles.td}>
                        <input
                        type="checkbox"
                        checked={!!todo.is_done}
                        onChange={() => toggleDone(todo.id, todo.is_done)}
                        />
                    </td>
                    <td style={styles.td}>
                        {editingId === todo.id ? (
                        <>
                            <button
                            style={{ ...styles.iconButton, ...styles.save }}
                            onClick={() => saveEdit(todo.id)}
                            >
                            <i className="bi bi-check"></i>
                            </button>
                            <button
                            style={{ ...styles.iconButton, ...styles.cancel }}
                            onClick={cancelEdit}
                            >
                            <i className="bi bi-x"></i>
                            </button>
                        </>
                        ) : (
                        <>
                            <button
                            style={{ ...styles.iconButton, ...styles.edit }}
                            onClick={() => startEdit(todo)}
                            >
                            <i className="bi bi-pencil"></i>
                            </button>
                            <button
                            style={{ ...styles.iconButton, ...styles.delete }}
                            onClick={() => handleDelete(todo.id)}
                            >
                            <i className="bi bi-trash"></i>
                            </button>
                        </>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
        </div>
        </div>
    );
    }

    const styles = {
    container: {
        minHeight: "100vh",
        background: "#f3f4f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
    },
    card: {
        width: "100%",
        maxWidth: "720px",
        background: "#fff",
        padding: "28px",
        borderRadius: "10px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    },
    title: {
        margin: 0,
        fontWeight: 600,
        fontSize: "20px",
    },
    logoutButton: {
        padding: "6px 12px",
        background: "#ef4444",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: 600,
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "20px",
    },
    input: {
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        fontSize: "14px",
    },
    textarea: {
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        fontSize: "14px",
        resize: "none",
        minHeight: "70px",
    },
    button: {
        padding: "10px",
        background: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: 600,
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    th: {
        textAlign: "left",
        borderBottom: "2px solid #ccc",
        padding: "10px",
    },
    tr: {
        borderBottom: "1px solid #eee",
    },
    td: {
        padding: "10px",
    },
    edit: {
        background: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginRight: "6px",
    },
    save: {
        background: "#16a34a",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginRight: "6px",
    },
    cancel: {
        background: "#ef4444",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    delete: {
        background: "#f87171",
        border: "none",
        color: "#fff",
        borderRadius: "4px",
        cursor: "pointer",
        marginLeft: "4px",
    },
    empty: {
        textAlign: "center",
        color: "#6b7280",
        fontSize: "14px",
    },
    iconButton: {
        border: "none",
        cursor: "pointer",
        marginRight: "6px",
        fontSize: "16px",
    },
};
