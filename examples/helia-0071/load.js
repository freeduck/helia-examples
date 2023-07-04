
/* eslint-disable no-console */

import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { bootstrap } from '@libp2p/bootstrap'
import { tcp } from '@libp2p/tcp'
import { identifyService } from 'libp2p/identify'
import { unixfs } from '@helia/unixfs'
import { createHelia } from 'helia'
import {store} from './store.js'
import { createLibp2p } from 'libp2p'

  // libp2p is the networking layer that underpins Helia
  const libp2p = await createLibp2p({
    datastore: store.datastore,
    addresses: {
      listen: [
        '/ip4/127.0.0.1/tcp/0'
      ]
    },
    transports: [
      tcp()
    ],
    connectionEncryption: [
      noise()
    ],
    streamMuxers: [
      yamux()
    ],
    peerDiscovery: [
      bootstrap({
        list: [
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt',
          '/ip4/127.0.0.1/tcp/4001/p2p/12D3KooWMM1XykahGTL59xgqMzgtWkPppYP58zngSpq2uFczkW94' // My local ipfs node (ipfs id)
        ]
      })
    ],
    services: {
      identify: identifyService()
    }
  })

// create a Helia node
const helia = await createHelia({
  ...store,
  libp2p
})
const hfs = unixfs(helia)

console.log(await hfs.stat('bafkreiboy27tqryu54uaahd67stdpggrq5umbizz5kek3snysjw5giwodi'))
