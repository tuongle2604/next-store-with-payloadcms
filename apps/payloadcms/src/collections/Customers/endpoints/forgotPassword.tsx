import { Endpoint } from 'payload'

export const disabledForgotPassword: Endpoint = {
  path: '/forgot-password',
  method: 'post',
  handler: async (req) => {
    console.log('first')
    return Response.json({ error: { message: 'This endpoint is disabled' } }, { status: 403 })
  },
}
