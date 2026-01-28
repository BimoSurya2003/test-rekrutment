import { useState } from "react";
import api from "../api/axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.access_token);
            window.location.href = "/todos";
        } catch {
            setError("Email atau password salah");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container min-vh-100 d-flex align-items-center justify-content-center">
            <div className="col-md-4">
                <div className="card shadow-lg border-0 rounded-4">
                    <div className="card-body p-4">
                        <h3 className="text-center mb-4 fw-bold">Login</h3>

                        {error && (
                            <div className="alert alert-danger text-center py-2">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i
                                            className={`bi ${
                                                showPassword
                                                    ? "bi-eye-slash"
                                                    : "bi-eye"
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            <button
                                className="btn btn-primary w-100 mt-3"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Login"}
                            </button>
                        </form>

                        <p className="text-center mt-3 mb-0">
                            Belum punya akun? <a href="/register">Register</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
