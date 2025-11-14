import { Role } from '@/transport/gateway/gRPC/stubs/exposed-common'
import { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user?: {
      id: string
      role: Role
      email: string
      phoneNumber?: string
    } & DefaultSession['user']
    accessToken?: string
    refreshToken?: string
  }

  export interface User extends DefaultUser {
    id: string
    role: Role
    phoneNumber: string
    accessToken?: string
    refreshToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
    role: Role
    accessToken?: string
    refreshToken?: string
  }
}
