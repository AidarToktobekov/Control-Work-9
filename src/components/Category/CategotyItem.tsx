import { NavLink } from "react-router-dom";

interface Props{
    name: string;
    type: string;
    id: string;
    deleteCategory: ()=>void;
}

const CategoryItem:React.FC<Props> = ({name,type,id,deleteCategory})=>{

    let colorText;

    if(type === 'Income'){
        colorText = 'green';
    }else if(type === 'Expense'){
        colorText = 'red';
    }

    const onDelete = ()=>{
        deleteCategory();
    }

    return(
        <div className="list-group-item d-flex gap-3 align-items-center">
            <div className="">
                {name}
            </div>
            <div className="ms-auto me-5" style={{color: colorText}}>
                {type}
            </div>
            <NavLink to={'/categories-edit/' + id} className="btn btn-primary">
                Edit
            </NavLink>
            <button onClick={onDelete} className="btn btn-danger">
                Delete
            </button>
        </div>
    )
}

export default CategoryItem;