import { unixfs } from '@helia/unixfs';
import { createHelia } from 'helia';
import fs from 'fs';
import {tmpdir} from 'os';
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

await fs.writeFile('/home/kristian/Pictures/armeret.jpeg', buffer, (e) => {
  if (e) throw e;
  console.log('written')
})



// const cid = await hfs.addFile({path: '~/Pictures/vagt.jpeg'});

// console.log(cid);
