import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import AccountDetail from './AccountDetail';
import AccountAction from './AccountAction';
import Transaction from './Transaction';

const Board = ({ user, onUpdate, showError, showDone }) => {
    return(
        <>
            <AccountDetail user={user} /> 
            <AccountAction 
                user={user} 
                onUpdate={onUpdate} 
                showError={showError} 
                showDone={showDone} 
            />
            <Transaction 
                user={user}
                showError={showError} 
            /> 
        </>
    );
};

export default Board;