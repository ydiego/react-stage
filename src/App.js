import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./routes";
import loadable from "@loadable/component";

const NotFound = loadable(() => import("@/pages/404/index.js"));
const Auth = loadable(() => import("@/pages/Auth/index.js"));

class App extends React.Component{

  getConfirmation() {

  }

  render() {
    return (
      <Router getUserConfirmation={this.getConfirmation.bind(this)}>
        <Route path="" component={Auth}/>
        <Switch>
          {Routes.map(({component: Comp, props, ...item}, index) => {
            return <Route
              path={item.path}
              exact={item.exact}
              key={index}
              render={(routerProps) => <>
                <Comp {...routerProps} {...props}/>
              </>}
            />
          })}
          <Route path="" component={NotFound}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
