import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from './components/Layout/Layout'
import { Route, Routes } from 'react-router-dom'
import Finance from './containers/Finance/Finance'
import Categories from './containers/Categories/Categories'
import FinanceAdd from './containers/Finance/FinanceAdd'
import EditCategoty from './containers/Categories/EditCategoty'
import AddCategoty from './containers/Categories/AddCategory'
import FinanceEdit from './containers/Finance/FinanceEdit'

const App = ()=> {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Finance />}/>
          <Route path="/finance-edit/:id" element={<FinanceEdit/>} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories-edit/:id" element={<EditCategoty/>} />
          <Route path="/categories/add" element={<AddCategoty/>} />
          <Route path="/add" element={<FinanceAdd/>} />
          <Route path="*" element={<h1>Not found!</h1>} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
