export function downloadFileCsv(data: BlobPart, fileName: string) {
  const blob = new Blob([data], { type: 'text/plain' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
