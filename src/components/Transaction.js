import { useEffect, useState } from 'react';
import axios from 'axios';

import TransactionTable from "./TransactionTable";

const Transaction = ({ user, showError }) => {
    const id = user?._id;
    const email = user?.email;
    const transactions = user?.account?.transaction;

    const [transacs, setTransacs] = useState(transactions);

    const handleClickAllView =() => {
        setTransacs(transactions);
    };

    const handleClickReciveView = async () => {
        try {
            const { data } = await axios.post('http://localhost:8080/api/v1/transaction/recieves',
            { 
                id: id
            });
            const trans = data.data.transaction;
            setTransacs(trans);
        } catch (err) {
            showError('Womething wrong');
        }
    }

    const handleClickTransferView = async () => {
        try {
            const { data } = await axios.post('http://localhost:8080/api/v1/transaction/transfers',
            { 
                id: id
            });
            const trans = data.data.transaction;
            setTransacs(trans);
        } catch (err) {
            showError('Womething wrong');
        }
    }

    return (
        <>
            <div
                className="container shadow rounded mt-1 px-5 py-4"
            >
                <div className="d-flex justify-content-between">
                    <h4>Transaction</h4>
                    <div className="d-flex gap-2">
                        <button 
                            className="btn btn-outline-light text-dark"
                            onClick={handleClickAllView}
                        >
                            All
                        </button>
                        <button 
                            className="btn btn-outline-light text-dark"
                            onClick={handleClickReciveView}
                        >
                            Recieve
                        </button>
                        <button 
                            className="btn btn-outline-light text-dark"
                            onClick={handleClickTransferView}
                        >
                            Transfer
                        </button>
                    </div>
                </div>

            </div>

            <div 
                className="container shadow mt-4 mb-5 p-5 py-3 rounded" 
                style={{ display: 'relative', height: '500px', overflow: 'auto', display: 'block' }}
            >
                <TransactionTable transacs={(transacs) ? transacs : transactions} email={email} />
            </div>
        </>
    );
};

export default Transaction;