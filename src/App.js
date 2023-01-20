import { Routes, Route, BrowserRouter } from 'react-router-dom';
import BankAccount from './pages/BankAccount';
import Login from './pages/Login';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<BankAccount />} />
                <Route path="/login" exact element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;