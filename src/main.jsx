import { StrictMode , Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './components/custom-ui/dashboard/Dashboard.jsx';
import Signup from './components/custom-ui/auth/Signup.jsx';
import MoleculeBank from './components/custom-ui/moleculeBank/MoleculeBank.jsx';
import Message from './components/custom-ui/message/Message.jsx';
import Research from './components/custom-ui/research/Research.jsx';
import Login from './components/custom-ui/auth/Login.jsx';
import GenrateMolecule from './components/custom-ui/moleculeGenration/GenrateMolecule.jsx';
import LoginAck from './components/custom-ui/LoginAck.jsx';
import { store } from './redux/store.js';
import { Provider, useSelector } from 'react-redux';
import { Toaster } from 'sonner'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import MyProfile from './components/custom-ui/MyProfile.jsx';
// import GenratedMoleculesHistory from './components/custom-ui/moleculeGenration/GenratedMoleculesHistory.jsx';
import ChatContent from './components/custom-ui/message/ChatContent.jsx';
import Setting from './components/custom-ui/settings/Setting.jsx';
import AdminDashboard from './components/custom-ui/admin/AdminDashboard.jsx';
import Skelton from './components/custom-ui/moleculeGenration/Skelton.jsx';
const GenratedMoleculesHistory = lazy(() => import('./components/custom-ui/moleculeGenration/GenratedMoleculesHistory.jsx'))
const persistor = persistStore(store)
const AppRouter = function () {
  const { loggedInUser } = useSelector(state => state.login)
  const adminRouter = createBrowserRouter([
    {
      path: "",
      element: <App />,
      children: [
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/",
          element: loggedInUser ? <AdminDashboard /> : <LoginAck />,
        }, {
          path: "/myProfile",
          element: loggedInUser ? <MyProfile /> : <LoginAck />,
        },

        {
          path: "/moleculebank",
          element: loggedInUser ? <MoleculeBank /> : <LoginAck />
        },
        {
          path: "/message",
          element: loggedInUser ? <Message /> : <LoginAck />,
          children: [
            {
              path: "/message/:groupName",
              element: loggedInUser ? <ChatContent /> : <LoginAck />
            }
          ]
        },
        {
          path: "research",
          element: loggedInUser ? <Research /> : <LoginAck />,
        },
        {
          path: "/settings",
          element: loggedInUser ? <Setting /> : <LoginAck />,
        },
        {
          path: "/genratemolecule",
          element: loggedInUser ? <GenrateMolecule /> : <LoginAck />,

        },
        {
          path: "/molecule-genration-history",
          element: loggedInUser ? <Suspense fallback={Skelton}><GenratedMoleculesHistory /> </Suspense>: <LoginAck />,
        }

      ]
    },
  ]);

  const researcherRouter = createBrowserRouter([
    {
      path: "",
      element: <App />,
      children: [
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/",
          element: loggedInUser ? <Dashboard /> : <LoginAck />,
        }, {
          path: "/myProfile",
          element: loggedInUser ? <MyProfile /> : <LoginAck />,
        },

        {
          path: "/moleculebank",
          element: loggedInUser ? <MoleculeBank /> : <LoginAck />
        },
        {
          path: "/message",
          element: loggedInUser ? <Message /> : <LoginAck />,
          children: [
            {
              path: "/message/:groupName",
              element: loggedInUser ? <ChatContent /> : <LoginAck />
            }
          ]
        },
        {
          path: "research",
          element: loggedInUser ? <Research /> : <LoginAck />,
        },
        {
          path: "/settings",
          element: loggedInUser ? <Setting /> : <LoginAck />,
        },
        {
          path: "/genratemolecule",
          element: loggedInUser ? <GenrateMolecule /> : <LoginAck />,

        },
        {
          path: "/molecule-genration-history",
          element: loggedInUser ? <GenratedMoleculesHistory /> : <LoginAck />,
        }

      ]
    },
  ]);
  return <RouterProvider router={loggedInUser?.role === "admin" ? adminRouter : researcherRouter} />;
}



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AppRouter />
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
