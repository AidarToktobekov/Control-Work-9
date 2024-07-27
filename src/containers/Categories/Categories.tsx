import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteCategory, fetchCategory } from "../../store/financeThunks";
import { selectCategories, selectCategoriesLoading } from "../../store/categoriesSlice";
import Spinner from "../../components/Spinner/Spinner";
import CategoryItem from "../../components/Category/CategotyItem";
import { NavLink } from "react-router-dom";

const Categories = ()=>{

    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories)
    const categoriesLoading = useAppSelector(selectCategoriesLoading)

    useEffect(()=>{
        dispatch(fetchCategory())
    },[dispatch])

    const onDelete = async (id: string) => {
        await dispatch(deleteCategory(id));
        await dispatch(fetchCategory());
      };

    return(
     <div className="container">
        <div className="d-flex justify-content-between my-3">
            <h3>
                Categories
            </h3>
            <NavLink to='/categories/add' className="btn btn-dark">
                Add Category
            </NavLink>
        </div>
        <div className="list-group">
            {categoriesLoading ? (
            <Spinner />
            ) : (
                categories.map((category) => (
                <CategoryItem
                    key={category.id}
                    id={category.id}
                    name={category.name}
                    type={category.type}
                    deleteCategory={()=>onDelete(category.id)}
                />
            )))}
        </div>
     </div>
    ) 
 }
 
 export default Categories;