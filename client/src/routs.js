import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {AddFun} from './pages/AddFun'
import {ListFun} from './pages/ListFun'
import {EditFun} from './pages/EditFun'
import {ViewFun} from './pages/ViewFun'

export const useRouters = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <AddFun />
            </Route>
            <Route path="/list" exact>
                <ListFun />
            </Route>
            <Route path="/view/:id" exact>
                 <ViewFun />
            </Route>
            <Route path="/edit/:id" exact>
                 <EditFun />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}