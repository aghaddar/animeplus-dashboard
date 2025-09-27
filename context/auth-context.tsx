"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { authApi, type User } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  guestLogin: () => Promise<void>
  logout: () => void
  updateProfile: (username: string, profileUrl?: string) => Promise<void>
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Check for token in localStorage
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      // Set authentication cookie for middleware if token exists
      document.cookie = "isAuthenticated=true; path=/; max-age=86400"
      setToken(storedToken)
      fetchUserProfile(storedToken)
    } else {
      setIsLoading(false)
    }
  }, [])

  const fetchUserProfile = async (authToken: string) => {
    try {
      setIsLoading(true)
      const userData = await authApi.getProfile(authToken)
      setUser(userData)
    } catch (error) {
      console.error("Failed to fetch user profile:", error)
      // If token is invalid, clear it
      localStorage.removeItem("token")
      setToken(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const { token: authToken } = await authApi.login(email, password)

      // Save token to localStorage
      localStorage.setItem("token", authToken)
      
      // Set authentication cookie for middleware
      document.cookie = "isAuthenticated=true; path=/; max-age=86400" // 24 hours
      
      setToken(authToken)

      // Fetch user profile
      await fetchUserProfile(authToken)

      toast({
        title: "Login successful",
        description: "Welcome back!",
      })
    } catch (error) {
      console.error("Login failed:", error)
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const guestLogin = async () => {
    try {
      setIsLoading(true)
      const { token: authToken, user: guestUser } = await authApi.guestLogin()

      // Save token to localStorage with guest prefix
      localStorage.setItem("token", authToken)
      localStorage.setItem("isGuest", "true")
      
      // Set authentication cookie for middleware
      document.cookie = "isAuthenticated=true; path=/; max-age=86400" // 24 hours
      
      setToken(authToken)
      setUser(guestUser)

      toast({
        title: "Guest login successful",
        description: "Welcome! You have full admin access as a guest user.",
      })
    } catch (error) {
      console.error("Guest login failed:", error)
      toast({
        title: "Guest login failed",
        description: error instanceof Error ? error.message : "Unable to login as guest",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("isGuest")
    
    // Clear authentication cookie
    document.cookie = "isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    
    setToken(null)
    setUser(null)
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
  }

  const updateProfile = async (username: string, profileUrl?: string) => {
    if (!token) {
      toast({
        title: "Authentication error",
        description: "You must be logged in to update your profile",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      const updatedUser = await authApi.updateProfile(token, username, profileUrl)
      setUser(updatedUser)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      })
    } catch (error) {
      console.error("Profile update failed:", error)
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const changePassword = async (oldPassword: string, newPassword: string) => {
    if (!token) {
      toast({
        title: "Authentication error",
        description: "You must be logged in to change your password",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      await authApi.changePassword(token, oldPassword, newPassword)
      toast({
        title: "Password changed",
        description: "Your password has been changed successfully",
      })
    } catch (error) {
      console.error("Password change failed:", error)
      toast({
        title: "Password change failed",
        description: error instanceof Error ? error.message : "Failed to change password",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user && !!token,
        login,
        guestLogin,
        logout,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
