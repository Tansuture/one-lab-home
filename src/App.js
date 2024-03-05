import './App.css';
import { createBrowserRouter, RouterProvider, BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import Add from './page/Add';
import List from './page/List';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/add",
      element: <Add/>
    },
    {
      path: "/list",
      element: <List/>
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Root page</div>}/>
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
