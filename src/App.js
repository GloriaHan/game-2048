import Gameboard from './components/Gameboard';
import Gameheader from './components/Gameheader';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers'
import './App.css';

const store = createStore(rootReducer)

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Gameheader/>
        <Gameboard/>
      </div>
    </Provider> 
  );
}

export default App;
