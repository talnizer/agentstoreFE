import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import Layout from "./Components/Common/Layout";
import MessageContext from "./contexts/MessageContext";
import Page404 from "./pages/Page404";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./styles/common.css";
import "./styles/jumbotron.css";

function App() {
  const [message, setMessage] = useState("");
  const router = createBrowserRouter([
    {
      // parent route component
      element: <Layout />,
      // child route components
      // your custom routing error component
      errorElement: <Page404 />,

      children: routes,
    },
  ]);
  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {/* <ToastContainer /> */}
      <RouterProvider router={router} />
    </MessageContext.Provider>
  );
}

export default App;
