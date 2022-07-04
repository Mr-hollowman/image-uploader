import React from 'react';

function UploadButton({ children, value, onChange, disabled, accept }){
  
  return (
    <>
      <label htmlFor="contained-button-file" className="m-0 w-100">
      <input
        value={value}
        accept={accept}
        disabled={disabled}
        style={{ display: 'none' }}
        id="contained-button-file"
        type="file"
        onChange={disabled ? () => {} : onChange}
      />
      {children}
    </label>
    </>
  );
}
export default UploadButton;