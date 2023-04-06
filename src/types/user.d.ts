interface UserProfile {
  user_type: number
  avatar: string
}

export interface AuthUser {
  id?: number
  name?: string
  email?: string
  date_joined?: string
  user_profile?: UserProfile
}
