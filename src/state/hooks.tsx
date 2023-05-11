import store from './store'
import * as config from '../config'
import Web3 from 'web3';

declare global {
    interface Window {
      ethereum: any
    }
  }

export const env = window.ethereum 

export async function RequestAddress () {
   return ''
}