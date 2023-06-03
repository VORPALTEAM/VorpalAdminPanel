import { createReducer, createAction, combineReducers } from '@reduxjs/toolkit';
import * as config from 'config'
import { tabs } from 'config';
import * as types from 'types'

const actionNames = {
    auth: "AUTH",
    notify: "NOTIFY",
    address: "ADDRESS",
    keys: "KEYS",
    users: "USERS",
    menu: "MENU",
    deletions: "DELETIONS",
    userDeletions: "USER_DELETIONS"
}

const processingKeys : types.keyList = []
const users : types.userList = []
const deletions : string[] = []

export const actions = {
    setIsAuth: createAction<boolean>(actionNames.auth),
    setAddress: createAction<string>(actionNames.address),
    switchTab: createAction<string>(actionNames.menu),
    notify: createAction<types.notifyNames>(actionNames.notify),
    keys: createAction<types.keyList>(actionNames.keys),
    users: createAction<types.userList>(actionNames.users),
    deletions: createAction<string[]>(actionNames.deletions),
    userDeletions: createAction<string[]>(actionNames.userDeletions)
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

const EditUsers = (state = users, action: types.userListAction) => {
  switch(action.type) {
    case actionNames.users : 
      return action.payload
    default :
      return state
  }
}

const UpdateDeletions = (state = deletions, action: types.stringArrAction) => {
  switch(action.type) {
    case actionNames.deletions : 
      return action.payload
    default :
      return state
  }
}

const UpdateUserDeletions = (state = deletions, action: types.stringArrAction) => {
  switch(action.type) {
    case actionNames.userDeletions : 
      return action.payload
    default :
      return state
  }
}

const SwitchTab = (state = tabs.content, action: types.stringAction) => {
  switch(action.type) {
    case actionNames.menu : 
      return action.payload
    default :
      return state
  }
}

export const RootReducer = combineReducers ({
    isAuth: SetIsAuth,
    notify: SelectNotify,
    address: SetAddress,
    keys: EditKeys,
    users: EditUsers,
    tab: SwitchTab,
    deletions: UpdateDeletions,
    userDeletions: UpdateUserDeletions 
})

export type RootState = ReturnType<typeof RootReducer>