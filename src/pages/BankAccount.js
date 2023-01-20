import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

import Board from "../components/Board";
import Navbar from "./../components/Navbar";

function BankAccount() {
    const [searchparams] = useSearchParams();
    const [user, setUser] = useState();
    const [id, setId] = useState(searchparams.get("id"))

    // 👇🏼 handle rerender page with data is update
    //    It's BAD practice 😂, But this is the only way I can do it.
    const [update, setUpdate] = useState(0); 

    const [cookies, removeCookie] = useCookies([]);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyLogin = async () => {
            if (!cookies.jwt) {
                navigate('/login');
            } 
            else {
                // Check Token
                const { data } = await axios.post(`http://localhost:8080/api/v1/user`,
                {},
                { withCredentials: true });
            
                if (data.status === 'fail') {
                    removeCookie('jwt');
                    navigate('/login');
                }
            }
        };
        verifyLogin();
    },[cookies]);

    useEffect(() => {
        const getUser = async () => {
            const { data } = await axios.get(`http://localhost:8080/api/v1/user/${id}`);
            setUser(data.user)
        }
        getUser();
    }, [update])

    const handleUpdate = (newData) => {
        setUpdate(update + newData);
    };

    const onLogout = () => {
        removeCookie("jwt");
        navigate('/login');
    };

    const generateError = (message) =>
        toast.error(message, {
        position: "top-right",
    });

    const generateDone = (message) =>
        toast.success(message, {
        position: "top-right",
    });

    return (
        <>
            <Navbar onLogout={onLogout} />
            <ToastContainer 
                style={{ marginTop: '80px',  marginRight: '20px' }} 
                autoClose={2000} 
                pauseOnHover={false}
            />
            <Board 
                user={user} 
                onUpdate={handleUpdate} 
                showError={generateError} 
                showDone={generateDone} 
            />
        </>
    )
}

export default BankAccount;