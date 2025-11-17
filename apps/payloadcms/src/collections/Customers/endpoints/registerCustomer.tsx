import { Endpoint } from 'payload'

const EMAIL_THROTTLE_TIME = 5 * 60 * 1000
let lastSent: number | null = null

export const registerCustomer: Endpoint = {
  path: '/register',
  method: 'post',
  handler: async (req) => {
    const now = Date.now()

    if (lastSent && now - lastSent < EMAIL_THROTTLE_TIME) {
      return Response.json(
        {
          error: {
            message: 'Someone has already requested an email. Please try again in 5 minutes.',
          },
        },
        { status: 400 },
      )
    }

    if (!req.json) {
      return Response.json(
        { success: false, error: { message: 'Missing request body' } },
        { status: 400 },
      )
    }

    const { email, password } = await req.json()

    const existing = await req.payload.find({
      collection: 'customers',
      where: { email: { equals: email } },
    })

    if (existing.docs.length > 0) {
      return Response.json(
        {
          error: { message: 'Email already exists', name: 'EMAIL_EXISTS' },
        },
        { status: 409 },
      )
    }

    try {
      const newUser = await req.payload.create({
        collection: 'customers',
        data: { email, password },
      })

      lastSent = Date.now()

      return Response.json(
        {
          message: 'User registered successfully',
          user: newUser,
        },
        { status: 201 },
      )
    } catch (err) {
      const message = (err as Error).message

      return Response.json({ error: { message: message } }, { status: 400 })
    }
  },
}
