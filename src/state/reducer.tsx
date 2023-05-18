import { createReducer, createAction, combineReducers } from '@reduxjs/toolkit';
import * as config from 'config'
import * as types from 'types'

const actionNames = {
    auth: "AUTH",
    notify: "NOTIFY",
    address: "ADDRESS",
    keys: "KEYS"
}

const processingKeys : types.keyList = []

export const actions = {
    setIsAuth: createAction<boolean>(actionNames.auth),
    setAddress: createAction<string>(actionNames.address),
    notify: createAction<types.notifyNames>(actionNames.notify),
    keys: createAction<types.keyList>(actionNames.keys)
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

const EditKeys = (state = processingKeys, action: types.keyListAction) => {
  switch(action.type) {
    case actionNames.keys : 
      return action.payload
    default :
      return state
  }
}

export const RootReducer = combineReducers ({
    isAuth: SetIsAuth,
    notify: SelectNotify,
    address: SetAddress,
    keys: EditKeys
})

export type RootState = ReturnType<typeof RootReducer>