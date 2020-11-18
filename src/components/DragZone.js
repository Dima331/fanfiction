import React, { useEffect, useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { FormattedMessage } from 'react-intl'

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
    objectFit: 'cover',
    minWidth: '100px',
    maxWidth: '100px',
    maxHeight: '100px'
};
const container = {
    width: '100%',
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

export const DragZone = ({ imageHandler, editImage, setStatusLoad }) => {
    const [files, setFiles] = useState();

    useEffect(() => {
        if (editImage) {
            setFiles(editImage)
        }
    }, [editImage])

    const { 
        getRootProps, 
        getInputProps, 
        isDragActive,
        isDragAccept,
        isDragReject } = useDropzone({
            accept: 'image/*',
            onDrop: async (acceptedFiles) => {
                setStatusLoad(true)
                const response = await fetch('https://api.imgur.com/3/image', {
                    method: 'POST',
                    body: acceptedFiles[0],
                    headers: {
                        'Authorization': 'Client-ID 6c8342bad27ec08'
                    }
                }).then(response => response.json())
                    .then(image => {
                        setFiles(image.data.link)
                        imageHandler(image.data.link)
                        setStatusLoad(false)
                    });
            },
        });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    return (
        <div style={container}>
            <aside style={thumbsContainer}>
                {files && 
                    <img
                        src={files}
                        style={img} />
                }
            </aside>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p><FormattedMessage id='drag-zone'/></p>
            </div>
        </div>
    );
}