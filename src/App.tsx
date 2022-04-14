import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Not from "./screens/Not";
import Sign from "./screens/Sign";
import Footer from "./screens/Footer";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import Add from "./screens/Add";

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div className="bg-slate-50 dark:bg-slate-400">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign" element={<Sign />} />
            <Route path="/add" element={<Add />} />
            <Route path="/*" element={<Not />} />
          </Routes>
          <Footer />
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
