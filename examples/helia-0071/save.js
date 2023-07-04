
/* eslint-disable no-console */

import { unixfs } from '@helia/unixfs'
import { FsBlockstore } from 'blockstore-fs'
import { FsDatastore } from 'datastore-fs'
import { createHelia } from 'helia'
import os from 'os';
import Path from 'path';
import fs from 'fs';

const blockpath = Path.join(os.homedir(), 'ipfs', 'block')
const datapath = Path.join(os.homedir(), 'ipfs', 'data')
const file = Path.join(os.homedir(), 'Pictures', 'Screenshots', 'hest.png')
let content


fs.readFile(file, null, (e, d) => {
  if (e) throw e;
  content = d
})

const blockstore = new FsBlockstore(blockpath)
const datastore = new FsDatastore(datapath)
// create a Helia node
const helia = await createHelia({
  datastore,
  blockstore
})
const hfs = unixfs(helia)

const cid = await hfs.addFile({
  path: '~/Pictures/hest.jpeg',
  content: content});

console.log(await hfs.stat(cid))
