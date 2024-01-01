import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatApp from "./pages/chatapp";

function App() {
  return (
    <>
      <BrowserRouter basename="/client">
        <Routes>
          <Route path="/" element={<ChatApp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
