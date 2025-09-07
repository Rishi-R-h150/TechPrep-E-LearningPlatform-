
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import SignUp from './components/signupComp/SignUp';
import SignIn from './components/signinComp/SignIn';
import HomePage from './components/homePage/HomePage';
import Navbar from './components/navComp/NavBar';
import DSAPortal from './components/dsaPortalComp/DSAPortal';
import ProblemPage from './components/problemEditor/ProblemPage'
import LandingPg from './components/landingPg/LandingPg';
import ContestCreation from './components/contestcreationcomp/ContestCreation';
import ContestFetch from './components/contestdisplaypage/ContestDisplayPage'
import AllContestJoined from './components/activecontestcomp/ActiveContest'
import ProblemENV from './components/ProblemENVforCON/ProblemENV';
import CodeEditorForCON from './components/codeEditorforCON/CodeEditorForCON'
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/signin" />;
};

const App = () => {
  const location = useLocation(); 

  
  const noNavbarRoutes = ['/signup', '/signin','/','/contest/create'];

  return (
    <>
      {/* Render Navbar only if the current path is not in noNavbarRoutes */}
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        {/* Default route redirects to signup */}
        

        {/* SignUp and SignIn routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path = "/" element = {<LandingPg/>} />

        {/* Protected Home route - only accessible if the user is signed in */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dsa-portal" 
          element={
            <ProtectedRoute>
              <DSAPortal />
            </ProtectedRoute>
          } 
        />
        
        <Route
          path = "/dsa-portal/:topicSlug/:problemId" 
          element = {
            <ProtectedRoute>
              <ProblemPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path = "/contest/create" 
          element = {
            <ProtectedRoute>
              <ContestCreation/>
            </ProtectedRoute>
          }
        />
        <Route
          path = "/contest/display"
          element = {
            <ProtectedRoute>
              <ContestFetch/>
            </ProtectedRoute>
          }
        
        
        />
        <Route
          path = "/contest/joinedContest"
          element = {
            <ProtectedRoute>
              <AllContestJoined/>
            </ProtectedRoute>
          }
        
        
        />
        <Route
          path = "/contest/joinedContest/:contestID/environment"
          element = {
            <ProtectedRoute>
              <ProblemENV/>
            </ProtectedRoute>
          }
        
        
        />
        <Route
          path = "/contest/joinedContest/:contestID/environment/:problemNO"
          element = {
            <ProtectedRoute>
              <CodeEditorForCON/>
            </ProtectedRoute>
          }
        
        
        />




      </Routes>
      
    </>
  );
};

export default App;
