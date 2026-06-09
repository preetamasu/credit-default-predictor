import { createContext, useContext, useState } from 'react'
import { login as apiLogin, logout as apiLogout, register as apiRegister } from '../api/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(() => readStoredUser())

  const loginUser = async (credentials) => {
    const response = await apiLogin(credentials)
    const data = response.data ?? response
    const nextToken = data.token ?? data.accessToken ?? data.jwt
    const nextUser = data.user ?? data.customer ?? null

    if (!nextToken) {
      throw new Error('Login succeeded but no token was returned')
    }

    localStorage.setItem('token', nextToken)
    if (nextUser) localStorage.setItem('user', JSON.stringify(nextUser))
    setToken(nextToken)
    setUser(nextUser)
    return data
  }

  const registerUser = async (payload) => {
    const response = await apiRegister(payload)
    return response.data ?? response
  }

  const logoutUser = () => {
    apiLogout()
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  const value = {
    isAuthenticated: Boolean(token),
    token,
    user,
    loginUser,
    logoutUser,
    registerUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside AuthProvider')
  return value
}

function readStoredUser() {
  try {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  } catch {
    localStorage.removeItem('user')
    return null
  }
}

export default AuthProvider
