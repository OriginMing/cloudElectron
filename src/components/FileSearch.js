import  React ,{useState,useEffect,useRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faTimes } from '@fortawesome/free-solid-svg-icons'
import useKeyPress from "../hooks/useKeyPress";
const FileSearch = ({title,onFileSearch})=>{
   const escPress = useKeyPress(27)
   const enterPress = useKeyPress(13)
    // eslint-disable-next-line 
   const [inputActive,setInputActive] =  useState(false);
    const [value,setValue] = useState("")
    const node = useRef(null);
    const closeSearch = ()=>{
       setValue('')
       setInputActive(false)
       onFileSearch('')
    }
    useEffect(()=>{
        if(escPress && inputActive){
            closeSearch()
        }
        if(enterPress && inputActive){
            onFileSearch(value)
               }  
         })
     /* const handleInputEvent = (event)=>{
       const {keyCode}  = event
       if(keyCode===13 && inputActive){
        onFileSearch(value)
       }else if(keyCode===27 && inputActive){
        closeSearch(event)
           }  
     }   
     document.addEventListener('keyup',handleInputEvent)
     return ()=>{
        document.removeEventListener('keyup',handleInputEvent)
     } */
   
    useEffect(()=>{
        if(inputActive){
            node.current.focus()
        }
    },[inputActive])
    return(
        <div className="alert alert-primary mb-0">
        {
            !inputActive && 
            <div className="d-flex justify-content-between align-items-center">
                <span>{title}</span>
                <button 
                className="icon-button" 
                onClick={()=>{setInputActive(true)}}
                >
                    <FontAwesomeIcon 
                    icon={faSearch}
                    size="lg"
                    />
                </button>
            </div>
        }{
            inputActive && 
            <div className="d-flex justify-content-between align-items-center mx-0" style={{height:"26px"}} >
                <input type="text" value={value} className='form-control'  ref={node} onChange={(e)=>{setValue(e.target.value)}}/>
                <button 
                className="icon-button" 
                onClick={(e)=>{closeSearch(e)}}
                >
                      <FontAwesomeIcon 
                    icon={faTimes}
                    size="lg"
                    />
                </button>
            </div>
        }
        </div>
    )
}
export default FileSearch