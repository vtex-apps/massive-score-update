import { IOClients } from '@vtex/api'

import ScoreRestClient from './scoreRestClient'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get scoreRestClient() {
    return this.getOrSet('scoreRestClient', ScoreRestClient)
  }
}
