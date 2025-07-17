export const ImageCell = ({ cellData }: { cellData: any }) => {
  if (!cellData) return null

  // try {
  //   // Attempt to parse the cellData as JSON
  //   JSON.parse(cellData)
  // } catch (error) {
  //   // If parsing fails, log the error and return null
  //   console.log(cellData)

  //   console.error('Error parsing cellData:', error)
  // }

  return (
    <img
      src={cellData}
      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
    />
  )
}

export default ImageCell
