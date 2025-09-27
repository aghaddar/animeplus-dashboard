import { jwtDecode } from "jwt-decode"

// Types
interface User {
  id: string
  name: string
  email: string
  role: string
}

interface DecodedToken {
  sub: string
  name: string
  email: string
  role: string
  exp: number
}

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  success: boolean
  token?: string
  message?: string
}

// Mock users for demo
const mockUsers = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    name: "Regular User",
    role: "user",
  },
]

// Auth service
export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // In a real app, this would call your API
    const user = mockUsers.find((u) => u.email === credentials.email && u.password === credentials.password)

    if (!user) {
      return { success: false, message: "Invalid email or password" }
    }

    // Create a JWT token
    const token = await createToken(user)

    // Store the token
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token)
    }

    return { success: true, token }
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
    }
  },

  getCurrentUser: (): User | null => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return null
    }

    const token = localStorage.getItem("auth_token")

    if (!token) {
      return null
    }

    try {
      // Validate token format before decoding
      if (!token.includes(".")) {
        localStorage.removeItem("auth_token")
        return null
      }

      const decoded = jwtDecode<DecodedToken>(token)

      // Check if token is expired
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("auth_token")
        return null
      }

      return {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
      }
    } catch (error) {
      console.error("Failed to decode token:", error)
      localStorage.removeItem("auth_token")
      return null
    }
  },

  isAuthenticated: (): boolean => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return false
    }

    return !!authService.getCurrentUser()
  },

  getToken: (): string | null => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return null
    }

    return localStorage.getItem("auth_token")
  },
}

// Helper function to create a JWT token
async function createToken(user: (typeof mockUsers)[0]): Promise<string> {
  // In a real app, this would be done on the server
  // This is a simplified version for demo purposes

  const header = {
    alg: "HS256",
    typ: "JWT",
  }

  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiration
  }

  // In a real app, you would sign this with a secret key
  // For demo, we'll create a proper JWT format with three parts
  const encodedHeader = btoa(JSON.stringify(header))
  const encodedPayload = btoa(JSON.stringify(payload))
  const signature = "demo-signature" // In a real app, this would be a real signature

  return `${encodedHeader}.${encodedPayload}.${signature}`
}
