import { AuthRole } from '@/constants/role.enum'
import { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user?: {
      id: string
      role: AuthRole
      email: string
      phoneNumber?: string
    } & DefaultSession['user']
    accessToken?: string
    refreshToken?: string
  }

  export interface User extends DefaultUser {
    id: string
    role: AuthRole
    phoneNumber: string
    accessToken?: string
    refreshToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
    role: AuthRole
    accessToken?: string
    refreshToken?: string
    expiresAt: number
  }
}
