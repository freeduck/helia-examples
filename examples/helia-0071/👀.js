import { unixfs } from '@helia/unixfs';
import { createHelia } from 'helia';
import fs from 'fs';
import os from 'os';
import Path from 'path';
import { concat as uint8ArrayConcat } from 'uint8arrays/concat'


// create a Helia node
const helia = await createHelia()

// create a filesystem on top of Helia, in this case it's UnixFS
const hfs = unixfs(helia)

// var fc = new Uint8Array(0);

// await fs.unlink('~/Pictures/armeret.jpeg', (e) => {
//   if (e) throw e;
//   console.info('deleted')
// })
let buffer = new Uint8Array(0)
for await (const chunk of hfs.cat('QmZkdNdThE4Lt7fkQshzaQAN7i3rEFVzJuLZ4oAbF8crQc', {
  onProgress: (evt) => {
    //console.info('cat event', evt.type, evt.detail)
  }
})) {
  //console.info('🐎')
  //console.log(chunk);
  //let tfc = new Unit8Array(fc.length + chunk.length)
  //tfc.set(fc)
  //tfc.set(chunk, fc.length);
  //fc = tfc
  // await fs.appendFile('~/Pictures/armeret.jpeg', chunk, (e) => {
  //   if (e) throw e;
  //   console.info('saved')
  // })
  buffer = uint8ArrayConcat([buffer, chunk], buffer.length + chunk.length)
}
const p = Path.join(os.homedir(), 'Pictures', 'armeret.jpeg')
await fs.writeFile(p , buffer, (e) => {
  if (e) throw e;
  console.log('written')
})

console.log('dfef')

const cid = await hfs.addFile({
  path: '~/Pictures/vagt.jpeg',
  content: buffer});

console.log(await hfs.stat(cid))

console.log(cid);

let b2 = new Uint8Array(0)
for await (const chunk of hfs.cat(cid, {
  onProgress: (evt) => {
    //console.info('cat event', evt.type, evt.detail)
  }
})) {
  //console.info('🐎')
  //console.log(chunk);
  //let tfc = new Unit8Array(fc.length + chunk.length)
  //tfc.set(fc)
  //tfc.set(chunk, fc.length);
  //fc = tfc
  // await fs.appendFile('~/Pictures/armeret.jpeg', chunk, (e) => {
  //   if (e) throw e;
  //   console.info('saved')
  // })
  b2 = uint8ArrayConcat([b2, chunk], b2.length + chunk.length)
}

const p2 = Path.join(os.homedir(), 'Pictures', 'armeret2.jpeg')
await fs.writeFile(p2 , b2, (e) => {
  if (e) throw e;
  console.log('written')
})

//await helia.stop()
