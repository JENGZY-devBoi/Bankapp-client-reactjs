import React from 'react';

function TransactionTable({ transacs, email }) {
    const transactionRerender = transacs?.map((trans, idx) => {
        const bage = {
            'deposit': 'bg-success',
            'withdraw': 'bg-danger',
            'transfer': 'bg-primary',
            'recieve': 'bg-warning'
        };

        let fromto = '-';
        if (trans.from) {
            fromto = trans.from;
        }
        if (trans.to) {
            fromto = trans.to;
        }

        let startTime = new Date(trans.datetime);
        startTime =   new Date(startTime.getTime() + ( startTime.getTimezoneOffset() * 60000));

        return(
            <tr key={idx}>
            <th scope="row">{idx + 1}</th>
            <td>{startTime.toDateString()}</td>
            <td>{email}</td>
            <td><span className={`badge ${bage[trans.action]}`}>{trans.action}</span></td>
            <td>{fromto}</td>
            <td>{Number(trans.amount).toFixed(2)}</td>
            <td>{Number(trans.remain).toFixed(2)}</td>
        </tr>
        );
    });

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Datetime</th>
                    <th scope="col">User</th>
                    <th scope="col">Action</th>
                    <th scope="col">From/To</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Remain</th>
                </tr>
            </thead>
            <tbody>
                {transactionRerender}
            </tbody>
        </table>
    );
};

export default TransactionTable;