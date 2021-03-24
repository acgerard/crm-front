import React, {Fragment} from "react";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import ClientListPage from "./pages/client-list-page";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import {SpancoList} from "./components/spanco/spanco-list";
import {SignInSide} from "./components/SignInSide";
import ProductListPage from "./pages/product-list-page";

function App() {
    return (
        <Fragment>
            <Route exact path="/">
                <Redirect to="/login"/>
            </Route>
            <Route
                path="/crm"
                render={({location}) => (
                    <Container>
                        <Tabs value={location.pathname}>
                            <Tab label="Clients" href="#basic-tabs" value="/crm/clients" component={Link}
                                 to="/crm/clients"/>
                            <Tab label="Spanco" value="/crm/spancos" component={Link} to="/crm/spancos"/>
                            <Tab label="Products" value="/crm/products" component={Link} to="/crm/products"/>
                        </Tabs>
                        <Switch>
                            <Route exact path="/crm/clients" component={ClientListPage}/>
                            <Route exact path="/crm/spancos" component={SpancoList}/>
                            <Route exact path="/crm/products" component={ProductListPage}/>
                        </Switch>
                    </Container>
                )}
            />
            <Route
                path={"/login"}
                render={() => <SignInSide/>}
            />
        </Fragment>
    );
}

export default App;
