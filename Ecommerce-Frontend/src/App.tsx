import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Loader from "./components/Loader";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { getUser } from "./redux/api/userAPI";
import { UserReducerInitialState } from "./types/reducer-types";
import ProtectedRoutes from "./components/ProtectedRoutes";

const Dashboard = lazy(() => import("./pages/adminPages/Dashboard"));
const Customers = lazy(() => import("./pages/adminPages/Customers"));
const Products = lazy(() => import("./pages/adminPages/Products"));
const Transaction = lazy(() => import("./pages/adminPages/Transaction"));
const NewProduct = lazy(
  () => import("./pages/adminPages/management/NewProduct")
);
const ProductManagement = lazy(
  () => import("./pages/adminPages/management/ProductManagement")
);
const TransactionManagement = lazy(
  () => import("./pages/adminPages/management/TransactionManagement")
);
const BarChart = lazy(() => import("./pages/adminPages/charts/BarChart"));
const PieChart = lazy(() => import("./pages/adminPages/charts/PieChart"));
const LineChart = lazy(() => import("./pages/adminPages/charts/LineChart"));
const StopWatch = lazy(() => import("./pages/adminPages/apps/StopWatch"));
const Coupon = lazy(() => import("./pages/adminPages/apps/Coupon"));
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Search = lazy(() => import("./pages/Search"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Login = lazy(() => import("./pages/Login"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));

const App = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      } else {
        dispatch(userNotExist());
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Header user={user} />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public-Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />

          {/* Not Logged in Route */}
          <Route
            path="/login"
            element={
              <ProtectedRoutes
                isAuthenticated={user ? false : true}
                redirect="/"
              >
                <Login />
              </ProtectedRoutes>
            }
          />

          {/* Logged-in user-routes */}
          <Route
            element={<ProtectedRoutes isAuthenticated={user ? true : false} />}
          >
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
          </Route>

          {/* Admin-Routes */}

          <Route
            element={
              <ProtectedRoutes
                isAuthenticated={true}
                adminOnly={true}
                admin={user?.role === "admin" ? true : false}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            {/* Charts */}
            <Route path="/admin/chart/bar" element={<BarChart />} />
            <Route path="/admin/chart/pie" element={<PieChart />} />
            <Route path="/admin/chart/line" element={<LineChart />} />
            {/* Apps */}
            <Route path="/admin/app/stopwatch" element={<StopWatch />} />
            <Route path="/admin/app/coupon" element={<Coupon />} />
            {/* Management */}
            <Route path="/admin/product/new" element={<NewProduct />} />
            <Route path="/admin/products/:id" element={<ProductManagement />} />
            <Route
              path="/admin/transaction/:id"
              element={<TransactionManagement />}
            />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
