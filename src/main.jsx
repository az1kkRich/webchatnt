import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'antd/dist/reset.css'; // Import Ant Design styles
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './components/auth/AuthLayout.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import ProtectedRoutes from './routes/ProtectedRoutes.jsx';
import Profile from './components/main/Profile.jsx';
import Group from './components/main/Group.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, theme } from 'antd';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            index: true,
            element: <Profile />
          },

          {
            path: "groups/:id",
            element: <Group />
          }
        ]
      }
    ]
  }
])

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider  theme={{ algorithm: theme.darkAlgorithm, }}>
        <RouterProvider router={router} />

      </ConfigProvider>

    </QueryClientProvider>
  </StrictMode>,
)
