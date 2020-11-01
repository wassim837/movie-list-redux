import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import CheckIcon from 'material-ui-icons/Check';
import BackIcon from 'material-ui-icons/ArrowBack';
import { InputAdornment } from 'material-ui/Input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as todoActions } from '../reducers/action';

class EditTodo extends Component {
    state = {
        item: {
            title: ''
        } }
    componentDidMount() {
        const { match, todo } = this.props;
        const item = todo.items.find(item => item.id === match.params.id) || { title: '' };
        this.setState({ item });
    }
    handleChange = name => e => {
        this.setState({
            item: {
                ...this.state.item,
                [name]: e.target.value
            }  }) }
   handleSubmit = (e) => {
        e.preventDefault();
        const { item } = this.state;
        if (item.title) {
            const { todoActions } = this.props;
            todoActions.update(item);
            this.goBack();
        } }
    goBack = () => {
        const { history } = this.props;
        history.goBack();
    }
    render() {
        const { item } = this.state;
        return (
            <Grid item xs={12} sm={6} style={{backgroundColor:'teal'}}>
                <Typography align="center" type="display3">TodoList</Typography>
                <Paper style={{ paddingLeft: 16, paddingRight: 16 }}>
                    <form onSubmit={this.handleSubmit}>
                        <TextField  id="todo" label="Edit what you want !!"
                            onChange={this.handleChange('title')} fullWidth  margin="normal"  value={item.title} autoComplete="off"    autoFocus={true}  InputProps={{ endAdornment:
                                    (<InputAdornment position="end">
                                        <IconButton onClick={this.handleSubmit} >
                                            <CheckIcon />
                                      </IconButton>
                                    </InputAdornment>)}}  />
                        <IconButton aria-label="Edit" onClick={this.handleSubmit}>
                            <BackIcon />
                        </IconButton>
                    </form>
                </Paper>
            </Grid >
            );}}
const mapStateToProps = ({ todo }) => ({ todo });
const mapDispatchToProps = (dispatch) => ({ todoActions: bindActionCreators(todoActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);

