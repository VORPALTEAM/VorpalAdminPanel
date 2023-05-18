import { notifyList } from "types"

export const API_URL = process.env.API_URL || "https://staging-api.vorpal.finance/api"

export const NOTIFY_LIFETIME = 6000

export const testAdminKeys : string[] = [
    "0x0779ffa4ea4b23260065ddcb10f4d88be9e29a32",
    "0x952659fe47b9ae12aed206f3ffadcaa4c3659589"
]

export const connectOptions = {
    keepAlive: true,
    withCredentials: false,
    timeout: 20000, // ms
    headers: [
        {
            name: 'Access-Control-Allow-Origin',
            value: '*'
        }
    ]
  }

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