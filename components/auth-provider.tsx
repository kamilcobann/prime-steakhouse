"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo credentials - in a real app, this would be handled by a backend
const DEMO_CREDENTIALS = {
  username: "admin",
  password: "steakhouse123",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const authToken = localStorage.getItem("steakhouse-auth")
    if (authToken === "authenticated") {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = (username: string, password: string): boolean => {
    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
      setIsAuthenticated(true)
      localStorage.setItem("steakhouse-auth", "authenticated")
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("steakhouse-auth")
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
