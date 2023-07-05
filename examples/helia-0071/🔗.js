import {store} from './store.js'
import {p2p} from './peer.js'
import {get} from './raw.js'
import { unixfs } from '@helia/unixfs';
import { createHelia } from 'helia'
import { dagCbor } from '@helia/dag-cbor'
import { dagJson } from '@helia/dag-json'
import {CID} from 'multiformats'
const helia = await createHelia({
  ...store,
  libp2p: p2p(store.datastore)
})

const hfs = unixfs(helia)
const png = await get(hfs, 'QmexeAEQKfZTsrJN5pQXqeA5gS2nUGraeJCZWKUhjh6tN4')

const object1 = {
  path: '~/Pictures/tab.png',
  mime: "image/png",
  content: png};


const d = dagCbor(helia)
const dj = dagJson(helia)
const myImmutableAddress1 = await dj.add(object1)

const object2 = {
  hest: "hjort",
  link: myImmutableAddress1
}

const myImmutableAddress2 = await d.add(object2)
const r2 = await d.get(myImmutableAddress2)
console.log(r2)
const l2 = await d.get(r2.link)
console.log(l2)
console.log(typeof l2)
