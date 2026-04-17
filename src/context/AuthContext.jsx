import { createContext, useContext, useState, useEffect } from 'react'
import { mockUser } from '../data/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('ln_user')
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch {}
    }
  }, [])

  const login = (email, _password) => {
    const userData = { ...mockUser, email }
    setUser(userData)
    localStorage.setItem('ln_user', JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('ln_user')
  }

  const register = (data) => {
    const userData = { ...data }
    setUser(userData)
    localStorage.setItem('ln_user', JSON.stringify(userData))
    return true
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
