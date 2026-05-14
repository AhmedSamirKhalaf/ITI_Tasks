import './App.css';
import LoginForm from './pages/addUser/login';
import Register from './pages/addUser/register';
import NavBar from './components/navBar';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'; 
import Home from './pages/home/home';
import Movie from './pages/movie/movie';
import { useState } from 'react';
import Fav from './pages/fav/pages/fav';

function App() {
  const [search, setSearch] = useState({ query: '' });

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar search={search} setSearch={setSearch} />
        <Switch>
          <Route path='/' exact><Redirect to='/home' /></Route> 
          <Route path='/home' exact>
            <Home search={search} setSearch={setSearch} />
          </Route>
          <Route path='/movie/:id' component={Movie} exact />
          <Route path='/signup' component={Register} exact />
          <Route path='/login' component={LoginForm} exact />
          <Route path='/fav' component={Fav} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;