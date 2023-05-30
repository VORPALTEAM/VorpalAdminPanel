import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'state/reducer';

const Menu = () => {

    const State = useSelector((state: RootState) => {
        return state
      })
    const dispatch = useDispatch()
    
    return(
        <div className="menu--section">
            <div className="menu--logo">
                <img src="images/adm_logo.png" />
            </div>
            <div className="menu--inner">
                <div className="menu--item" data-tab="content">
                    Content
                </div>
                <div className="menu--item" data-tab="menu">
                   Menu
                </div>
                <div className="menu--item" data-tab="users">
                   Users
                </div>
                <div className="menu--item">
                   Logout
                </div>
            </div>
        </div>
    )
}

export default Menu