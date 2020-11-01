import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import ListTodo from './components/ListTask';
import EditTodo from './components/EditTodo';
import Todo from './components/Task';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Grid style={{ padding:25}}>
          <div container spacing={16} justify="center">
            <Switch>
              <Route exact path="/" component={ListTodo} />
              <Route path="/edit/:id" component={EditTodo} />
              <Route component={Todo} />
            </Switch>
          </div>
        </Grid>
      </Router >
    );
  }
}

export default App;
