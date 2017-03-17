import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import store from './store';

function addTodo(message) {
  return {
    type: 'ADD_TODO',
    message: message,
    completed: false
  };
}

function completeTodo(index) {
  return {
    type: 'COMPLETE_TODO',
    index: index
  };
}

function uncompleteTodo(index) {
  return {
    type: 'UNCOMPLETE_TODO',
    index: index
  };
}
 
function deleteTodo(index) {
  return {
    type: 'DELETE_TODO',
    index: index
  };
}
 
function clearTodo() {
  return {
    type: 'CLEAR_TODO'
  };
}

class AddTodoForm extends React.Component {
  state = {
    message: ''
  };
 
  onFormSubmit(e) {
    e.preventDefault();
    store.dispatch(addTodo(this.state.message));
    this.setState({ message: '' });
  }
 
  onMessageChanged(e) {
    var message = e.target.value;
    this.setState({ message: message });
  }
 
  render() {
    return (
      <div className="row" style={{marginBottom: "20px"}}>
        <div className="col-sm-12">
          <h2>Add a Todo</h2>
        </div>

        <form onSubmit={this.onFormSubmit.bind(this)}>
          <div className="col-sm-8">
              <input type="text" className="form-control" placeholder="Todo..." onChange={this.onMessageChanged.bind(this)} value={this.state.message} />
          </div>
          <div className="col-sm-4">
              <input type="submit" className="btn btn-block btn-primary" value="Add" />
          </div>
        </form>
      </div>
    );
  }
}
 
class TodoItem extends React.Component {
  onDeleteClick() {
    store.dispatch(deleteTodo(this.props.index));
  }
 
  onCompletedClick() {
    store.dispatch(completeTodo(this.props.index));
  }

  onUnCompletedClick() {
    store.dispatch(uncompleteTodo(this.props.index));
  }
 
  render() {
    var completeButton;
    if (!this.props.completed) {
      completeButton = <button className="btn btn-success" onClick={this.onCompletedClick.bind(this)} style={{textDecoration: 'none'}}>Complete!</button>;
    }
    else {
      completeButton = <button className="btn btn-warning" onClick={this.onUnCompletedClick.bind(this)} style={{textDecoration: 'none'}}>Uncomplete!</button>;
    }
    return (
      <li className="clearfix" style={{marginBottom:"10px"}}>
        <button className="pull-right btn btn-danger" onClick={this.onDeleteClick.bind(this)} style={{textDecoration: 'none'}}>X</button>
        {completeButton} <span style={{textDecoration: this.props.completed ? 'line-through' : 'none'}}>{this.props.message.trim()}</span>
      </li>
    );
  }
}
 
class TodoList extends React.Component {
  state = {
    items: []
  };
 
  componentWillMount() {
    store.subscribe(() => {
      var state = store.getState();
      this.setState({
        items: state.todo.items
      });
    });
  }
 
  render() {
    var items = [];
 
    this.state.items.forEach((item, index) => {
      items.push(<TodoItem
        key={index}
        index={index}
        message={item.message}
        completed={item.completed}/>
      );
    });
 
    if (!items.length) {
      return (
        <p>
          <strong><em>You have no to-dos yet. Please add one above.</em></strong>
        </p>
      );
    }
 
    return (
      <ul style={{listStyleType:"none"}}>{ items }</ul>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1>UIT Todo List Redux Project</h1>
          </div>
        </div>
        <AddTodoForm />
        <TodoList />
      </div>
    );
  }
}

export default App;
