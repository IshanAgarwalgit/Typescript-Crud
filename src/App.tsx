import React from 'react';
import './App.css';
import AddEdit from './Components/AddEdit';
import { StoreProvider } from "easy-peasy";
import store from './Redux/store';

function App() {
  return (
    <StoreProvider store={store}>
    <div className='App'>
      <AddEdit/>
    </div>
    </StoreProvider>
  );
}

export default App;
