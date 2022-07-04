import React from 'react';
import './FilesDragAndDrop.css';
import UploadButton from './FileUpload/UploadButton';

function FilesDragAndDrop({button}){
    const handleAddBanner = ({ target: { files } }) => {
        const loadedImage = files[0];
        button(loadedImage)
      };
    return (
        <div className='FilesDragAndDrop-area'>
            Drag and Drop image files
            <span 
                role='img'
                aria-label='emoji'
                className='area-icon'>
                &#128526;
            </span>
            <div>OR</div><br/>
            <button className="myButton">
            <UploadButton onChange={handleAddBanner} accept="image/*">
                 select
            </UploadButton>
            </button>
        </div>
    );
}

export default FilesDragAndDrop;