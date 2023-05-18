export type notifyNames = 'ismetamask' | 'authok' | 'authfail' | 'saveok' | 'savefail' | ''

export type notifyList = {
    ismetamask: notifyNames,
    authok : notifyNames,
    authfail : notifyNames,
    saveok : notifyNames,
    savefail : notifyNames,
    none: notifyNames
}

export type keyItem = {
    _key: string,
    value: string
}

export type keyList = keyItem[]

export type keyListAction = {
    type: string,
    payload: keyList
}
export type booleanAction = {
    type: string,
    payload: boolean
}

export type stringAction = {
    type: string,
    payload: string
}

export type numberAction = {
    type: string,
    payload: number
}

export type notifyAction = {
    type: string,
    payload: notifyNames
}

