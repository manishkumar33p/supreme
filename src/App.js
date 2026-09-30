// import Home from "./Home/Home";

// function App() {
//   return <Home />;
// }

// export default App;


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./Home/Home";
import Checkout from "./Checkout/Checkout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/checkout"
          element={<Checkout />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;