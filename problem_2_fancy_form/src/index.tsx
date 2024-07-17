import React from 'react'
import App from './App'
import './style.css';
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
