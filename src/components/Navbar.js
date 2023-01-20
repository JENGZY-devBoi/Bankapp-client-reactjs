import { Link } from "react-router-dom";
import { AiOutlineBank } from 'react-icons/ai';
import axios from 'axios';

const NavBar = ({ onLogout }) => {
    const handleLogout = async () => {
        try {
            const { data } = await axios.post('http://localhost:8080/api/v1/user/logout');
    
            if (data.status === 'success') onLogout();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <nav 
            className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between px-5"
        >
            <div>
                <Link className="navbar-brand d-flex" to="/">
                    <h1 className="fs-1 fw-bold">Bank App</h1>
                </Link>
            </div>
            <div>
                <button 
                    className="btn btn-md fw-semibold bg-dark text-white"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default NavBar;