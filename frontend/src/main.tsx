import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
const Home = lazy(() => import('./pages/homePage.tsx'))
const NoPageFound = lazy(() => import('./pages/404.tsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NoPageFound />
  },
])

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<div>Loading ...</div>}>
    <StrictMode>
      <RouterProvider router={router}/>
    </StrictMode>
  </Suspense>
  ,
)
