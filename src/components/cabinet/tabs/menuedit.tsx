import { tabs } from 'config';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, actions } from 'state/reducer';
import { keyItem } from 'types';

const MenuEditor = () => {

    const State = useSelector((state: RootState) => {
        return state
     })
    const dispatch = useDispatch()

    const menuItems = () => {
          let menue : any[] = []
          State.keys.forEach((elm : keyItem) => {
              if (elm._key === tabs.menu) {
                 try {
                    const parsed = JSON.parse(elm.value)
                    menue = parsed
                 } catch (e) {
                    console.log(e)
                 }
              }
          })
        return menue
    }

    console.log(menuItems)

    return(
        <div className="menu--editor">
            <div className="menu--editor--inner">
                Menu
            </div>
        </div>
    )
}

export default MenuEditor