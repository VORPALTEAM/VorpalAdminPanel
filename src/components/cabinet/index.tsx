import React from 'react';
import { useSelector } from 'react-redux';
import UsersTab from './tabs/users';
import KeysTab from './tabs/keys';


const Cabinet = () => {
    
    return(
        <div className="cabinet">
            <div className="cabinet--header">
                 <h2>Data</h2>
            </div>
            <div className="cabinet--content">
                <div className="cabinet--tabs">
                    <KeysTab />
                    <UsersTab />
                </div>
            </div>
        </div>
    )
}

export default Cabinet