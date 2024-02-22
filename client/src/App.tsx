import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage.tsx'
// @ts-ignore
import LoginPage from './pages/LoginPage.tsx'
// @ts-ignore
import RegisterPage from './pages/RegisterPage.tsx'
import Layout from './components/Layout.tsx'
import axios from 'axios';
import { UserContextProvider } from './contexts/UserContext.tsx'
import AccountPage from './pages/AccountPage.tsx'
import PlacesPage from './pages/PlacesPage.tsx'
import SinglePlacePage from './pages/SinglePlacePage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
     <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path="/account" element={<ProfilePage />} />
        <Route path="/account/:subpage?" element={<AccountPage />} />
        <Route path="/account/:subpage/:action" element={<AccountPage />} />
        <Route path="/account/places/:id" element={<PlacesPage />} />
        <Route path="/place/:name" element={<SinglePlacePage />} />
      </Route>
     </Routes>
     </UserContextProvider>
  )
}

export default App
