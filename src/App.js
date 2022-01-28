import React, {Fragment} from "react";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import ClientListPage from "./pages/client-list-page";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import {SignInSide} from "./components/SignInSide";
import ProductListPage from "./pages/product-list-page";
import SpancoListPage from "./pages/spanco-list-page";

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
                            <Tab label="Clients" href="#basic-tabs" value="/clients" component={Link}
                                 to="/clients"/>
                            <Tab label="Spanco" value="/spancos" component={Link} to="/spancos"/>
                            <Tab label="Products" value="/products" component={Link} to="/products"/>
                        </Tabs>
                        <Switch>
                            <Route exact path="/clients" component={ClientListPage}/>
                            <Route exact path="/spancos" component={SpancoListPage}/>
                            <Route exact path="/products" component={ProductListPage}/>
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
