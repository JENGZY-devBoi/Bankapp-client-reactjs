import './Login.css';

import { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const generateError = (error) =>
        toast.error(error, {
            position: "top-right",
        });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await axios.post("http://localhost:8080/api/v1/user/login", {
                email,
                password
            }, {
                withCredentials: true
            })

            navigate({
                pathname: "/",
                search: createSearchParams({
                    "id": data.user._id
                }).toString()
            });
        } catch (err) {
            generateError(err.response.data.errors.message);
        }
    };

    return (
        <div className=".container-fluid area">
            <ul class="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>

            <div className="container">
                <form
                    className="shadow p-5   bg-white rounded position-absolute top-50 start-50 translate-middle"
                    onSubmit={handleSubmit}
                >
                    <h1 className="mb-4 text-center fw-bold">Bank App</h1>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="text-end">
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>

            <ToastContainer
                autoClose={2000}
                pauseOnHover={false}
            />
        </div>
    )
}

export default Login;