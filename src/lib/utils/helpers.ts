export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
}

// https://gist.github.com/sunny/481146
export const changeHashWithoutScrolling = (hash: string) => {
  const id = hash.replace(/^.*#/, "")
  const elem = document.getElementById(id)
  if (!elem) return
  elem.id = `${id}!`
  window.location.hash = hash
  elem.id = id
}
