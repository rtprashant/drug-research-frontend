import { StrictMode } from 'react'
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
import Message from './components/custom-ui/Message.jsx';
import Research from './components/custom-ui/research/Research.jsx';
import Setting from './components/custom-ui/Setting.jsx';
import Login from './components/custom-ui/auth/Login.jsx';
import GenrateMolecule from './components/custom-ui/GenrateMolecule.jsx';
import LoginAck from './components/custom-ui/LoginAck.jsx';
import { store } from './redux/store.js';
import { Provider, useSelector } from 'react-redux';
import { Toaster} from 'sonner'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import MyProfile from './components/custom-ui/MyProfile.jsx';

const persistor = persistStore(store)
const AppRouter = function(){
  const {user} = useSelector(state=>state.auth)
  const router = createBrowserRouter([
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
          element: user ? <Navigate to="/" replace /> : <Login />,
        },
        {
          path: "/",
          element:user ?<Dashboard/> :<LoginAck/>,
        },{
          path: "/myProfile",
          element:user?<MyProfile/>:<LoginAck/>,
        },
  
        {
          path: "/moleculebank",
          element: user ? <MoleculeBank/>:<LoginAck/>
        },
        {
          path: "/message",
          element: user ? <Message />:<LoginAck/>,
        },
        {
          path: "research",
          element: user ?  <Research /> :<LoginAck/>,
        },
        {
          path: "/settings",
          element: user ?<Setting /> :<LoginAck/>,
        },
        {
          path: "/genratemolecule",
          element: user ? <GenrateMolecule /> :<LoginAck/>,
        }
  
      ]
    },
  ]);
  return <RouterProvider router={router} />;

}



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}> 
        <AppRouter/>
      <Toaster/>
       </PersistGate> 
    </Provider>
  </StrictMode>,
)
