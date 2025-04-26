import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import StoreOwnerDashboard from './components/StoreOwnerDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <ProtectedRoute path="/admin" component={AdminDashboard} roles={['admin']} />
        <ProtectedRoute path="/user" component={UserDashboard} roles={['user']} />
        <ProtectedRoute path="/store" component={StoreOwnerDashboard} roles={['store_owner']} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;