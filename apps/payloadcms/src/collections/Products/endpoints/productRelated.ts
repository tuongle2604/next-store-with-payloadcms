import { Endpoint } from 'payload'

export const productRelated: Endpoint = {
  path: '/related-by-tag',
  method: 'get',
  handler: async (req) => {
    const { payload, routeParams, query } = req

    const result = await payload.find({
      collection: 'products',
      where: {
        tags: {
          in: query.tags,
        },
      },
      depth: 2, // optional, depending on your data needs
      limit: 5, // limit to 4 related products
    })

    return Response.json(result)
  },
}
