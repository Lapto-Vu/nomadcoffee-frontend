import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Not from "./screens/Not";
import Sign from "./screens/Sign";
import Footer from "./screens/Footer";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import Add from "./screens/Add";
import Nav from "./screens/Nav";
import { HelmetProvider } from "react-helmet-async";
import Shop from "./screens/Shop";
import Profile from "./screens/Profile";

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <HelmetProvider>
          <main className="font-main text-gray-700 dark:text-white">
            <Nav />
            <section className="h-fit bg-slate-50">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign" element={<Sign />} />
                <Route path="/add" element={<Add />} />
                <Route path="/shop/:id" element={<Shop />} />
                <Route path="/profile/:userid" element={<Profile />} />
                <Route path="/*" element={<Not />} />
              </Routes>
            </section>
            <Footer />
          </main>
        </HelmetProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
