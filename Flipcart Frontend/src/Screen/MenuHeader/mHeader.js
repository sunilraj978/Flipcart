import React,{useEffect} from 'react'
import './style.css'
import {useSelector,useDispatch} from 'react-redux'
import { CategoryList } from '../../action/CategoryAction'

const Mheader = () => {


    const category = useSelector(state=>state.category)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(CategoryList())
    },[])



    const displayCategory = (categories)=>{
        let myCategory = [];

        

        for(let category of categories){
            myCategory.push(
                <li key={category.name}>
                    {category.parentId ? <a href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>{category.name}</a>:
                    <span>{category.name}</span>
                    }
                    {category.children.length > 0?(<ul>
                        {displayCategory(category.children)}
                    </ul>):null}
                </li>
            )
        }
        return myCategory;
    }




    return (
        <div className="menuHeader">
            {category.categories.length>0 ? (<ul>
                {
                    displayCategory(category.categories)
                }
            </ul>):null}
        </div>
    )
}

export default Mheader
