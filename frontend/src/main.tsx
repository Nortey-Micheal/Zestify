import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router'
import store from './redux/store.ts'
import Signup from './pages/signup.tsx'
import Login from './pages/login.tsx'
const AddRecipe = lazy(() => import('./pages/addRecipe.tsx'))
const Home = lazy(() => import('./pages/homePage.tsx'))
const NoPageFound = lazy(() => import('./pages/404.tsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NoPageFound />
  },
  {
    path: '/add-recipe',
    element: <AddRecipe />,
    errorElement: <NoPageFound />
  },
  {
    path: '/auth/signup',
    element: <Signup />,
    errorElement: <NoPageFound />
  },
  {
    path: '/auth/login',
    element: <Login />,
    errorElement: <NoPageFound />
  },
])

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading ...</div>}>
      <StrictMode>
        <RouterProvider router={router}/>
      </StrictMode>
    </Suspense>
  </Provider>
  ,
)
