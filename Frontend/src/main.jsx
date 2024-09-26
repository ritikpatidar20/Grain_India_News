import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget this!
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        zIndex: 9999,
                    },
                }}
            />
    <ToastContainer />
  </StrictMode>,
)
