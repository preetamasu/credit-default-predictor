import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import AuthRequired from './components/AuthRequired'
import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import Applications from './pages/Applications'
import Predict from './pages/Predict'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthProvider from './contexts/AuthProvider'
import UiProvider from './contexts/UiProvider'
// Using Tailwind + minimal custom CSS in `src/index.css`

function App() {
  return (
      <Router>
        <AuthProvider>
          <UiProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/customers" element={<AuthRequired><Customers /></AuthRequired>} />
                <Route path="/applications" element={<AuthRequired><Applications /></AuthRequired>} />
                <Route path="/predict" element={<AuthRequired><Predict /></AuthRequired>} />
              </Routes>
            </Layout>
          </UiProvider>
        </AuthProvider>
      </Router>
  )
}

export default App
