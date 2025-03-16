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
            <Route path="/" element={<Navigate to="/EZERP/Overview" />} />
            <Route path="EZERP/*" element={<EZ_ERP />} />
            <Route path="EZERP/Login" element={<Login />} />

          </Routes>
        </div>
      </Provider>
    </HashRouter>
  )
}

export default App
