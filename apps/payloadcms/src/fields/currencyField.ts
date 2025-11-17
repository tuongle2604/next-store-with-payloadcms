import { type Field } from 'payload'

export const currencyField: Field = {
  name: 'currency',
  type: 'text',
  required: true,
  admin: {
    components: {
      Field: '@/components/CurrencySelect#CurrencySelect',
    },
  },
}
