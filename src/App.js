import React, { Component } from 'react';
import './App.css';

import { VisiblityControl } from './VisiblityControl';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Ravish',
      todoItems: [
        { action: 'Buy a flower', done: false },
        { action: 'Do Workout', done: true },
        { action: 'Coding', done: false },
        { action: 'call a freind', done: true },
      ],
      showCompleted: true,
      newItemText: '',
    };
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  };

  createNewTodo = () => {
    if (
      !this.state.todoItems.find(
        (item) => item.action === this.state.newItemText
      )
    ) {
      this.setState(
        {
          todoItems: [
            ...this.state.todoItems,
            { action: this.state.newItemText, done: false },
          ],
          newItemText: '',
        },

        () => localStorage.setItem('todos', JSON.stringify(this.state))
      );
    }
  };

  changeStateData = () => {
    this.setState({
      username: this.state.username === 'Ravish' ? 'ahmad_ravish' : 'Ravish',
      course: 'React.js',
    });
  };

  toggleTodo = (todo) =>
    this.setState({
      todoItems: this.state.todoItems.map((item) =>
        item.action === todo.action ? { ...item, done: !item.done } : item
      ),
    });

  todoTableRows = (doneValue) =>
    this.state.todoItems
      .filter((item) => item.done === doneValue)
      .map((item) => (
        <tr key={item.action}>
          <td>{item.action}</td>
          <td>
            <input
              type='checkbox'
              checked={item.done}
              onChange={() => this.toggleTodo(item)}
            />
          </td>
        </tr>
      ));

  componentDidMount = () => {
    let data = localStorage.getItem('todos');
    this.setState(
      data != null
        ? JSON.parse(data)
        : {
            username: 'Ravish',
            todoItems: [
              { action: 'Buy a flower', done: false },
              { action: 'Do Workout', done: true },
              { action: 'Coding', done: false },
              { action: 'call a freind', done: true },
            ],
            showCompleted: true,
            newItemText: '',
          }
    );
  };

  render = () => (
    <div>
      <h4 className='bg-primary text-white text-center p-2 '>
        ({this.state.todoItems.filter((t) => !t.done).length}) items to do
      </h4>
      <br />
      <br />
      <div className='container-fluid'>
        <div className='m-1'>
          <input
            className='form-control'
            value={this.state.newItemText}
            onChange={this.updateNewTextValue}
          />

          <button className='btn btn-danger mt-1' onClick={this.createNewTodo}>
            Add New Task
          </button>
        </div>
        <br />
        <br />

        <table className='table table-striped table-bordered '>
          <thead>
            <tr>
              <th>Todo Task Name</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{this.todoTableRows(false)}</tbody>
        </table>
        <br />
        <br />
        <div class='bg-danger text-white text-center p-2'>
          <VisiblityControl
            description='Completed Tasks'
            isChecked={this.state.showCompleted}
            callback={(checked) => this.setState({ showCompleted: checked })}
          />
        </div>

        {this.state.showCompleted && (
          <table className='table table-striped table-bordered'>
            <thead>
              <td>Task Name</td>
              <td>Status</td>
            </thead>
            <tbody>{this.todoTableRows(true)}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

////////COMMAND To START:NPM START/////////
