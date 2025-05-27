import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Login from './components/Login';
// import { AuthProvider } from './AuthContext';
import ForgetPassword from './components/ForgetPassword';
import Users from './components/Users';
import Snbdata from './components/Snbdata';
import Dashboard from './components/Dashboard';
import AnimalDetail from './components/AnimalDetail';
import LoginwithOTP from './components/LoginWithOTP';
function App() {
  return (
    <Routes>
      {/* Routes with Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="snbdata" element={<Snbdata />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/animalDetail" element={<AnimalDetail />} />
        <Route path="/users" element={<Users />} />
      </Route>

      <Route path="/loginwithOTP" element={<LoginwithOTP />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
    </Routes>
  );
}

export default App;
