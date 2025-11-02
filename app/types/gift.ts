export interface Gift {
  id: string
  name: string
  description?: string
  category: string
  price?: number
  imageUrl?: string
  available: boolean
  reserva?: {
    user?: {
      name?: string
    }
  }
}
