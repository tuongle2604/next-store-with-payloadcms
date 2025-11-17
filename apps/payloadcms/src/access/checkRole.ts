import type { User } from '@/payload-types'

export const checkRole = (allRoles: User['roles'] = [], user: User | null = null): boolean => {
  if (!user) {
    return false
  }

  // const isValidate = allRoles.some((role: string) => {
  //   return user?.role?.some((individualRole: string) => individualRole === role)
  // })

  return allRoles.includes(user.role)
}
