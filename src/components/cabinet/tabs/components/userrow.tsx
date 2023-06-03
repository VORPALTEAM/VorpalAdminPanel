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
        State.userDeletions.forEach((item) => {
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
        dispatch(actions.userDeletions(dels))
    }

    const UpdateValue = (event : any) => {
        const field = event.target.dataset.field 
        const newVal = event.target.value 
        const newUserData : userList = []

        State.users.forEach((user) => {
            if (user.address !== pair.address) {
                newUserData.push(user)
            } else {
                if (field === "login") {
                    const updUser : userItem = {
                        address: pair.address,
                        login: newVal,
                        rights: pair.rights
                    }
                    newUserData.push(updUser)
                }
                if (field === "rights") {
                    const updUser : userItem = {
                        address: pair.address,
                        login: pair.login,
                        rights: newVal
                    }
                    newUserData.push(updUser)
                }
            }
        })
        dispatch(actions.users(newUserData))
    }

    return(
        <div className={`key--row${toDelete ? " to--delete" : ""}`}>
            <div className="val--key user--address">
               {pair.address}
            </div>
            <input className="row--item" type="text" data-field="login" value={pair.login} onChange={UpdateValue} />
            <input className="row--item" type="text" data-field="rights" value={pair.rights} onChange={UpdateValue} />
            <div className="row--item del--key--btn" onClick={MarkToDeleteKey}>
                <img src="images/minus.png" />
            </div>
        </div>
    )
}

export default UserRow