import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as todoActions } from '../reducers/action';
import uniqueId from 'lodash/uniqueId';

class ListTodo extends Component {
    state = {
        form: {
            title: ''
        },
        filter: 'all'
    }
    handleChangeFilter = e => {
        this.setState({ filter: e.target.value });
    }
    handleChange = name => e => {
        this.setState({
            form: {
                ...this.state.form,
                [name]: e.target.value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { form } = this.state;
        if (form.title) {
            const { todoActions } = this.props;
            const item = {
                id: uniqueId(),
                title: form.title,
                completed: false
            };
            todoActions.create(item);
            this.setState({ form: { title: '' } });
     } }
    handleToggleCompleted = value => (e, b) => {
        const { todoActions } = this.props;
        const item = {
            ...value,
            completed: !value.completed
        }
        todoActions.update(item);
    }
    handleEdit = value => e => {
        const { history } = this.props;
        history.push(`/edit/${value.id}`);
    }
    handleDelete = value => e => {
        const { todoActions } = this.props;
        todoActions.delete(value);
    }
    filterTodoItems = (item) => {
        const { filter } = this.state;
        if (filter === 'completed') {
            return item.completed;
        } else if (filter === 'active') {
            return !item.completed;
        } else {
            return true;
        }}
    render() {
        const { todo } = this.props;
        const { form, filter } = this.state;
        return (
            <Grid item xs={12} sm={6} style={{backgroundColor:'teal'}}>
                <Typography align="center"  type="display3">TodoList</Typography>
                <Paper style={{ paddingLeft: 16, paddingRight: 16 }}>
                <Select value={filter}onChange={this.handleChangeFilter} name="filter"fullWidth  margin="normal">
                                <MenuItem className='btn btn-warning' value='all'>All</MenuItem>
                                <MenuItem className='btn btn-success' value='completed'>Completed</MenuItem>
                                <MenuItem className='btn btn-primary' value='active'>Active</MenuItem>
                            </Select>
                    <form onSubmit={this.handleSubmit} >
                    <div className='row mx-2 align-items-center'>

                    <div className='col'>    <TextField  id="todo" label="enter what you want to add!!"onChange={this.handleChange('title')}
                            fullWidth margin="normal"value={form.title}autoComplete="off" /> </div>
                          <button onChange={this.handleChange('title')} className='btn btn-primary mx-2'> Add Task </button>
                  </div>
                    </form>
                    {todo.items.length > 0 &&
                        <FormControl fullWidth>
                        </FormControl>}
                    <List>{todo.items.filter(this.filterTodoItems).map(value =>(<ListItem key={value.id}dense button onClick={this.handleToggleCompleted(value)}>
                                <Checkbox className='btn btn-primary' checked={value.completed} tabIndex={-1} disableRipple/>
                                <ListItemText primary= {value.title}/>
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Edit" className='btn btn-success'onClick={this.handleEdit(value)}>
                                        <EditIcon />
                                    </IconButton>
                              <IconButton aria-label="Delete" className='btn btn-danger' onClick={this.handleDelete(value)}>
                                        <DeleteIcon />
                                    </IconButton> 
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid >
        );}}
const mapStateToProps = ({ todo }) => ({ todo });
const mapDispatchToProps = (dispatch) => ({ todoActions: bindActionCreators(todoActions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(ListTodo);

