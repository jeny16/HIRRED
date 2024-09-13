import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/appLayout';
import Landing from './pages/landing'
import Onboarding from './pages/onboarding';
import MyJobs from './pages/myJobs';
import Joblisting from './pages/joblisting';
import Jobpage from './pages/jobPage';
import SavedJobs from './pages/savedJobs';
import PostJobs from './pages/postJobs';
import { ThemeProvider } from './components/ui/theme-provider';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Landing />
      },
      {
        path: '/onboarding',
        element: (
          <ProtectedRouter>
            <Onboarding />
          </ProtectedRouter>
        )
      },
      {
        path: '/jobs',
        element: (
          <ProtectedRouter>
            <Joblisting />
          </ProtectedRouter>
        )
      },
      {
        path: '/job/:id',
        element: (
          <ProtectedRouter>
            <Jobpage />
          </ProtectedRouter>
        )
      },
      {
        path: '/post-job',
        element: (
          <ProtectedRouter>
            <PostJobs />
          </ProtectedRouter>
        )
      },
      {
        path: '/saved-jobs',
        element: (
          <ProtectedRouter>
            <SavedJobs />
          </ProtectedRouter>
        )
      },
      {
        path: '/my-jobs',
        element: (
          <ProtectedRouter>
            <MyJobs />
          </ProtectedRouter>
        )
      }
    ]
  },
]);

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App
