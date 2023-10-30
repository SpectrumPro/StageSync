import Aside from "./components/aside";
import Navbar from "./components/navbar";

const Index = () => {
  return (
    <div class="">
      {Navbar("Dashboard")}

      <Aside></Aside>

      <main class="p-4 md:ml-64 h-auto pt-20"></main>
    </div>
  );
};

export default Index;
