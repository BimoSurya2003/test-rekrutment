import { useState } from "react";
import api from "../api/axios";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await api.post("/auth/register", { name, email, password });
            window.location.href = "/login";
        } catch {
            setError("Gagal register, email mungkin sudah terdaftar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container min-vh-100 d-flex align-items-center justify-content-center">
            <div className="col-md-4">
                <div className="card shadow-lg border-0 rounded-4">
                    <div className="card-body p-4">
                        <h3 className="text-center mb-4 fw-bold">
                            Register
                        </h3>

                        {error && (
                            <div className="alert alert-danger text-center py-2">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

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
                                {loading ? "Loading..." : "Register"}
                            </button>
                        </form>

                        <p className="text-center mt-3 mb-0">
                            Sudah punya akun? <a href="/login">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
