import { EventEmitter } from 'events'
import { debug as debugFn } from 'debug'
import { start as createDevServer } from './startServer'
import { Server } from 'http'
import { RollupOptions } from 'rollup'
import express from 'express'
import http from 'http'
const debug = debugFn('cypress:rollup-dev-server:rollup')

interface Options {
  specs: Cypress.Cypress['spec'][] // Why isn't this working? It works for webpack-dev-server
  config: Record<string, string>
  devServerEvents: EventEmitter
  [key: string]: unknown
}

export interface StartDevServer {
  /* this is the Cypress options object */
  options: Options
  rollupOptions?: RollupOptions // TODO: implement taking in the user's rollup configuration. Right now we don't
}

export interface ResolvedDevServerConfig {
  port: number
  server: Server
}

export async function startDevServer (startDevServerArgs: StartDevServer): Promise<ResolvedDevServerConfig> {
  const rollupDevServer = createDevServer(startDevServerArgs)
  return new Promise(async (resolve) => {
    try {
      const port = 3000
      console.log('Listening...')
      rollupDevServer.listen(port, 'localhost', () => {
        resolve({ port, server: rollupDevServer })
      })
    } catch (e) {
      console.log(e)
    }
  })
}
