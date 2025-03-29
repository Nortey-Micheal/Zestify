import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router'
import store, { persistor } from './redux/store.ts'
const Signup = lazy(() => import('./pages/signup.tsx'))
const Login = lazy(() => import('./pages/login.tsx'))
import { PersistGate } from 'redux-persist/integration/react'
import Recipe from './pages/recipe.tsx'
import VerifyEmail from './pages/verify-email.tsx'
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
  {
    path: '/recipe/:recipe_id',
    element: <Recipe />,
    errorElement: <NoPageFound />
  },
  {
    path: '/auth/verify-email',
    element: <VerifyEmail />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div>Loading ...</div>}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router}/>
        </PersistGate>
      </Suspense>
    </Provider>
  </StrictMode>
  ,
)
