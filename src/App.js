import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from "./components/Header";
import Productos from "./components/Productos";
import NuevoProducto from './components/NuevoProducto';
import EditarProducto from './components/EditarProducto';

//import Redux
import { Provider } from 'react-redux'
import store from './Store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header/>
        <div className="container">
            <Routes>
                <Route path='/' element={ <Productos /> }></Route>
                <Route path='/productos/nuevo' element={ <NuevoProducto /> }></Route>
                <Route path='/productos/editar/:id' element={ <EditarProducto /> }></Route>
            </Routes>
        </div>
      </Provider>
     </BrowserRouter>
  );
}

export default App;
