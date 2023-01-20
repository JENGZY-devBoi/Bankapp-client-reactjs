import { useState } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function AccountAction({ user, onUpdate, showError, showDone }) {
    const [deposit, setDeposit] = useState('');
    const [withdraw, setWithdraw] = useState('');
    const [reciever, setReciever] = useState('');
    const [transfer, setTransfer] = useState('');

    const [cookies, removeCookie] = useCookies([]);

    const navigate = useNavigate();

    const balance = Number(user?.account.balance);

    const handleDepositSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await axios.put('http://localhost:8080/api/v1/transaction/deposit', {
                id: user?._id,
                action: "deposit",
                amount: deposit
            })

            setDeposit('');
        
            if (data.status === 'success') {
                showDone(data.message);
            }

            onUpdate(1);
        } catch (err) {
            showError('Deposit failed');
            setDeposit('');
        }
    };

    const handleWithdrawSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await axios.put('http://localhost:8080/api/v1/transaction/withdraw', {
                id: user?._id,
                action: "withdraw",
                amount: withdraw
            });

            setWithdraw('');

            if (data.status === 'success') {
                showDone(data.message);
            }

            onUpdate(1);
        } catch (err) {
            showError('Withdraw failed');
            setWithdraw('');
        }
    };

    const handleTransferSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.put('http://localhost:8080/api/v1/transaction/transfer', {
                id: user?._id,
                email: user?.email,
                action: "transfer",
                amount: transfer,
                to: reciever
            });
            
            setReciever('');
            setTransfer('');

            if (data.status === 'success') {
                showDone(data.message);
            }

            onUpdate(1);
        } catch (err) {
            showError('Transfer failed');
            setReciever('');
            setTransfer('');
        }
    }

    return (
        <div
            className="container rounded mt-3  py-4"
            style={{ height: '' }}
        >
            <div className="row gap-2 mb-3">
                <form 
                    className="col shadow py-4 rounded px-5"
                    onSubmit={handleDepositSubmit}
                >
                    <h4 className="fs-4">Deposit</h4>
                    <div className="mt-3">
                        <h6 className="pt-2">amount</h6>
                        <input 
                            className="form-control"
                            type="number"
                            placeholder={`0.00 - 100000.00`}
                            value={deposit}
                            onChange={e => setDeposit(e.target.value)}
                        />
                    </div>
                    <div className="text-end">
                        <button 
                            type="submit"
                            className="btn bg-primary text-white mt-3 px-4"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                
                <form 
                    className="col shadow py-4 rounded px-5"
                    onSubmit={handleWithdrawSubmit}
                >
                    <h4 className="fs-4">Withdraw</h4>
                    <div className="mt-3">
                        <h6 className="pt-2">amount</h6>
                        <input 
                            className="form-control"
                            type="number"
                            placeholder={`0.00 - ${balance.toFixed(2)}`}
                            value={withdraw}
                            onChange={e => setWithdraw(e.target.value)}
                        />
                    </div>
                    <div className="text-end">
                        <button 
                            className="btn bg-primary text-white mt-3 px-4"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>

                <form 
                    className="col shadow py-4 rounded px-5"
                    onSubmit={handleTransferSubmit}
                >
                    <h4 className="fs-4">Transfer</h4>
                    <div>
                        <h6 className="pt-2">to</h6>
                        <input 
                            className="form-control"
                            type="email"
                            placeholder="email reciever"
                            value={reciever}
                            onChange={e => setReciever(e.target.value)}
                        />
                    </div>
                    <div>
                        <h6 className="pt-2">amount</h6>
                        <input 
                            className="form-control"
                            placeholder={`0.00 - ${balance.toFixed(2)}`}
                            value={transfer}
                            onChange={e => setTransfer(e.target.value)}
                        />
                    </div>
                    <div className="text-end">
                        <button 
                            className="btn bg-primary text-white mt-3 px-4"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AccountAction