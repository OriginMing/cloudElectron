import  React ,{useState,useEffect,useRef} from "react";
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import StyleLi from "../css/NavCss";
const Nav = ({files,activeId,unSaveIds,onTabClick,onTabClose})=>{

    return (
<ul class="nav nav-pills">
{files.map(file=>{
    const withUnSave = unSaveIds.includes(file.id)
    const fClass = classNames({
       'nav-link':true,
       'active':file.id==activeId,
       "withUnSave":withUnSave
    })
    return( <StyleLi className="nav-item" key={file.id} >
    <a className={fClass} aria-current="page" href="#" onClick={(e)=>{
        e.preventDefault();
        onTabClick(file.id) 
    }}>
        {file.title}
        <span className='mx-2 close'>
        <FontAwesomeIcon 
                    icon={faTimes}
                    onClick={(e)=>{e.stopPropagation();onTabClose(file.id)}}
                    />
                    
</span>

       {withUnSave &&    <span className='rounded-circle unsaved-icon mx-2 '></span>}
         
    </a>
  </StyleLi>)
})
}
 
</ul>

    )
}
export default Nav