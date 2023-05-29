import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, actions } from 'state/reducer';
import { userList, userItem } from 'types';

const UserRow = ( pair : userItem ) => {

    const [toDelete, MarkToDelete] = useState(false)
    const State = useSelector((state: RootState) => {
        return state
     })
    const dispatch = useDispatch()

    const MarkToDeleteKey = (event : any) => {
        const dels : string[] = []
        State.deletions.forEach((item) => {
            if (item !== pair.address) {
                dels.push(item)
            }
        })
        if (!toDelete) {
            MarkToDelete(true)
            dels.push(pair.address)
        } else {
            MarkToDelete(false)
        }
        dispatch(actions.deletions(dels))
        console.log(State.deletions)
    }

    return(
        <div className={`key--row${toDelete ? " to--delete" : ""}`}>
            <div className="user--address">
               {pair.address}
            </div>
            <div className="user--login">
               {pair.login}
            </div>
            <div className="user--rights">
               {pair.rights}
            </div>
            <button onClick={MarkToDeleteKey}>
                Delete
            </button>
        </div>
    )
}

export default UserRow