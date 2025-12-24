import type { User, Customer } from '@/payload-types'

type Roles = User['role'] | Customer['role'];

export const checkRole = (allRoles: Roles[] = [], user: User | Customer | null = null): boolean => {
  if (!user) {
    return false
  }

  // const isValidate = allRoles.some((role: string) => {
  //   return user?.role?.some((individualRole: string) => individualRole === role)
  // })

  return allRoles.includes(user.role);
}
