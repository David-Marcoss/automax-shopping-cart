import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { RoutesApp } from "./router";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-background w-[100vw] h-[100vh]">
        <RoutesApp />

        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
