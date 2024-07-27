import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from './components/Layout/Layout'
import { Route, Routes } from 'react-router-dom'
import Home from './containers/Home/Home'
import Categories from './containers/Categories/Categories'
import Add from './containers/Add/Add'
import EditCategoty from './containers/Categories/EditCategoty'
import AddCategoty from './containers/Categories/AddCategory'

const App = ()=> {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories-edit/:id" element={<EditCategoty/>} />
          <Route path="/categories/add" element={<AddCategoty/>} />
          <Route path="/add" element={<Add/>} />
          <Route path="*" element={<h1>Not found!</h1>} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
