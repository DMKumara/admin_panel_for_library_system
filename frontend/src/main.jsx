import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/*
 * Dammika's Note:
 * Welcome to the entry point of the app! This is where React grabs the 'root' div 
 * from our index.html and injects the entire application. I left StrictMode turned on 
 * because it's super helpful for catching bad lifecycle bugs during development.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
