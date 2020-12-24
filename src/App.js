import React from "react";
import {
    Switch,
    Route, NavLink
} from "react-router-dom";
import {ClientList} from "./components/client-list";
import {Container} from "semantic-ui-react";
import ClientListPage from "./pages/client-list-page";
import ClientFormPage from "./pages/client-form-page";

function App() {
    return (
        <Container>
            <div className="ui two item menu">
                <NavLink className="item" activeClassName="active" exact to="/">
                    Clients list
                </NavLink>
                <NavLink
                    className="item"
                    activeClassName="active"
                    exact
                    to="/clients/new"
                >
                    Add Client
                </NavLink>
            </div>
            <Switch>
                <Route exact path="/" component={ClientListPage}/>
                <Route path="/crm/clients/new" component={ClientFormPage}/>
                <Route path="/crm/clients/edit/:_id" component={ClientFormPage}/>
                <Route path={"/crm/clients"} component={ClientList}/>
            </Switch>
        </Container>
    );
}

export default App;
