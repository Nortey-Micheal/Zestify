import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router'
import store, { persistor } from './redux/store.ts'
const Signup = lazy(() => import('./pages/user/signup.tsx'))
const Login = lazy(() => import('./pages/user/login.tsx'))
import { PersistGate } from 'redux-persist/integration/react'
const SearchRecipes = lazy(() => import('./pages/recipe/searchRecipe.tsx'))
const ProfilePage = lazy(() => import('./pages/user/withAuth/profilePage.tsx'))
const RecipeCategoryPage = lazy(() => import('./pages/recipe/categories.tsx'))
const Recipe = lazy(() => import('./pages/recipe/recipe.tsx'))
const VerifyEmail = lazy(() => import('./pages/user/verify-email.tsx'))
const ViewRecipes = lazy(() => import('./pages/recipe/viewRecipes.tsx'))
const AllRecipes = lazy(() => import('./pages/recipe/viewRecipe/allRecipes.tsx'))
const NewRecipes = lazy(() => import('./pages/recipe/viewRecipe/newestRecipes.tsx'))
const PopularRecipes = lazy(() => import('./pages/recipe/viewRecipe/popularRecipes.tsx'))
const AddRecipe = lazy(() => import('./pages/recipe/addRecipe.tsx'))
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
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    errorElement: <NoPageFound />
  },
  {
    path: '/categories',
    element: <RecipeCategoryPage />,
    errorElement: <NoPageFound />
  },
  {
    path: '/recipe-search',
    element: <SearchRecipes />,
    errorElement: <NoPageFound />
  },
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
