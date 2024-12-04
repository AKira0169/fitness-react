import { Outlet, useNavigation } from "react-router";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  // const isLoading = true;
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] gap-10">
      {isLoading && <Loader />}
      <Header />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
