const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

/**
 * Enhanced FFmpeg function to handle metadata and cover art
 */
function ffmpeg(buffer, args = [], ext = '', ext2 = '', imageBuffer = null) {
  return new Promise(async (resolve, reject) => {
    try {
      let tmp = path.join(__dirname, '../lib', + new Date + '.' + ext)
      let out = tmp + '.' + ext2
      let inputArgs = ['-y', '-i', tmp]
      
      await fs.promises.writeFile(tmp, buffer)

      let tmpImg = ''
      if (imageBuffer) {
        tmpImg = path.join(__dirname, '../lib', 'img' + (+ new Date) + '.jpg')
        await fs.promises.writeFile(tmpImg, imageBuffer)
        inputArgs.push('-i', tmpImg)
      }

      const process = spawn('ffmpeg', [
        ...inputArgs,
        ...args,
        out
      ])

      process.on('error', reject)
      process.on('close', async (code) => {
        try {
          if (fs.existsSync(tmp)) await fs.promises.unlink(tmp)
          if (tmpImg && fs.existsSync(tmpImg)) await fs.promises.unlink(tmpImg)
          
          if (code !== 0) return reject(code)
          
          let result = await fs.promises.readFile(out)
          if (fs.existsSync(out)) await fs.promises.unlink(out)
          resolve(result)
        } catch (e) {
          reject(e)
        }
      })
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * Convert to Audio with Cover Art and Lyrics
 */
 
function toAudio(buffer, ext, options = {}) {
  const { 
    artist = 'HBWABot Artist', 
    album = 'YouTube Downloader', 
    title = 'Untitled', 
    lyrics = '',
    imageBuffer = null 
  } = options
  
  let args = [
    '-c:a', 'libmp3lame',
    '-b:a', '128k',
    '-ar', '44100',
    '-metadata', `title=${title}`,
    '-metadata', `artist=${artist}`,
    '-metadata', `album=${album}`,
  ]
  
  if (lyrics) {
    args.push('-metadata', `lyrics=${lyrics}`)
  }

  if (imageBuffer) {
    args.push(
      '-map', '0:a', 
      '-map', '1:v', 
      '-c:v', 'mjpeg', 
      '-id3v2_version', '3', 
      '-disposition:v:0', 'attached_pic',
      '-metadata:s:v', 'title="Album cover"', 
      '-metadata:s:v', 'comment="Cover (Front)"'
    )
  }

  return ffmpeg(buffer, args, ext, 'mp3', imageBuffer)
}

function toPTT(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-c:a', 'libopus',
    '-b:a', '128k',
    '-vbr', 'on',
    '-compression_level', '10'
  ], ext, 'opus')
}

function toVideo(buffer, ext) {
  return ffmpeg(buffer, [
    '-c:v', 'libx264',
    '-c:a', 'aac',
    '-ab', '128k',
    '-ar', '44100',
    '-crf', '32',
    '-preset', 'slow'
  ], ext, 'mp4')
}

module.exports = {
  toAudio,
  toPTT,
  toVideo,
  ffmpeg,
}