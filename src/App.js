import React, { useState } from 'react';
import axios from 'axios';
import FilesDragAndDrop from './FilesDragAndDrop';
import CubeLoader from './CubeLoader/CubeLoader'

function App() {
    const [image,setImage]=useState(null);
    const [imgUrl,setImgUrl]=useState(null);
    const [isPending,setIsPending]=useState(false);
    const [error,setError]=useState(false);
    const [errMsg,setErrMsg]=useState('')
    const drop = React.useRef(null);
    console.log(image);
    console.log(imgUrl);
    React.useEffect(() => {
        drop.current.addEventListener('dragover', handleDragOver);
        drop.current.addEventListener('drop', handleDrop);
      
        return () => {
          drop.current.removeEventListener('dragover', handleDragOver);
          drop.current.removeEventListener('drop', handleDrop);
        };
      }, []);
      
      const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };
      
      const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {files} = e.dataTransfer;
        setIsPending(true)

        if (files && files.length) {
        //   console.log(files);
          setImage(files[0]);
          const formData=new FormData();
          formData.append("file",files[0]);
          formData.append("upload_preset","image-uploader");
          axios.post("https://api.cloudinary.com/v1_1/dcmztntur/image/upload",formData)
          .then(res=>{
            setImgUrl(res.data.url)
        }).then(()=>{setIsPending(false)}).catch(err=>{
          setErrMsg(err.message);
          setError(true);
          setIsPending(false)
        })
        }
      };
      const button=(data)=>{
        setIsPending(true);
        setImage(data);
        const formData=new FormData();
          formData.append("file",data);
          formData.append("upload_preset","image-uploader");
          axios.post("https://api.cloudinary.com/v1_1/dcmztntur/image/upload",formData)
          .then(res=>{
            setImgUrl(res.data.url)
        }).then(()=>{setIsPending(false)}).catch(err=>{
          setErrMsg(err.message);
          setError(true);
          setIsPending(false)
        })
      }
      function copy(text){
        navigator.clipboard.writeText(text);
        alert("Text Copied")
      }
    return (
        <div
        ref={drop}
        className='FilesDragAndDrop'>
            {!image && !isPending && <FilesDragAndDrop button={button} />}
            {isPending && <div className='center'><CubeLoader /></div>}
            {image && !isPending && !error && <div className='image-container'>
              <img className='image' src={imgUrl} alt='uploaded image' />
              <div className='url-container'>
              <div>
              <span className='copy-text'>
                {imgUrl}
              </span>
              <button className='myButton' style={{width:'60px',padding:'5px',marginLeft:'10px'}} onClick={() => copy(imgUrl)}>Copy</button>
              </div>
              </div>
              </div>}
            {error && <p className='error'>{errMsg}</p>}
            {/* <input type={'file'} onChange={(e)=>{setImage(e.target.files[0])}} />
            <div className='image-container'>
            <img className='image' src={imgUrl} alt='uploaded image' />
            <p>{imgUrl}</p>
            </div> */}
            {/* <input type={'file'} onChange={(e)=>{setImage(e.target.files[0])}} />
            <button onClick={handleSubmit}>click me</button> */}
        </div>
    );
}

export default App;