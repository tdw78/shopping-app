import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';
import HomePage from './components/HomePage';
import { Route, Switch, BrowserRouter} from 'react-router-dom';
import Signin from './components/users/Signin';
import Signup from './components/users/Signup';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';

class App extends Component {


  render(){
    return (
      <Provider store={store}>
        <div className="App">
          <Navbar />

          <main>
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />
                <Route path="/list" component={ShoppingList} />
              </Switch>
            </BrowserRouter>
          </main>

        </div>
      </Provider>
    );
  }
}

export default App;