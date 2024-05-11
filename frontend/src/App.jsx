import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import TodoForm from "./components/Todoform"

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/getall" element=<Home/> />
      <Route path="/createtodo" element=<TodoForm/> />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
