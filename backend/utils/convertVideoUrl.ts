export const convertVideoUrl = (videoUrl?: string): string | null => {
  if (!videoUrl) {
    throw new Error('有効な動画URLではありません')
  }

  // 通常の YouTube URL (ブラウザのアドレスバーに表示されるURL) ＆　再生リストに入った動画のURL
  let regExp = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/
  let match = videoUrl.match(regExp)
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`
  }

  // 短縮された YouTube URl (YouTube動画画面の「共有」から取得できるURL)
  regExp = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/
  match = videoUrl.match(regExp)
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`
  }

  // Vimeo URL (ブラウザのアドレスバーに表示されるURL)
  regExp = /https:\/\/vimeo\.com\/(\d+)/
  match = videoUrl.match(regExp)
  if (match && match[1]) {
    return `https://player.vimeo.com/video/${match[1]}`
  }

  // どの種類のURLにも該当しない場合は、そのまま返す
  return videoUrl
}
