import React from 'react';
import { useRouters } from './routs';
import { BrowserRouter } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import { Navbarheader } from './components/Navbarheader'
function App() {
  const routes = useRouters();

  return (
    <BrowserRouter>
      <Container>
        <Navbarheader />
        {routes}
      </Container>
    </BrowserRouter>
  )
}

export default App;
