import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { fetchOneCategory } from "../../store/financeThunks";
import { minusTotal, plusTotal, selectIncomeExpense } from "../../store/incomeExpenseSlice";

interface Props{
    amount: number;
    category: string;
    id: string;
    deleteCategory: ()=>void;
    createdAt: string;
}

const IncomeExpenseItem:React.FC<Props> = ({ amount,category,id,deleteCategory,createdAt})=>{

    const dispatch = useAppDispatch();
    const oneCategory = useAppSelector(selectIncomeExpense);

    useEffect(()=>{
        dispatch(fetchOneCategory(category))
    },[dispatch]);

    let money = null;

    if(oneCategory[category]?.type === 'Income'){
        money = (
            <div className="text-success">
                +{amount}KGS
            </div>
        )
    }else if(oneCategory[category]?.type === 'Expense'){
        money = (
            <div className="text-danger">
                -{amount}KGS
            </div>
        )
    }

    const date = new Date(createdAt);

    const addZero = (date: number)=>{
        if(String(date).length < 2){
            return('0' + String(date))
        }else{
            return(String(date))
        }
    }

    const onDelete = ()=>{
        deleteCategory();
    }

    return(
        <div className="list-group-item d-flex gap-4 align-items-center">
            <div className="d-flex gap-2 align-items-center">
                <span className="fs-4 fw-semibold">
                    {addZero(date.getHours())}:{addZero(date.getMinutes())}
                </span>
                
                <span className="fs-7">
                    {addZero(date.getDate())}.{addZero(date.getMonth() + 1)}.{date.getFullYear()}
                </span>
            </div>
            <div className="fs-4 fw-semibold">
                {oneCategory[category]?.name}
            </div>
            <div className="ms-auto me-5 fs-5 fw-semibold">
                {money}
            </div>
            <NavLink to={'/finance-edit/' + id} className="btn btn-primary">
                Edit
            </NavLink>
            <button onClick={onDelete} className="btn btn-danger">
                Delete
            </button>
        </div>
    )
}

export default IncomeExpenseItem;