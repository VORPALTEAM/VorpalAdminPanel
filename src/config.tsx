import { notifyList } from "types"

export const API_URL = "http://staging-api.vorpal.finance/api"

export const testAdminKeys : string[] = [
    "0x0779ffA4EA4B23260065ddcB10f4d88Be9E29a32",
    "0x952659fe47B9AE12aeD206F3FfaDCAa4c3659589"
]

export const testContents = {
    menu: {},
    saleheading: "Heading",
    VRP_price: "0.0025",
    test: "ok",
    vesting_period: "36000"
}

export const notifyNames : notifyList = {
    ismetamask: 'ismetamask',
    authok : 'authok',
    authfail : 'authfail',
    saveok : 'saveok',
    savefail : 'savefail',
    none: ''
}

export const ErrMessages = {
    nometamask: "You need metamask to access this service",
    norights: "User have no rights to access",
    unavailable: "Cannot connect with vorpal server",
    unsaved: "Failed to save data: invalid signature of wrong keys"
}

export const OkMessages = {
    auth: "Auth successful. Welocme!",
    saved: "Data saved successful. Look at the updates"
}