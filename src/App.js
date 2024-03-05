

import { Routes, Route } from "react-router-dom";
import {LOGIN_ROUTE,
  PRIVACY_POLICY_ROUTE,
  REGISTER_ROUTE,
  LINKPAGE_ROUTE,
  UNAUTHORIZED_ROUTE,
  EDITOR_ROUTE,
  LOUNGE_ROUTE,
  ADMIN_ROUTE,
  ADD_SAMPLE_ROUTE,
  HOME_ROUTE,
  USERS_ROUTE,
  DOCTORS_ROUTE,
  SAMPLES_ROUTE,
  AGENTS_ROUTE,
  ORGANIZATIONS_ROUTE,
  PATIENTS_ROUTE,
  PATIENTS_ID_ROUTE,
  DISCOUNT_CARDS_ROUTE,
  REAGENTS_ROUTE,
  EQUIPMENTS_ROUTE,
  DIAGNOSTICS_ROUTE,
  RESEARCH_LISTS_ROUTE,
  MISSING_ROUTE,
  DOCTORS_ID_ROUTE,
REFDOCTORS_ROUTE,
MEDINSTITUTIONS_ROUTE,
SUPPORT_URL,
DIAGNOSTICS_ID_ROUTE,
DOCTORSVISITS_ROUTE,
DOCTORSVISITS_ID_ROUTE,
USERS_ID_ROUTE} from '../src/utils/constants' 
import { lazy, Suspense } from "react";
import DoctorDetails from "./components/views/DoctorDetails";
import Support from "./components/views/Support";
import DiagnosticsDetails from "./components/views/DiagnosticsDetails";
import DoctorsVisits from "./components/views/DoctorsVisits";
import DoctorsVisitsDetails from "./components/views/DoctorsVisitsDetails";
import UserDetails from "./components/views/UserDetails";

 const Register = lazy(()=>  import("./components/Register"));
 const Login = lazy(()=>  import("./components//views/Login"));
 const PrivacyPolicy = lazy(()=>  import("./components/PrivacyPolicy"));
 const Home = lazy(()=>  import("./components/views/Home"));
 const Users = lazy(()=>  import("./components/views/Users"));
 const Layout = lazy(()=>  import("./components/layouts/Layout"));
 const Editor = lazy(()=>  import("./components/Editor"));
 const Admin = lazy(()=>  import("./components/Admin"));
 const UserAdd = lazy(()=>  import("./components/UserAdd"));
 const Missing = lazy(()=>  import("./components/Missing"));
 const Unauthorized = lazy(()=>  import("./components/Unauthorized"));
 const Lounge = lazy(()=>  import("./components/Lounge"));
 const LinkPage = lazy(()=>  import("./components/LinkPage"));
 const RequireAuth = lazy(()=>  import("./components/RequireAuth"));
 const PersistLogin = lazy(()=>  import("./components/PersistLogin"));
 const MainTemplate = lazy(()=>  import("./components/layouts/MainTemplate"));
 const Patients = lazy(()=>  import("./components/views/Patients"));
 const Agents = lazy(()=>  import("./components/views/Agents"));
 const Organizations = lazy(()=>  import("./components/views/Organizations"));
 const Prices = lazy(()=>  import("./components/views/Prices"));
 const DiscountCards = lazy(()=>  import("./components/views/DiscountCards"));
 const Reagents = lazy(()=>  import("./components/views/Reagents"));
 const Equipments = lazy(()=>  import("./components/views/Equipments"));
 const ResearchLists = lazy(()=>  import("./components/views/ResearchLists"));
 const Diagnostics = lazy(()=>  import("./components/views/Diagnostics"));
 const Doctors = lazy(()=>  import("./components/views/Doctors"));
 const RefDoctors = lazy(()=>  import("./components/views/RefDoctors"));
 const MedInstitutions = lazy(()=>  import("./components/views/MedInstitutions"));
 const PatientDetails = lazy(()=>  import("./components/views/PatientDetails"));
 const AddSample = lazy(()=>  import("./components/views/AddSample"));
 const Samples = lazy(()=>  import("./components/viewTables/SamplesTable"));
 

//import React, { useState, useEffect } from "react";
//TODO add roles to constants,recover constants file, please
const ROLES = {
  User: 2001,
  Editor: 1984,
  Approver: 3345,
  Admin: 5150,
  Sampler: 1212,
  Doctor:9578,
};

function App() {
  return (
      <Suspense fallback={<h1>Loading...</h1>}>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path={LOGIN_ROUTE} element={<Login />} />
        <Route path={PRIVACY_POLICY_ROUTE} element={<PrivacyPolicy />} />
        <Route path={REGISTER_ROUTE} element={<Register />} />
        <Route path={LINKPAGE_ROUTE} element={<LinkPage />} />
        <Route path={UNAUTHORIZED_ROUTE} element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.Sampler]} />}>
            <Route  path={ADD_SAMPLE_ROUTE} element={<AddSample />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Sampler, ROLES.Admin]} />}>
            <Route path={USERS_ID_ROUTE} element={<UserDetails />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              
          </Route>
          <Route path="/" element={<MainTemplate />}>
            <Route index path={HOME_ROUTE} element={<Home />} />
            <Route index path={SUPPORT_URL} element={<Support />} />

            <Route index path="/" element={<Home />} />
            <Route path={DOCTORS_ROUTE} element={<Doctors />} />
            <Route path={DOCTORS_ID_ROUTE} element={<DoctorDetails/>} />

            <Route path={DOCTORSVISITS_ROUTE} element={<DoctorsVisits />} />
            <Route path={DOCTORSVISITS_ID_ROUTE} element={<DoctorsVisitsDetails/>} />

            <Route  path={SAMPLES_ROUTE} element={<Samples />} />
            <Route path={AGENTS_ROUTE} element={<Agents />} />
            <Route path={ORGANIZATIONS_ROUTE} element={<Organizations />} />

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path={PATIENTS_ROUTE} element={<Patients />} />
              <Route path={PATIENTS_ID_ROUTE} element={<PatientDetails/>} />
              {/* <Route path="admin/useradd" element={<UserAdd />} /> */}
              <Route path={USERS_ROUTE} element={<Users />} />
              <Route path={ADMIN_ROUTE} element={<Admin />} />
              {/* <Route path="settings/prices" element={<Prices />} /> */}
              <Route
                path={DISCOUNT_CARDS_ROUTE}
                element={<DiscountCards />}
              />
              <Route path={REAGENTS_ROUTE} element={<Reagents />} />
              <Route path={EQUIPMENTS_ROUTE} element={<Equipments />} />
              <Route
                path={RESEARCH_LISTS_ROUTE}
                element={<ResearchLists />}
              />
              <Route path={DIAGNOSTICS_ROUTE} element={<Diagnostics />} />
              <Route path={DIAGNOSTICS_ID_ROUTE} element={<DiagnosticsDetails/>} />
              <Route path={REFDOCTORS_ROUTE} element={<RefDoctors />} />
              <Route path={MEDINSTITUTIONS_ROUTE} element={<MedInstitutions />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
              <Route path={EDITOR_ROUTE} element={<Editor />} />
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />
              }
            >
              <Route path={LOUNGE_ROUTE} element={<Lounge />} />
            </Route>

            {/* catch all */}
            <Route path={MISSING_ROUTE} element={<Missing />} />
          </Route>
        </Route>
      </Route>
    </Routes>
      </Suspense>
  );
}

export default App;
