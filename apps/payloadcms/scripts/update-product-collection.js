import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
  // Initialize Payload
  const payload = await getPayload({ config })

  const collection = 'products' // replace with your collection slug

  const { docs, totalDocs } = await payload.find({
    collection,
    limit: 1000, // adjust based on collection size or paginate
  })

  console.log(`Found ${totalDocs} documents. Updating...`)

  for (const doc of docs) {
    const defaultVariant = doc.variants && doc.variants[0]
    if (!defaultVariant) {
      console.log(`No default variant for ${doc.id}, skipping...`)
      continue
    }

    await payload.update({
      collection,
      id: doc.id,
      data: {
        thumbnail: defaultVariant.images[0]?.url || null,
        price: defaultVariant.price || null,
      },
      overrideLock: true,
      overrideAccess: true,
    })

    console.log(`Updated ${doc.id}`)
  }

  console.log('Done')
  process.exit()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
