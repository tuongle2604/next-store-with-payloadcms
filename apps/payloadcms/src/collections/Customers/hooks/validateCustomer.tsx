import { registerFormSchema } from '@repo/schemas/form-schemas'
import type { CollectionBeforeValidateHook } from 'payload'
import { Customer } from '@/payload-types'
import { APIError } from 'payload'
import { confirmPassword, password } from 'payload/shared'

const validateCustomer: CollectionBeforeValidateHook<Customer> = async ({
  data,
  operation,
  req,
}) => {
  console.log('second')

  if (operation !== 'create') return data

  const result = registerFormSchema.safeParse({
    email: data?.email,
    password: data?.password,
    confirmPassword: data?.password,
  })

  if (!result.success && result.error.issues) {
    // ✅ TS now knows result.error is ZodError
    const error = result.error.issues[0]
    console.log(error?.message)

    throw new Error(error?.message || 'Validate Error')
  }

  return data
}

export { validateCustomer }
