import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import FormCategories from "../../components/Forms/FormCategories";
import { ApiCategory, ApiIncomeExpense } from "../../types";
import { fetchOneCategory, fetchOneIncomeExpense, updateCategory, updateIncomeExpense } from "../../store/financeThunks";
import { toast } from "react-toastify";
import { selectCategory, selectCategoryLoading, selectCategoryUpdate } from "../../store/categoriesSlice";
import Spinner from "../../components/Spinner/Spinner";
import { useEffect } from "react";
import { selectOneIncomeExpenseCreate, selectOneIncomeExpenseCreateLoading } from "../../store/incomeExpenseSlice";
import FormFinance from "../../components/Forms/FormFinance";

const FinanceEdit = ()=>{
    const navigate = useNavigate();
    const { id } = useParams() as { id: string };
    
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(fetchOneIncomeExpense(id));
    }, [dispatch, id]);
    const isFetching = useAppSelector(selectOneIncomeExpenseCreateLoading);
    const incomeExpense = useAppSelector(selectOneIncomeExpenseCreate)
    
    
    const onSubmit = async (finance: ApiIncomeExpense) => {
        try {
          await dispatch(updateIncomeExpense({ id, apiIncomeExpense: finance })).unwrap();
          navigate('/');
          toast.success('Finance updated!');
        } catch (e) {
          toast.error('Could not update Finance!');
        }
      };
    


    return(
        <>
        {isFetching && <Spinner />}
        {incomeExpense && (
          <FormFinance onSubmit={onSubmit} existingFinance={incomeExpense} isLoading={isFetching}/>
        )}
        </>
    )
}

export default FinanceEdit;