export type notifyNames = 'ismetamask' | 'authok' | 'authfail' | 'saveok' | 'savefail' | ''

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

