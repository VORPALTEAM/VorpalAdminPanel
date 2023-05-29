import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'state/reducer';
import UserRow from './components/userrow';

const UsersTab = () => {

    const State = useSelector((state: RootState) => {
        return state
     })
    const dispatch = useDispatch()
    
    console.log(State.users)
    return(
        <div className="admin--tab users--tab">
            {State.users.map((item, index) => {
                return(
                    <UserRow key={`urw_`.concat(String(index * 4))}  address={item.address} login={item.login} rights={item.rights} />
                )
            })}
        </div>
    )
}

export default UsersTab