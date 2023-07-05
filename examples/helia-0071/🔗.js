import {store} from './store.js'
import {p2p} from './peer.js'
import { createHelia } from 'helia'
import { dagCbor } from '@helia/dag-cbor'
import {CID} from 'multiformats'
const helia = await createHelia({
  ...store,
  libp2p: p2p(store.datastore)
})


const cid = CID.parse('bafkreiboy27tqryu54uaahd67stdpggrq5umbizz5kek3snysjw5giwodi')

const object1 = {
  hello: 'world',
  link: cid}
const d = dagCbor(helia)
const myImmutableAddress1 = await d.add(object1)
console.log(myImmutableAddress1)
