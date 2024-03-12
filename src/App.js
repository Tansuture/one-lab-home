import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import Home from "./page/Home";
import Add from "./page/Add";
import List from "./page/List";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/add",
      element: <Add />,
    },
    {
      path: "/list",
      element: <List />,
    },
  ]);

  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
