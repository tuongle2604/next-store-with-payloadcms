import { Endpoint } from 'payload'

export const productRelated: Endpoint = {
  path: '/related-by-tag',
  method: 'get',
  handler: async (req) => {
    const { payload, routeParams, query } = req

    const result = await payload.find({
      collection: 'products',
      where: {
        and: [
          {
            tags: {
              in: query.tags,
            },
          },
          {
            id: {
              not_equals: query.productId,
            },
          },
        ],
        // tags: {
        //   in: query.tags,
        // },
      },
      depth: 1, // optional, depending on your data needs
      limit: 4, // limit to 4 related products
    })

    return Response.json(result)
  },
}
