import { createReducer, createAction, combineReducers } from '@reduxjs/toolkit';
import * as config from 'config'
import * as types from 'types'

const actionNames = {
    auth: "AUTH",
}

export const actions = {
    setIsAuth: createAction<boolean>(actionNames.auth)
}

const SetIsAuth = (state = false, action: types.booleanAction) => {
    switch(action.type) {
        case actionNames.auth : 
          return action.payload
        default :
          return state
      }
}

export const RootReducer = combineReducers ({
    isAuth: SetIsAuth,
})

export type RootState = ReturnType<typeof RootReducer>