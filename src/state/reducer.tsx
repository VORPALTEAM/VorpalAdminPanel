import { createReducer, createAction, combineReducers } from '@reduxjs/toolkit';
import * as config from 'config'
import * as types from 'types'

const actionNames = {
    auth: "AUTH",
    notify: "NOTIFY",
    address: "ADDRESS"
}

export const actions = {
    setIsAuth: createAction<boolean>(actionNames.auth),
    setAddress: createAction<string>(actionNames.address),
    notify: createAction<types.notifyNames>(actionNames.notify)
}

const SetIsAuth = (state = false, action: types.booleanAction) => {
    switch(action.type) {
        case actionNames.auth : 
          return action.payload
        default :
          return state
      }
}

const SelectNotify = (state = '', action: types.notifyAction) => {
    switch(action.type) {
        case actionNames.notify : 
          return action.payload
        default :
          return state
      }
}

const SetAddress = (state = '', action: types.stringAction) => {
    switch(action.type) {
        case actionNames.address : 
          return action.payload
        default :
          return state
      }
}

export const RootReducer = combineReducers ({
    isAuth: SetIsAuth,
    notify: SelectNotify,
    address: SetAddress
})

export type RootState = ReturnType<typeof RootReducer>