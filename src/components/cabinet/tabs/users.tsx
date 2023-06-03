import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, actions } from 'state/reducer';
import UserRow from './components/userrow';
import { DispatchUsers } from 'state/hooks';
import { userItem, userList } from 'types';

const UsersTab = () => {

    const State = useSelector((state: RootState) => {
        return state
     })
    const dispatch = useDispatch()

    const defaultCreation : userItem = {
        address: "",
        login: "",
        rights: ""
    }
    const [creationUser, UpdateCreationUser] = useState<userItem>(defaultCreation)

    const WriteCreationData = (event) => {
        const field = event.target.dataset.field
        const value = event.target.value 
        let updValue : userItem = defaultCreation

        switch (field) {
            case "address":
                updValue = {
                    address: value.toLowerCase(),
                    login: creationUser.login,
                    rights: creationUser.rights
                }
                break;
            case "login":
                updValue = {
                    address: creationUser.address,
                    login: value,
                    rights: creationUser.rights
                }
                break;
            case "rights":
                updValue = {
                    address: creationUser.address,
                    login: creationUser.login,
                    rights: value
                }
                break;
        }
        UpdateCreationUser(updValue)
    }

    const AppendUser = () => {
        const newUserData : userList = []
        State.users.forEach((user) => {
            if (user.address !== creationUser.address) {
                newUserData.push(user)
            }
        })
        newUserData.push(creationUser)
        dispatch(actions.users(newUserData))
        UpdateCreationUser(defaultCreation)
    }

    const SaveData = () => {
        const newUserData : userList = []
        State.users.forEach((user) => {
            if (State.userDeletions.indexOf(user.address) < 0) {
                newUserData.push(user)
            }
        })
        DispatchUsers (State.users, State.userDeletions)
        dispatch(actions.users(newUserData))
    }

    return(
        <div className="admin--tab users--tab">
            {State.users.map((item, index) => {
                return(
                    <UserRow key={`urw_`.concat(String(index * 4))}  address={item.address} login={item.login} rights={item.rights} />
                )
            })}
        <div className="append--row">
            <input className="txt--edit address--row" type="text" data-field="address" 
            value={creationUser.address} onChange={WriteCreationData} />
            <input className="txt--edit row--item " type="text" data-field="login" 
            value={creationUser.login} onChange={WriteCreationData} />
            <input className="txt--edit row--item " type="text" data-field="rights" 
            value={creationUser.rights} onChange={WriteCreationData} />
             <div className="row--item" onClick={AppendUser}>
                    <img src="images/plus.png" />
            </div>
        </div>
        <div className="save--data--row">
              <button className="save--btn save--keys--btn" onClick={SaveData}>
                  Save
              </button>
        </div>
        </div>
    )
}

export default UsersTab