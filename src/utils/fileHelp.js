const fs = window.require('fs').promises
export const fileHelp = {
 readFile:(path)=>{
   return  fs.readFile(path,{encoding:'utf-8'})
 },
 writeFile:(path,content)=>{
    return fs.writeFile(path,content,{encoding:'utf-8'})
 },
 renameFile:(path,newPath)=>{
     return fs.rename(path,newPath)
 },
 deleteFile:(path)=>{
     return fs.unlink(path)
 }
}
/* const testpath = path.join(__dirname,'helper.js')
fileHelp.readFile(testpath).then(data=>{
    console.log(data);
}) */