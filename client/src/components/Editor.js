import React, { useState, useMemo } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReactMarkdown from 'react-markdown'
import { useDropzone } from 'react-dropzone';

import { CloudArrowDown } from 'react-bootstrap-icons';
import { Image } from 'react-bootstrap-icons';
import { TypeH1 } from 'react-bootstrap-icons';
import { TypeH2 } from 'react-bootstrap-icons';
import { TypeH3 } from 'react-bootstrap-icons';
import { TypeItalic } from 'react-bootstrap-icons';
import { Link } from 'react-bootstrap-icons';
import { TypeBold } from 'react-bootstrap-icons';
import { Code } from 'react-bootstrap-icons';
import { X } from 'react-bootstrap-icons';
import '../styles/styles.css';

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

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
  transition: 'border .24s ease-in-out',
  position: 'absolute',
  top: '-4px',
  left: 0,
  width: '100%',
  height: '105%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const Editor = () => {
  const [value, setValue] = useState('');
  const [position, setPosition] = useState(0);
  const [navigation, setNavigation]= useState([
    {
      tag: <Image />,
      symbols: '![]()'
    },
    {
      tag: <TypeH1 />,
      symbols: '#'
    },
    {
      tag: <TypeH2 />,
      symbols: '##'
    },
    {
      tag: <TypeH3 />,
      symbols: '###'
    },
    {
      tag: <TypeItalic />,
      symbols: '**'
    },
    {
      tag: <Link />,
      symbols: '[]()'
    },
    {
      tag: <TypeBold />,
      symbols: '****'
    },
    {
      tag: <Code />,
      symbols: '````'
    },
  ]);
  const [editor, setEdit] = useState(true);
  const [dowloadImage, setDowloadImage] = useState(false);
  const nameRef = React.useRef(null)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const { getRootProps, 
    getInputProps, 
    isDragActive,
    isDragAccept,
    isDragReject } = useDropzone({
      accept: 'image/*',
      onDrop: async (file) => {
        await fetch('https://api.imgur.com/3/image', {
          method: 'POST',
          body: file[0],
          headers: {
            'Authorization': 'Client-ID 6c8342bad27ec08'
          }
        }).then(response => response.json())
          .then(commits => {
            setValue([
              value.slice(0, position),
              `![](${commits.data.link})`,
              value.slice(position)].join(''))
            setDowloadImage(false)
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

  const selectHandler = (e) => {
    setPosition(e.target.selectionEnd)
  }

  const changeTextHandler = () => {
    setEdit(prev => !prev)
  };

  const changeUpImg = () => {
    setDowloadImage(prev => !prev)
  }

  const addSymbol = (symbol) => {
    setValue([
      value.slice(0, position),
      `${symbol}`,
      value.slice(position)].join(''))
    nameRef.current.focus();
  };

  return (
    <Form.Group>
      <Form.Label>chapter</Form.Label>
      <Form.Group>
        <Button
          variant="primary"
          onClick={changeTextHandler}>
          {editor ? "View" : "Edit"}
        </Button>
      </Form.Group>

      <div className={editor ? 'editor' : 'hide'} >
        <ul className='nav-list'>
          {navigation && 
            navigation.map((item) => (
              <li className='nav-list__item'><Button
               variant="success"
               className="nav"
               onClick={() => addSymbol(item.symbols)}
             >{item.tag}</Button></li>
            ))
          }
          <li className='nav-list__item'><Button
            variant="success"
            className="nav"
            onClick={changeUpImg}
          ><CloudArrowDown /></Button></li>
        </ul>
        <Form.Control
          as="textarea"
          value={value}
          onChange={handleChange}
          rows={3}
          onBlur={selectHandler}
          ref={nameRef}
        />
        {dowloadImage && <div>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>

          <div className='close-img'>
            <Button
              className='close-btn'
              onClick={changeUpImg}
            ><X /></Button>
          </div>
        </div>}
      </div>
      <div className={editor ? 'hide' : ''}>
        <ReactMarkdown
          children={value}
          className='hide-text' />
      </div>
    </Form.Group>
  )
}