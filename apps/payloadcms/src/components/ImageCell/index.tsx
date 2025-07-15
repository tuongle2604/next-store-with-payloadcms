export const ImageCell = ({ cellData }: { cellData: any }) => {
  if (!cellData) return null

  const { url, alt, caption } = JSON.parse(cellData)

  return (
    <img
      src={url}
      alt=""
      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
    />
  )
}

export default ImageCell
