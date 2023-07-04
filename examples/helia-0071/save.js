
/* eslint-disable no-console */

import { unixfs } from '@helia/unixfs'
import { FsBlockstore } from 'blockstore-fs'
import { createHelia } from 'helia'
import os from 'os';
import Path from 'path';
import fs from 'fs';

const path = Path.join(os.homedir(), 'ipfs', 'db')
const file = Path.join(os.homedir(), 'Pictures', 'Screenshots', 'hest.png')
let content


fs.readFile(file, null, (e, d) => {
  if (e) throw e;
  content = d
})

const blockstore = new FsBlockstore(path)
// create a Helia node
const helia = await createHelia({
  blockstore
})
const hfs = unixfs(helia)

const cid = await hfs.addFile({
  path: '~/Pictures/hest.jpeg',
  content: content});

console.log(await hfs.stat(cid))
