import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, actions } from '../../state/reducer'
import { notifyNames } from '../../config'
import NoMatamask from './nometamask'
import AuthFail from './authfail'
import Auth from './auth'
import SaveFail from './savefail'
import Save from './save'
 
const NotifyContainer = () => {

    const State = useSelector((state: RootState) => {
        return state
      })
    
    const dispatch = useDispatch()

    const OverlayClose = () => {
      dispatch(actions.notify(notifyNames.none))
    }

    function currentWindow ( windowName ) {
      switch (windowName) {
        case notifyNames.ismetamask:
          return <NoMatamask />
        case notifyNames.authfail  :
          return <AuthFail />
        case notifyNames.authok :
          return <Auth />
        case notifyNames.savefail :
          return <SaveFail />
        case notifyNames.saveok :
          return <Save />
        default: 
          return null;
      }
    }

    return(
        <>
          {currentWindow(State.notify)}
          <div onClick={OverlayClose} className={State.notify ? "modal--overlay active" : "modal--overlay"} />
        </>
    )
}

export default NotifyContainer