import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UsersTab from './tabs/users';
import KeysTab from './tabs/keys';
import Menu from './menu';
import { RootState } from 'state/reducer';


const Cabinet = () => {

    const State = useSelector((state: RootState) => {
        return state
      })
    const dispatch = useDispatch()
    
    return(
        <div className="cabinet">
            <div className="cabinet--header">
                 <Menu />
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