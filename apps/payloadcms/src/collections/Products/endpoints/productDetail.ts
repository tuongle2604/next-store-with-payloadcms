import { Endpoint } from 'payload'

export const productDetail: Endpoint = {
  path: '/detail-by-slug/:slug',
  method: 'get',
  handler: async (req) => {
    const { payload, routeParams } = req

    if (!routeParams?.slug) {
      return Response.json({ error: 'slug is required' }, { status: 400 })
    }

    const result = await payload.find({
      collection: 'products',
      where: {
        slug: {
          equals: routeParams?.slug,
        },
      },
      depth: 2, // optional, depending on your data needs
    })

    if (!result.docs.length) {
      return Response.json({ error: 'slug not found' }, { status: 404 })
    }

    return Response.json(result.docs[0])
  },
}
