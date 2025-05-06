export function flashTitle (message) {
  if (document.hasFocus()) {
    return
  }
  
  const originalTitle = document.title
  let isOriginal = true

  const interval = setInterval(() => {
    document.title = isOriginal ? message : originalTitle
    isOriginal = !isOriginal
  }, 1000)

  const stop = () => {
    clearInterval(interval)
    document.title = originalTitle
    window.removeEventListener('focus', stop)
  }

  window.addEventListener('focus', stop)
}
