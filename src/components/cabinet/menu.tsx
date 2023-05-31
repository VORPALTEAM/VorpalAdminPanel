import { tabs } from 'config';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, actions } from 'state/reducer';

const Menu = () => {

    const State = useSelector((state: RootState) => {
        return state
      })
    const dispatch = useDispatch()

    const SelectTab = (event) => {
        const newTab : string = event.target.dataset.tab 
        dispatch(actions.switchTab(newTab))
    }

    const LogOut = () => {
         dispatch(actions.setIsAuth(false))
    }
    
    return(
        <div className="menu--section">
            <div className="menu--logo">
                <img src="images/adm_logo.png" />
            </div>
            <div className="menu--inner">
                <div className={`menu--item${State.tab === tabs.content ? " active" : ""}`} 
                data-tab={tabs.content}
                onClick={SelectTab}>
                    Content
                </div>
                <div className={`menu--item${State.tab === tabs.menu ? " active" : ""}`} 
                data-tab={tabs.menu}
                onClick={SelectTab}>
                   Menu
                </div>
                <div className={`menu--item${State.tab === tabs.users ? " users" : ""}`} 
                data-tab={tabs.users}
                onClick={SelectTab}>
                   Users
                </div>
                <div className="menu--item"
                onClick={LogOut}>
                   Logout
                </div>
            </div>
        </div>
    )
}

export default Menu