import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Paths } from "./types/enums";
const Home = lazy(() => import("./components/Home"));
const Other = lazy(() => import("./components/Other"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={Paths.HOME} element={<Home />} />
          <Route path={Paths.OTHER} element={<Other />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
