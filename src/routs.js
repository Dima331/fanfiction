import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AddFun } from './pages/AddFun'
import { EditFun } from './pages/EditFun'
import { AddСhapter } from './pages/AddСhapter'
import { EditСhapter } from './pages/EditСhapter'
import { СhapterPage } from './pages/СhapterPage'
import { MainPage } from './pages/MainPage'
import { FanfictionPage } from './pages/FanfictionPage'
import { AuthPage } from './pages/AuthPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { TokenPage } from './pages/TokenPage'
import { TokenPresentPage } from './pages/TokenPresentPage'
import { UserFanfictionPage } from './pages/UserFanfictionPage'
import { Loader } from './components/Loader'
import { ProfilePage } from './pages/ProfilePage'
import { ManagerPage } from './pages/ManagerPage'

import {
    loginUser,
    checkLoginUser,
    getloginUser
} from './modules/users';

export const useRouters = () => {
    const dispatch = useDispatch();
    
    const { token, load } = useSelector(state => ({
        token: loginUser(state),
        load: getloginUser(state)
    }));

    useEffect(() => {
        dispatch(checkLoginUser())
    }, [])

    if (!load) {
        return (
            <Loader />
        )
    }
    if (token) {
        if (+token.user.role) {
            return (
                <Switch>
                    <Route path="/admin" exact>
                        <ManagerPage />
                    </Route>
                    <Route path="/user/:id" exact>
                        <ProfilePage />
                    </Route>
                    <Route path="/" exact>
                        <MainPage />
                    </Route>
                    <Route path="/profile" exact>
                        <ProfilePage />
                    </Route>
                    <Route path="/view/:id" exact>
                        <FanfictionPage />
                    </Route>
                    <Route path="/view/:id/:idChapter" exact>
                        <СhapterPage />
                    </Route>
                    <Route path="/userfanfiction" exact>
                        <UserFanfictionPage />
                    </Route>
                    <Route path="/view/:id" exact>
                        <FanfictionPage />
                    </Route>
                    <Route path="/addfanfiction" exact>
                        <AddFun />
                    </Route>
                    <Route path="/view/:id/:idChapter" exact>
                        <СhapterPage />
                    </Route>
                    <Route path="/edit/fanfiction/:id" exact>
                        <EditFun />
                    </Route>
                    <Route path="/addchapter" exact>
                        <AddСhapter />
                    </Route>
                    <Route path="/chapter/edit/:id" exact>
                        <EditСhapter />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            )
        }
    }
    if (token) {
        return (
            <Switch>
                <Route path="/" exact>
                    <MainPage />
                </Route>
                <Route path="/profile" exact>
                    <ProfilePage />
                </Route>
                <Route path="/view/:id" exact>
                    <FanfictionPage />
                </Route>
                <Route path="/view/:id/:idChapter" exact>
                    <СhapterPage />
                </Route>
                <Route path="/userfanfiction" exact>
                    <UserFanfictionPage />
                </Route>
                <Route path="/view/:id" exact>
                    <FanfictionPage />
                </Route>
                <Route path="/addfanfiction" exact>
                    <AddFun />
                </Route>
                <Route path="/view/:id/:idChapter" exact>
                    <СhapterPage />
                </Route>
                <Route path="/edit/fanfiction/:id" exact>
                    <EditFun />
                </Route>
                <Route path="/addchapter" exact>
                    <AddСhapter />
                </Route>
                <Route path="/chapter/edit/:id" exact>
                    <EditСhapter />
                </Route>
                <Redirect to="/" />
            </Switch>
        )
    }

    if (!token) {
        return (
            <Switch>
                <Route path="/" exact>
                    <MainPage />
                </Route>
                <Route path="/view/:id" exact>
                    <FanfictionPage />
                </Route>
                <Route path="/view/:id/:idChapter" exact>
                    <СhapterPage />
                </Route>
                <Route path="/auth" exact>
                    <AuthPage />
                </Route>
                <Route path="/registration" exact>
                    <RegistrationPage />
                </Route>
                <Route path="/registration/:id" exact>
                    <TokenPage />
                </Route>
                <Route path="/confirmation" exact>
                    <TokenPresentPage />
                </Route>
                <Redirect to="/" />
            </Switch>
        )
    }
}