import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex-1">
          <Header />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
