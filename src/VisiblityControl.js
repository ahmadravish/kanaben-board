import React, { Component } from 'react';

export class VisiblityControl extends Component {
  render = () => (
    <div calss='form-check'>
      <input
        class='form-check-input'
        type='checkbox'
        checked={this.props.isChecked}
        onChange={(e) => this.props.callback(e.target.checked)}
      />

      <label className='form-check-label'> Show {this.props.description}</label>
    </div>
  );
}
