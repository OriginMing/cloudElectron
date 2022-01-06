import  React ,{useState,useEffect,useRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash ,faTimes} from '@fortawesome/free-solid-svg-icons'
import {faMarkdown} from "@fortawesome/free-brands-svg-icons"
const FileList = ({files,onFileClick,onFileNameEdit,onFileDelete})=>{
    const [editState,setEditState]  = useState('') //正在编辑的file.id
    const [value,setValue] = useState("") //input的值
    const node = useRef(null);
    useEffect(()=>{ 
        if(editState){
            node.current.focus()
        }
    },[editState])
    const closeSearch = (e,file)=>{
        console.log(file);
        e.preventDefault()
        setEditState('')
        setValue('')
         if(file.isNew){
            onFileDelete(file.id)
        } 
    }
   useEffect(()=>{
     const newFile = files.find(file => file.isNew)
     if(newFile){
         setEditState(newFile.id)
         setValue(newFile.title)
     }
   },[files])
    useEffect(()=>{
        const handleInputEvent = (event)=>{
          const {keyCode}  = event
          const editFile = files.find(file=>file.id===editState)
          if(keyCode===13 && editState && value.trim()!=='' ){
      
           onFileNameEdit(editFile.id,value,editFile.isNew)
           setEditState('')
           setValue('')
          }else if(keyCode===27 && editState){
           closeSearch(event,editFile)
              }  
        }   
        document.addEventListener('keyup',handleInputEvent)
        return ()=>{
           document.removeEventListener('keyup',handleInputEvent)
        }
       })

    return (
<ul className="list-group">
    {
        files.map(file=>{
            return <li className="list-group-item bg-light d-flex  align-items-center row mx-0" key={file.id}>
                {
                    (file.id===editState||file.isNew) && 
                    <div className="d-flex">
                          <input type="text" ref={node} className="form-control" value={value}  placeholder='请输入文件名' onChange={(e)=>{setValue(e.target.value)}}/>
                <button 
                className="icon-button" 
                onClick={(e)=>{closeSearch(e,file)}}
                >
                      <FontAwesomeIcon 
                    icon={faTimes}
                    size="lg"
                    />
                </button>
                    </div>
                }
                 {
                    (file.id!==editState&&!file.isNew) && 
                    <>
                      <span className="col-2"><FontAwesomeIcon   icon={faMarkdown}
                    size="lg"/></span>
               <span className="col-8" onClick={()=>{onFileClick(file.id)}}> {file.title}</span>
               <button className="icon-button col-1" onClick={()=>{onFileNameEdit(file.id,file.title); setEditState(file.id);setValue(file.title)}}>
                   <FontAwesomeIcon size="lg" icon={faEdit}/>
               </button>
               <button className="icon-button col-1" onClick={()=>{onFileDelete(file.id)}}>
                   <FontAwesomeIcon size="lg" icon={faTrash}/>
               </button>
                    </>

                }
              
                </li>
        })
    }
</ul>
    )
}
export default FileList