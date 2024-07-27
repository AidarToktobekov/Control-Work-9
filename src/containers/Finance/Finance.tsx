import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIncomesExpenses, selectIncomesExpensesLoading } from "../../store/incomeExpenseSlice";
import { deleteIncomeExpense, fetchIncomeExpense } from "../../store/financeThunks";
import Spinner from "../../components/Spinner/Spinner";
import IncomeExpenseItem from "../../components/IncomeExpence/IncomeExpenseItem";

const Finance = ()=>{

   const dispatch = useAppDispatch();
   const incomeExpense = useAppSelector(selectIncomesExpenses)
   const categoriesLoading = useAppSelector(selectIncomesExpensesLoading)

   useEffect(()=>{
       dispatch(fetchIncomeExpense())
   },[dispatch])

   const onDelete = async (id: string) => {
       await dispatch(deleteIncomeExpense(id));
       await dispatch(fetchIncomeExpense());
     };

   return(
      <>
         <div className="container">
            <div className="p-3 rounded-2 border border-2 fs-4" style={{width: 'fit-content'}}>
               Total: 
            </div>
            <div className="list-group">
            {categoriesLoading ? (
            <Spinner />
            ) : (
               incomeExpense.map((item) => (
                <IncomeExpenseItem
                    key={item.id}
                    id={item.id}
                    category={item.category}
                    amount={item.amount}
                    createdAt={item.createdAt}
                    deleteCategory={()=>onDelete(item.id)}
                />
            )))}
        </div>
         </div>
      </>
   ) 
}

export default Finance;