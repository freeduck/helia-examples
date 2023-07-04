
/* eslint-disable no-console */

import { unixfs } from '@helia/unixfs'
import { FsBlockstore } from 'blockstore-fs'
import { createHelia } from 'helia'
import os from 'os';
import Path from 'path';
import fs from 'fs';

const path = Path.join(os.homedir(), 'ipfs', 'db')

const blockstore = new FsBlockstore(path)
// create a Helia node
const helia = await createHelia({
  blockstore
})
const hfs = unixfs(helia)

console.log(await hfs.stat('bafkreiboy27tqryu54uaahd67stdpggrq5umbizz5kek3snysjw5giwodi'))
