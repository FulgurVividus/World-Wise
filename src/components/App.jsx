import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "../contexts/CitiesContext";
import { AuthProvider } from "../contexts/FakeAuthContext";
import ProtectedRoute from "../pages/ProtectedRoute";

import CityList from "./CityList";
import CountryList from "./CountryList";
import City from "./City";
import Form from "./Form";
import SpinnerFullPage from "./SpinnerFullPage";

// import Homepage from "../pages/Homepage";
// import Products from "../pages/Products";
// import Pricing from "../pages/Pricing";
// import Login from "../pages/Login";
// import AppLayout from "../pages/AppLayout";
// import PageNotFound from "../pages/PageNotFound";

const Homepage = lazy(() => import("../pages/Homepage"));
const Products = lazy(() => import("../pages/Products"));
const Pricing = lazy(() => import("../pages/Pricing"));
const Login = lazy(() => import("../pages/Login"));
const AppLayout = lazy(() => import("../pages/AppLayout"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="products" element={<Products />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
