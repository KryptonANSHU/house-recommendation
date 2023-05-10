import './App.css';
import CreateLayout from './components/CreateLayout/CreateLayout';
import { Provider } from "react-redux";
import store from './redux/store';


function App(){
  return (
    <Provider store={store}>
      <CreateLayout />
    </Provider>
  );
}

export default App;
