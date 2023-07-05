import { concat as uint8ArrayConcat } from 'uint8arrays/concat'
export async function get(ifs, cid_str) {

  let buffer = new Uint8Array(0)
  for await (const chunk of ifs.cat(cid_str)) {
    buffer = uint8ArrayConcat([buffer, chunk], buffer.length + chunk.length)
  }
  return buffer
}
