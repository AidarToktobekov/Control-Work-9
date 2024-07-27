import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import FormCategories from "../../components/Forms/FormCategories";
import { ApiCategory } from "../../types";
import { fetchOneCategory, updateCategory } from "../../store/financeThunks";
import { toast } from "react-toastify";
import { selectCategory, selectCategoryLoading, selectCategoryUpdate } from "../../store/categoriesSlice";
import Spinner from "../../components/Spinner/Spinner";
import { useEffect } from "react";

const EditCategoty = ()=>{
    const navigate = useNavigate();
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(fetchOneCategory(id));
    }, [dispatch, id]);
    const isFetching = useAppSelector(selectCategoryLoading);
    const category = useAppSelector(selectCategory)
    
    const isUpdating = useAppSelector(selectCategoryUpdate);

    const onSubmit = async (apiCategory: ApiCategory) => {
        try {
          await dispatch(updateCategory({ id, apiCategory })).unwrap();
          navigate('/categories');
          toast.success('Category updated!');
        } catch (e) {
          toast.error('Could not update Category!');
        }
      };
    


    return(
        <>
        {isFetching && <Spinner />}
        {category && (
          <FormCategories
            onSubmit={onSubmit}
            existingCategory={category}
            isLoading={isUpdating}
          />
        )}
        </>
    )
}

export default EditCategoty;