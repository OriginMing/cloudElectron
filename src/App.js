import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './components/FileSearch';
import defaultFiles from './utils/deafultFiles';
import FileList from "./components/FileList"
import BottomButton from './components/BottomButton';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { faPlus,faFileImport } from '@fortawesome/free-solid-svg-icons'
import Nav from './components/Nav';
import { useState ,useCallback } from 'react';
import {v4 as uuidv4 } from 'uuid';
import { fileHelp } from './utils/fileHelp';
const { app } = window.require('@electron/remote')
const {join} = window.require('path')
function App() {
  const [files,setFiles]  = useState(defaultFiles);
  const  [activeId,setActiveId]  = useState('')
  const [openFilesId,setOpenFileId] = useState([])
  const [unSaveIds,setUnsaveIds] = useState([])
  const [searchFiles,setSearchFiles] = useState([])
 const saveLocation = app.getPath('documents')+'/cloddoc'
 console.log(saveLocation);
  const openedFiles = openFilesId.map(openID=>{
    return files.find((file)=>file.id === openID)
  })
  //  const openedFiles = openFilesId.map(openID=>{
  //  return files[openID]
  //})
  const activeFile = files.find(file=>file.id ===activeId) 
  //  const activeFile = files[activeId]
  const handleFileClick = (id)=>{
    setActiveId(id)
    if(!openFilesId.includes(id)){
      setOpenFileId([...openFilesId,id])
    }
  }
  const handleTabClick = (id)=>{
    setActiveId(id)
  }
  const handleTabClose = (id)=>{
    const tabWith = openFilesId.filter(fileId => fileId !== id)
    setOpenFileId(tabWith)
    if(tabWith.length>0){
      setActiveId(tabWith[0])
    }else{
      setActiveId('')
    }
  }
  const fileChange =useCallback((value,id)=>{
    const newFiles = files.map(file=>{
      if(file.id===id){
        file.body = value
      }
      return file
    })
    setFiles(newFiles)
    if(!unSaveIds.includes(id)){
      setUnsaveIds([...unSaveIds,id])
    } 
  },[]) 
  const handleFileDelete = (id)=>{
   const newFiles = files.filter(file=>file.id!==id)
   setFiles(newFiles)
   handleTabClose(id)
  }
  //重命名文件，如果文件是新建创建文件
  const handleFileNameEdit =  (id,value,isNew)=>{
    console.log(id,value,isNew);
    let body ='## 请输入markdown'
    let oriTitle = ''
    const newFiles = files.map(file=>{
      if(file.id===id){
        oriTitle = file.title
        file.title = value
        file.isNew = false
         
      }
      return file
    })
    if(isNew){
      console.log(join(saveLocation,`${value}.md`),body);
      fileHelp.writeFile(join(saveLocation,`${value}.md`),body).then(()=>{
        setFiles(newFiles)
      })
    }else{
      fileHelp.renameFile(join(saveLocation,`${oriTitle}.md`),join(saveLocation,`${value}.md`)).then(()=>{
        setFiles(newFiles)
      })
    }
 
    
  }
  const handleSearch = (value)=>{
    const newFiles =  files.filter(file=>file.title.includes(value))
    setSearchFiles(newFiles)
  }
  const showSearchorOri = searchFiles.length>0?searchFiles:files
  const createNewFile = () =>{
    const newid = uuidv4()
    const newFile = [...files,{
      id:newid,
      title:"",
      body:"## 请输入markdown",
      createdAt:new Date().getTime(),
      isNew:true
    }]
    setFiles(newFile)
  }
  return (
    <div className="App container-fluid px-0">
  <div className="row mx-0">
    <div className="col-3  mx-0 px-0 " >
      <FileSearch
    title="我的云文档"
    onFileSearch={(value)=>handleSearch(value)}
    />
    <FileList 
    files={showSearchorOri} onFileClick={handleFileClick} onFileDelete={handleFileDelete}
    onFileNameEdit={(id,value,isNew)=>{handleFileNameEdit(id,value,isNew)}}
    />
    <div className="d-flex ">
      <div className='flex-fill row mx-0'>
    <BottomButton
    className=""
     text="新建"
     colorClass="btn-primary"
     icon={faPlus}
     onBtnClick={createNewFile}
    />
    </div>
    <div className='flex-fill  row mx-0'>
      <BottomButton
      className=""
     text="导入"
     colorClass="btn-success"
     icon={faFileImport}
    />
    </div>
    </div>
   
    </div>
    <div className="col-9 px-0" >
    {
      !activeFile &&
      <div style={{height:"300px",lineHeight:"300px",fontSize:"30px",color:"#ccc",textAlign:'center'}}>请选择或者创建一个MarkDown文件</div>
    }{
      activeFile &&
      <>
      <Nav files={openedFiles} 
      onTabClick={handleTabClick}
      activeId={activeId}
      onTabClose={handleTabClose}
      unSaveIds={unSaveIds}
      />
      <SimpleMDE value={activeFile && activeFile.body} 
      id={activeId}
      onChange={(value)=>{fileChange(value,activeId);}}
      options={{
      minHeight:'515px',
      spellChecker:false,
      autofocus:true
      }}
      />
      </>
    }

 

    </div>
  </div>
    </div>
  );
}

export default App;
