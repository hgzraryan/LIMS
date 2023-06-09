import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
// import Register from './components/Register';
 //import Login from './components/Login';
 //import PrivacyPolicy from './components/PrivacyPolicy';
// import Home from './components/Home';
// import Users from './components/Users';
// import Editor from './components/Editor';
// import Admin from './components/Admin';
// import UserAdd from './components/UserAdd';
// import Missing from './components/Missing';
// import Unauthorized from './components/Unauthorized';
// import Lounge from './components/Lounge';
// import LinkPage from './components/LinkPage';
// import RequireAuth from './components/RequireAuth';
// import PersistLogin from './components/PersistLogin';
// import MainTemplate from './components/layouts/MainTemplate';

// import Clients from './components/views/Clients';
// import Agents from './components/views/Agents';
// import Organizations from './components/views/Organizations';


import { lazy } from 'react';
const Register = lazy(() => import('./components/Register'));
const Login = lazy(() => import('./components/Login'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const Home = lazy(() => import('./components/Home'));
const Users = lazy(() => import('./components/Users'));
const Editor = lazy(() => import('./components/Editor'));
const Admin = lazy(() => import('./components/Admin'));
const UserAdd = lazy(() => import('./components/UserAdd'));
const Missing = lazy(() => import('./components/Missing'));
const Unauthorized = lazy(() => import('./components/Unauthorized'));
const Lounge = lazy(() => import('./components/Lounge'));
const LinkPage = lazy(() => import('./components/LinkPage'));
const RequireAuth = lazy(() => import('./components/RequireAuth'));
const PersistLogin = lazy(() => import('./components/PersistLogin'));
const MainTemplate = lazy(() => import('./components/layouts/MainTemplate'));

const Clients = lazy(() => import('./components/views/Clients'));
const Agents = lazy(() => import('./components/views/Agents'));
const Organizations = lazy(() => import('./components/views/Organizations'));

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Approver': 6010,
  'Admin': 5150,
}

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
 


        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<MainTemplate />} >
              
              
              
              <Route index element={<Home />} />
              <Route path="agents" element={<Agents />} />
              <Route path="organizations" element={<Organizations />} />

              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="clients" element={<Clients />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="users" element={<Users />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
                <Route path="editor" element={<Editor />} />
              </Route>


              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="admin" element={<Admin />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="admin/useradd" element={<UserAdd />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
                <Route path="lounge" element={<Lounge />} />
              </Route>
              
              {/* catch all */}
              <Route path="*" element={<Missing />} />
            </Route>


            </Route>
          </Route>

          

          

      </Route>
    </Routes>
  );
}

export default App;