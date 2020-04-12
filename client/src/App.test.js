import React from 'react';
import ReactDOM from "react-dom";
import { render } from '@testing-library/react';
import App from './App';
import Signup from './components/users/Signup';
import Signin from './components/users/Signin';
import HomePage from './components/HomePage';
import NavBar from './components/AppNavBar';
import configureMockStore from "redux-mock-store";


test('renders the App component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});


test('renders the HomePage component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HomePage />, div);
});


test('renders the HomePage header', () => {
  const { getByText } = render(<HomePage />);
  const header = getByText(/Ethan's Grocery Shopping App/i);
  expect(header).toBeInTheDocument();
});


test('renders the Signup component', () => {
  const mockStore = configureMockStore();
  const store = mockStore({});
  const div = document.createElement('div');
  ReactDOM.render(<Signup store={store} />, div);
});


test('renders the Signup header', () => {
  const mockStore = configureMockStore();
  const store = mockStore({});
  const { getByText } = render(<Signup store={store} />);
  const header = getByText(/Sign Up/i);
  expect(header).toBeInTheDocument();
});


test('renders the Signin component', () => {
  const mockStore = configureMockStore();
  const store = mockStore({});
  const div = document.createElement('div');
  ReactDOM.render(<Signin store={store} />, div);
});


 test('renders the Signin header ', () => {
   const mockStore = configureMockStore();
   const store = mockStore({});
   const { getByText } = render(<Signin store={store} />);
   const header = getByText(/Sign In/i);
   expect(header).toBeInTheDocument();
 });


test('renders the NavBar component', () => {
  const mockStore = configureMockStore();
  const store = mockStore({});
  const div = document.createElement('div');
  ReactDOM.render(<NavBar store={store} />, div);
});


test('renders the NavBar header', () => {
  const mockStore = configureMockStore();
  const store = mockStore({});
  const { getByText } = render(<NavBar store={store} />);
  const header = getByText(/Home/i);
  expect(header).toBeInTheDocument();
});
