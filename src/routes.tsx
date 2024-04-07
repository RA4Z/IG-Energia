import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from "react";

import { Box, LinearProgress } from '@mui/material';
import DefaultPage from 'components/DefaultPage';

const HomePage = lazy(() => import('pages/Homepage'))
const NotFound = lazy(() => import('pages/NotFound'))
const Login = lazy(() => import('pages/Login'))
const Admin = lazy(() => import('pages/Admin'))

export default function AppRouter() {
  return (
    <>
      <Router>
        <Suspense fallback={<Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>}>
          <Routes>
            <Route path='/' element={<DefaultPage />}>
              <Route index element={<HomePage />} />
              <Route path='/Admin' element={<Admin />} />
              <Route path='/Login' element={<Login />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}
