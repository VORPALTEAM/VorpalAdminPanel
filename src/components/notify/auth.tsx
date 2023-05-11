import { NOTIFY_LIFETIME, OkMessages, notifyNames } from 'config';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { actions } from 'state/reducer';


const Auth = () => {
   
    const dispatch = useDispatch()

    const CloseWindow = () => {
        dispatch(actions.notify(notifyNames.none))
    }

    useEffect(()=> {
        setTimeout(CloseWindow, NOTIFY_LIFETIME)
    }, [])

    return(
        <div className="notify--window window--success">
            <div className="notify--message">
                {OkMessages.auth || "Success"}
            </div>
            <div className="close--icon" onClick={CloseWindow} />
        </div>
    )
}

export default Auth