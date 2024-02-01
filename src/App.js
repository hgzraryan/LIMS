import Register from "./components/Register";
import Login from "./components//views/Login";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Home from "./components/views/Home";
import Users from "./components/views/Users";
import Layout from "./components/layouts/Layout";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import UserAdd from "./components/UserAdd";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Lounge from "./components/Lounge";
import LinkPage from "./components/LinkPage";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import MainTemplate from "./components/layouts/MainTemplate";

import Patients from "./components/views/Patients";
import Agents from "./components/views/Agents";
import Organizations from "./components/views/Organizations";
import Prices from "./components/views/Prices";
import DiscountCards from "./components/views/DiscountCards";
import Reagents from "./components/views/Reagents";
import Equipments from "./components/views/Equipments";
import ResearchLists from "./components/views/ResearchLists";
import Diagnostics from "./components/views/Diagnostics";
import Doctors from "./components/views/Doctors";
import PatientDetails from "./components/views/PatientDetails";

import { Routes, Route } from "react-router-dom";
import AddSample from "./components/views/AddSample";
import Samples from "./components/viewTables/SamplesTable";
//import React, { useState, useEffect } from "react";
//TODO add roles to constants,recover constants file, please
const ROLES = {
  User: 2001,
  Editor: 1984,
  Approver: 6010,
  Admin: 5150,
  Sampling: 1212,
};

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
          <Route element={<RequireAuth allowedRoles={[ROLES.Sampling]} />}>
            <Route  path="addsample" element={<AddSample />} />
              
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              
          </Route>
          <Route path="/" element={<MainTemplate />}>
            <Route index path="dashboard" element={<Home />} />

            <Route index path="/" element={<Home />} />
            <Route path="doctors" element={<Doctors />} />
            <Route  path="samples" element={<Samples />} />
            <Route path="agents" element={<Agents />} />
            <Route path="organizations" element={<Organizations />} />

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="patients" element={<Patients />} />
              <Route path="patients/:id" element={<PatientDetails/>} />
              <Route path="admin/useradd" element={<UserAdd />} />
              <Route path="users" element={<Users />} />
              <Route path="admin" element={<Admin />} />
              <Route path="settings/prices" element={<Prices />} />
              <Route
                path="settings/discountCards"
                element={<DiscountCards />}
              />
              <Route path="settings/reagents" element={<Reagents />} />
              <Route path="settings/equipments" element={<Equipments />} />
              <Route
                path="settings/researchlists"
                element={<ResearchLists />}
              />
              <Route path="researches" element={<Diagnostics />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
              <Route path="editor" element={<Editor />} />
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />
              }
            >
              <Route path="lounge" element={<Lounge />} />
            </Route>

            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
