import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  redirect,
} from 'react-router-dom';

const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const ProductsPage = lazy(() => import('../pages/ProductsPage/ProductsPage'));
const ProductDetailsPage = lazy(
  () => import('../pages/ProductDetailsPage/ProductDetailsPage'),
);

function loginLoader() {
  const token = localStorage.getItem('token');
  if (token) {
    return redirect('/products');
  }
  return null;
}

function protectedLoader() {
  const token = localStorage.getItem('token');
  if (!token) {
    return redirect('/');
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    loader: loginLoader,
  },
  {
    loader: protectedLoader,
    children: [
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/products/:id',
        element: <ProductDetailsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
