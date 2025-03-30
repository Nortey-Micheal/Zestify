import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router'
import store, { persistor } from './redux/store.ts'
const Signup = lazy(() => import('./pages/signup.tsx'))
const Login = lazy(() => import('./pages/login.tsx'))
import { PersistGate } from 'redux-persist/integration/react'
const Recipe = lazy(() => import('./pages/recipe.tsx'))
const VerifyEmail = lazy(() => import('./pages/verify-email.tsx'))
const ViewRecipes = lazy(() => import('./pages/viewRecipes.tsx'))
const AllRecipes = lazy(() => import('./pages/allRecipes.tsx'))
const NewRecipes = lazy(() => import('./pages/newestRecipes.tsx'))
const PopularRecipes = lazy(() => import('./pages/popularRecipes.tsx'))
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
    element: <VerifyEmail />,
    errorElement: <NoPageFound />
  },
  {
    path: '/recipes',
    element: <ViewRecipes/>,
    errorElement: <NoPageFound />,
    children: [
      {
        path: '',
        element: <AllRecipes/>,
        errorElement: <NoPageFound />,
      },
      {
        path: 'new',
        element: <NewRecipes/>
      },
      {
        path: 'popular',
        element: <PopularRecipes/>
      }
    ]
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
