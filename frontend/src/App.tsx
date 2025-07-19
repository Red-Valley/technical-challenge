import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import PatientList from './pages/PatientList'
import PatientForm from './pages/PatientForm'
import ProviderList from './pages/ProviderList'
import ProviderForm from './pages/ProviderForm'
import PatientStatusHistory from './pages/PatientStatusHistory'
import StatusList from './pages/StatusList'
import StatusForm from './pages/StatusForm'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/patients/new" element={<PatientForm />} />
        <Route path="/patients/:id/edit" element={<PatientForm />} />
        <Route path="/patients/:id/history" element={<PatientStatusHistory />} />
        <Route path="/providers" element={<ProviderList />} />
        <Route path="/providers/new" element={<ProviderForm />} />
        <Route path="/providers/:id/edit" element={<ProviderForm />} />
        <Route path="/statuses" element={<StatusList />} />
        <Route path="/statuses/new" element={<StatusForm />} />
        <Route path="/statuses/:id/edit" element={<StatusForm />} />
      </Routes>
    </Layout>
  )
}

export default App 