import { Customer } from '@/payload-types'
import type { CollectionBeforeValidateHook } from 'payload'

export const preventEmailChange: CollectionBeforeValidateHook<Customer> = async ({
  data,
  originalDoc,
  operation,
}) => {
  if (operation === 'update' && data?.email && originalDoc?.email !== data.email) {
    throw new Error('Email cannot be changed once set')
  }
  return data
}
