import React, { useEffect, useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100px',
    width: '100px',
    marginRight: '15px',
    objectFit: 'cover'
};
const container = {
    width: '100%',
    backgroundColor: 'aliceblue',
    display: 'flex'
}

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };

export const ImgChapter = (props) => {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps, isDragActive,
        isDragAccept,
        isDragReject } = useDropzone({
        accept: 'image/*',
        onDrop: async (acceptedFiles) => {
            const response = await fetch('https://api.imgur.com/3/image', {
                method: 'POST',
                body: acceptedFiles[0],
                headers: {
                    'Authorization': 'Client-ID 6c8342bad27ec08'
                }
            }).then(response => response.json())
                .then(commits => {
                    console.log(commits.data.link)
                    setFiles(commits.data.link)
                });
        },
        onDragEnter: () => {
            console.log(21)
        }
    });

    const style = useMemo(() => ({
        ...'base',
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isDragActive,
        isDragReject,
        isDragAccept
      ]);

    return (
        <div
            style={container}
        >
            <aside style={thumbsContainer}>
                <img                   
                    src={files}
                    style={img}/>
            </aside>
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
        </div>
    );
}