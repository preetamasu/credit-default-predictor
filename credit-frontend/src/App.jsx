import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import Applications from './pages/Applications'
import Prediction from './pages/Prediction'
import Predict from './pages/Predict'
import UiProvider from './contexts/UiProvider'
// Using Tailwind + minimal custom CSS in `src/index.css`

function App() {
  return (
    <Router>
      <UiProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/predict" element={<Predict />} />
          </Routes>
        </Layout>
      </UiProvider>
    </Router>
  )
}

export default App
