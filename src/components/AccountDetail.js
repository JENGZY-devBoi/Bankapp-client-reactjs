import React from 'react';

function AccountDetail({ user }) {
    const email = user?.email;
    const name = user?.name;
    const balance = Number(user?.account?.balance)

    return (
        <>
            <div className="container mt-5">
                <div className="h2">Welcome back, {name} 😊</div>
            </div>
            <div className="container rounded p-3 px-5 mt-5 shadow"
                style={{ height: '100%' }}
            >
                <div className="row d-sm-flex">
                    <div className="col d-flex flex-column justify-content-end px-3">
                        <h4 className="h4 fw-semibold">Balance</h4>
                        <h1 className="h1 fw-bold" style={{ fontSize: '64px' }}>{balance.toFixed(2)}</h1>
                    </div>
                    <div className="col">
                        <div className="h3 text-end ">{name}</div>
                        <div className="text-end">{email}</div>
                    </div>
                </div>
             </div>
        </>
    );
}

export default AccountDetail;