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
const png = get(hfs, 'QmexeAEQKfZTsrJN5pQXqeA5gS2nUGraeJCZWKUhjh6tN4')

const fcid = await hfs.addFile({
  path: '~/Pictures/tab.png',
  content: png});

const cid = CID.parse('QmexeAEQKfZTsrJN5pQXqeA5gS2nUGraeJCZWKUhjh6tN4')

const object1 = {
  hello: 'world',
  link: fcid}
const d = dagCbor(helia)
const dj = dagJson(helia)
console.log(d.get(fcid))
const myImmutableAddress1 = await d.add(object1)
const myImmutableAddress2 = await dj.add(object1)
console.log(myImmutableAddress1)
console.log(myImmutableAddress2)
const ro = d.get(myImmutableAddress1)
const data = await d.get(ro.link)
console.log(typeof data)
