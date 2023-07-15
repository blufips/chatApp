// CSS
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

// MODULE
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// ROUTES
import Route from './routes/Route';

export default function App() {
  const router = createBrowserRouter([Route]);
  return (
    <div className='App'>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}
