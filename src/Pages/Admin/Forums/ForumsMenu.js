import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import AdminNav from "../../../Components/AdminNav.component";

export default class ForumsMenu extends Component {
  state = { activeItem: 'bio' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
        <React.Fragment>
        <AdminNav/>
        <Menu tabular>
            <Menu.Item
                name='add forums'
                active={activeItem === 'add forums'}
                onClick={this.handleItemClick}
            />
            <Menu.Item
                name='view forums'
                active={activeItem === 'view forums'}
                onClick={this.handleItemClick}
            />
        </Menu>
        </React.Fragment>
        )
    }
}