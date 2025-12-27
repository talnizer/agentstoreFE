import { Outlet } from "react-router-dom";
import "../../styles/Layout.css";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";
import { Suspense, useState } from "react";
import AuthUser from "./AuthUser";

export default function Layout() {
  const { getToken } = AuthUser();

  // const [isGuest, setIsGuest] = useState(false);
  var isGuest = true;

  if (getToken()) {
    // setIsGuest(true);
    isGuest = false;
  }

  // return <Auth />;
  return (
    <>
      <Header isGuest={isGuest} />
      <main className="layout">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
