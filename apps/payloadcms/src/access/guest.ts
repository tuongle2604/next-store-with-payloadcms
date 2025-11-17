import type { Access } from 'payload'

import { checkRole } from './checkRole'

export const guest: Access = ({ req: { user } }) => checkRole(['guest'], user)
