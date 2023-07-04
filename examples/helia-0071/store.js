import { FsBlockstore } from 'blockstore-fs'
import { FsDatastore } from 'datastore-fs'
import os from 'os';
import Path from 'path';

const blockpath = Path.join(os.homedir(), 'ipfs', 'block')
const datapath = Path.join(os.homedir(), 'ipfs', 'data')

const blockstore = new FsBlockstore(blockpath)
const datastore = new FsDatastore(datapath)
export const store = {
  blockstore,
  datastore,
}
