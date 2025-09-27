const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"

// Type definitions based on your backend models
export interface User {
  id: number
  username: string
  email: string
  profile_url?: string
  created_at: string
  role: string
}

// New interface for user creation
export interface CreateUserInput {
  username: string
  email: string
  password: string
  profile_url?: string
  role: string
}

export interface Watchlist {
  id: number
  user_id: number
  anime_title: string
  img_url: string
  anime_type: string
}

export interface LoginResponse {
  token: string
}

export interface GuestLoginResponse {
  token: string
  user: User
}

export interface ApiError {
  error: string
}

// --- Mock data (used when backend is not reachable) ---
let _mockUserIdCounter = 1000
const mockUsers: User[] = [
  {
    id: 1,
    username: "admin",
    email: "admin@example.com",
    profile_url: "/placeholder-user.jpg",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
    role: "admin",
  },
  {
    id: 2,
    username: "johndoe",
    email: "john@example.com",
    profile_url: "/placeholder-user.jpg",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    role: "user",
  },
  {
    id: 3,
    username: "janedoe",
    email: "jane@example.com",
    profile_url: "/placeholder-user.jpg",
    created_at: new Date().toISOString(),
    role: "user",
  },
]

const mockWatchlists: Watchlist[] = [
  { id: 1, user_id: 2, anime_title: "Attack on Titan", img_url: "/armored-titan-battle.png", anime_type: "TV" },
  { id: 2, user_id: 2, anime_title: "Demon Slayer", img_url: "/demon-slayer-inspired.png", anime_type: "TV" },
  { id: 3, user_id: 3, anime_title: "Jujutsu Kaisen", img_url: "/jujutsu-kaisen-inspired.png", anime_type: "TV" },
]

function getMockUsers(): User[] {
  return JSON.parse(JSON.stringify(mockUsers))
}

function findMockUser(id: number) {
  return mockUsers.find((u) => u.id === id)
}

function createMockUser(input: CreateUserInput): User {
  const newUser: User = {
    id: ++_mockUserIdCounter,
    username: input.username,
    email: input.email,
    profile_url: input.profile_url || "/placeholder-user.jpg",
    created_at: new Date().toISOString(),
    role: input.role || "user",
  }
  mockUsers.push(newUser)
  return newUser
}

function updateMockUser(id: number, data: Partial<User>): User | null {
  const u = findMockUser(id)
  if (!u) return null
  Object.assign(u, data)
  return u
}

function deleteMockUser(id: number): boolean {
  const idx = mockUsers.findIndex((u) => u.id === id)
  if (idx === -1) return false
  mockUsers.splice(idx, 1)
  return true
}

function getMockWatchlistForUser(userId: number): Watchlist[] {
  return mockWatchlists.filter((w) => w.user_id === userId)
}

function addMockWatchlist(userId: number, animeTitle: string, imgUrl: string, animeType: string) {
  const nextId = mockWatchlists.reduce((s, w) => Math.max(s, w.id), 0) + 1
  const entry: Watchlist = { id: nextId, user_id: userId, anime_title: animeTitle, img_url: imgUrl, anime_type: animeType }
  mockWatchlists.push(entry)
  return entry
}

function removeMockWatchlist(userId: number, animeTitle: string) {
  const idx = mockWatchlists.findIndex((w) => w.user_id === userId && w.anime_title === animeTitle)
  if (idx === -1) return false
  mockWatchlists.splice(idx, 1)
  return true
}

function checkMockWatchlist(userId: number, animeTitle: string) {
  return mockWatchlists.some((w) => w.user_id === userId && w.anime_title === animeTitle)
}

// --- End mock data ---

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData: ApiError = await response.json()
    throw new Error(errorData.error || "An error occurred")
  }
  return response.json() as Promise<T>
}

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      return handleResponse<LoginResponse>(response)
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  },

  // Guest login function - provides full admin access without backend authentication
  guestLogin: async (): Promise<GuestLoginResponse> => {
    // Create a mock admin user
    const guestUser: User = {
      id: 999999,
      username: "Guest Admin",
      email: "guest@admin.com",
      profile_url: "/placeholder-user.jpg",
      created_at: new Date().toISOString(),
      role: "admin"
    }

    // Generate a mock token (in a real app, this would be a proper JWT)
    const guestToken = `guest-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    return {
      token: guestToken,
      user: guestUser
    }
  },

  register: async (username: string, email: string, password: string, profile_url?: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, profile_url }),
      })
      return handleResponse(response)
    } catch (error) {
      console.error("Register error:", error)
      throw error
    }
  },

  getProfile: async (token: string): Promise<User> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      return handleResponse<User>(response)
    } catch (error) {
      console.error("Get profile error:", error)
      throw error
    }
  },

  updateProfile: async (token: string, username: string, profile_url?: string): Promise<User> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, profile_url }),
      })
      return handleResponse<User>(response)
    } catch (error) {
      console.error("Update profile error:", error)
      throw error
    }
  },

  changePassword: async (token: string, old_password: string, new_password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ old_password, new_password }),
      })
      return handleResponse(response)
    } catch (error) {
      console.error("Change password error:", error)
      throw error
    }
  },
}

// User API
export const userApi = {
  getUsers: async (token: string): Promise<User[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      return handleResponse<User[]>(response)
    } catch (error) {
      console.warn("Get users error, returning mock users:", error)
      return getMockUsers()
    }
  },

  getUserById: async (token: string, id: number): Promise<User> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      return handleResponse<User>(response)
    } catch (error) {
      console.warn("Get user error, returning mock user if available:", error)
      const mu = findMockUser(id)
      if (mu) return mu
      throw error
    }
  },

  createUser: async (token: string, userData: CreateUserInput): Promise<User> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
      return handleResponse<User>(response)
    } catch (error) {
      console.warn("Create user error, creating mock user:", error)
      return createMockUser(userData)
    }
  },

  updateUser: async (token: string, id: number, userData: Partial<User>): Promise<User> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
      return handleResponse<User>(response)
    } catch (error) {
      console.warn("Update user error, updating mock user if present:", error)
      const updated = updateMockUser(id, userData)
      if (updated) return updated
      throw error
    }
  },

  deleteUser: async (token: string, id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      return handleResponse(response)
    } catch (error) {
      console.warn("Delete user error, deleting mock user if present:", error)
      const ok = deleteMockUser(id)
      if (ok) return { ok: true }
      throw error
    }
  },
}

// Watchlist API
export const watchlistApi = {
  getMyWatchlist: async (token: string): Promise<Watchlist[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/watchlists/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      return handleResponse<Watchlist[]>(response)
    } catch (error) {
      console.warn("Get watchlist error, returning mock watchlist:", error)
      // token isn't decoded client-side here; assume token encodes user id for mock
      // use user id 2 (johndoe) as the current user for mock flows
      return getMockWatchlistForUser(2)
    }
  },

  getUserWatchlist: async (token: string, userId: number): Promise<Watchlist[]> => {
    try {
      // Note: This endpoint might not exist in your current backend
      // You might need to implement it or use a workaround as shown in the page component
      const response = await fetch(`${API_BASE_URL}/users/${userId}/watchlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      return handleResponse<Watchlist[]>(response)
    } catch (error) {
      console.warn("Get user watchlist error, returning mock watchlist:", error)
      return getMockWatchlistForUser(userId)
    }
  },

  addAnimeToWatchlist: async (token: string, animeTitle: string, imgUrl: string, animeType: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/watchlists/my/anime`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          anime_title: animeTitle,
          img_url: imgUrl,
          anime_type: animeType,
        }),
      })
      return handleResponse(response)
    } catch (error) {
      console.warn("Add to watchlist error, adding to mock watchlist:", error)
      // assume current user id 2 for mock
      return addMockWatchlist(2, animeTitle, imgUrl, animeType)
    }
  },

  removeAnimeFromWatchlist: async (token: string, animeTitle: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/watchlists/my/anime/${encodeURIComponent(animeTitle)}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      return handleResponse(response)
    } catch (error) {
      console.warn("Remove from watchlist error, removing from mock watchlist:", error)
      // assume current user id 2 for mock
      const ok = removeMockWatchlist(2, animeTitle)
      if (ok) return { ok: true }
      throw error
    }
  },

  checkAnimeInWatchlist: async (token: string, animeTitle: string): Promise<{ exists: boolean }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/watchlists/my/anime/${encodeURIComponent(animeTitle)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      return handleResponse<{ exists: boolean }>(response)
    } catch (error) {
      console.warn("Check watchlist error, checking mock watchlist:", error)
      return { exists: checkMockWatchlist(2, animeTitle) }
    }
  },

  getAllWatchlists: async (token: string): Promise<Watchlist[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/watchlists`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      return handleResponse<Watchlist[]>(response)
    } catch (error) {
      console.error("Get all watchlists error:", error)
      throw error
    }
  },
}
