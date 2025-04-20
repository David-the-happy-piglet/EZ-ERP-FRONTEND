import './App.css'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './EZ-ERP/store'
import EZ_ERP from './EZ-ERP'
import Login from './EZ-ERP/Login'

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/Login" />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Overview" element={<EZ_ERP />} />
            <Route path="/*" element={<EZ_ERP />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  )
}

export default App
