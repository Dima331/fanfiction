import React, { useState, useEffect } from 'react';
import { useRouters } from './routs';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { Navigation } from './components/Navigation';
import { checkLoginUser } from './modules/users';
import { IntlProvider } from 'react-intl';
import Container from 'react-bootstrap/Container';
import { locales } from './local/locales';
import enMessages from "./local/en";
import ruMessages from "./local/ru";

const messages = {
  [locales.RU]: ruMessages,
  [locales.EN]: enMessages,
}

// const themes = {
//   black: false,
//   light: true,
// }

function App() {
  const routes = useRouters();
  const dispatch = useDispatch();
  const [currentLocale, setCurrentLocale] = useState(localStorage.getItem('local') || locales.EN)
  const [theme, setTheme] = useState(+localStorage.getItem('theme') || 0)

  useEffect(() => {
    dispatch(checkLoginUser())
  }, [])

  return (
    <div className={!theme ? 'light': 'black'}>
      <div className="bg-all pb-5">
    {/* <div> */}
    <IntlProvider
      messages={messages[currentLocale]}
      locale={currentLocale}
      defaultLocale={locales.EN}>
      <BrowserRouter>
        <Navigation 
            currentLocale={currentLocale}
            setCurrentLocale={setCurrentLocale}
            theme={theme}
            setTheme={setTheme}
        />
        <Container>
          {routes}
        </Container>
      </BrowserRouter>
    </IntlProvider>
    </div></div>
  )
}

export default App;
