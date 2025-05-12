import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
// import ForgetPassword from './components/ForgetPassword';
import Users from './components/Users';
import Snbdata from './components/Snbdata';
import Dashboard from './components/Dashboard';
import AnimalDetail from './components/AnimalDetail';
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


      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
      {/* <Route path="/forgetpassword" element={<ForgetPassword />} /> */}
    </Routes>
  );
}

export default App;
