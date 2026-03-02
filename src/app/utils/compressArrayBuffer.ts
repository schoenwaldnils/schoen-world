import sharp from 'sharp'

export const compressArrayBuffer = async (
  arrayBuffer: ArrayBuffer,
): Promise<ArrayBuffer> => {
  const buffer = Buffer.from(arrayBuffer)
  const compressedBuffer = await sharp(buffer).jpeg({ quality: 65 }).toBuffer()
  return new Uint8Array(compressedBuffer).buffer
}
