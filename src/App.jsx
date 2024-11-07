import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/comptes/Login'
import Categorie from './pages/admin/categorie/Categorie'
import Dashbord from './pages/admin/Dashbord'
import AdminLayout from './components/layout/LayoutAdmin'
import Produit from './pages/admin/produit/Produit'
import ProtectedRoute from './routing/ProtectedRoute'
import LayoutClient from './components/layout/LayoutClient'
import CartPage from './pages/CartPage'
import Client from './pages/admin/client/Client'
import Commande from './pages/admin/commande/Commande'
import Register from './pages/comptes/Register'
import LayoutComponent from './components/layout/LayoutComponent'
import ProduitPage from './pages/ProduitPage'
import BlogPage from './pages/BlogPage'
import Blog from './pages/admin/blog/Blog'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<LayoutComponent />}>
          <Route index element={<Home />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='panier' element={<CartPage />}></Route>
          <Route path='produits' element={<ProduitPage />}></Route>
          <Route path='blogs' element={<BlogPage />}></Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='admin' element={<AdminLayout />}>
            <Route path='dashboard' element={<Dashbord />}></Route>
            <Route path='categorie' element={<Categorie />}></Route>
            <Route path='produit' element={<Produit />}></Route>
            <Route path='client' element={<Client />}></Route>
            <Route path='commande' element={<Commande />}></Route>
            <Route path='blogs' element={<Blog />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App
