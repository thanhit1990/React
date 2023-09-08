import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import App from './App.jsx'
import MyApp from './Models.jsx'
import Lava01 from './Lava01.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Lava01 />
  </React.StrictMode>,
)
