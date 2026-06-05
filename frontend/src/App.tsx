import { useState } from 'react'
import {Routes, Route} from 'react-router'
import './App.css'
import Login from './components/Login.tsx'
import Create from './components/Create.tsx'
import Edit from './components/Edit.tsx'
import Delete from './components/Delete.tsx'


function App() {
  return (
    <>

      <Routes>
          <Route path="" element={<Login/>}/>
          <Route path="/edit:id" element={<Edit/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/delete:id" element={<Delete/>}/>
      </Routes>

   </>
  )
}

export default App
