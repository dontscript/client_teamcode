import React from 'react';
import { Link, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import {
    Sidebar,
    Segment,
    Button,
    Menu,
    Image,
    Icon,
    Header,
    Modal,
    Dropdown
} from 'semantic-ui-react';
import {changeVisible} from './SidebarActions';
import Dashboard from '../dashboard/Dashboard';
import Project from '../project/Project';
import NavBar from '../app/Header';
import Estimate from '../estimate/Estimate';
import Avatar from '../user/UserAvatar';
import axios from 'axios';
import user from '../utils/user';

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: sessionStorage.current_project || 'dashboard',
            projects: [],
            // visibleSidebar: this.props.sidebar.visibleSidebar
        }
        console.log(this.props);
    }

    // toggleVisibility = () => this.setState({ visibleSidebar: !this.state.visibleSidebar })
    toggleVisibility = () => this.props.changeVisible(!this.props.sidebar.visibleSidebar)

    hideSidebar = () => this.props.sidebar.visibleSidebar ? this.props.changeVisible(false) : ''

    handleItemClick = name => {
        sessionStorage.current_project = name;
        this.setState({activeItem: name})
    }

    componentWillMount() {
        user.getUserInfo().then(response => {
            console.log(response);
            if (response.success) {
                this.setState({
                    projects: response.user.belong_project
                });
            }
        });
    } 
    render() {
        const {activeItem} = this.state;
        console.log(this.props);
        var trigger = (
            <Header style={{color: 'white', marginBottom: 0}} as='h1'> 
                <Image centered circular='true' size={'small'} style={{borderRadius: '50%'}} src='https://react.semantic-ui.com/assets/images/avatar/large/patrick.png' />
                {' '}{this.props.match.params.company}
            </Header>
        );
        return (
            <Sidebar.Pushable>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    visible={this.props.sidebar.visibleSidebar}
                    vertical
                    inverted
                    style={{
                        width: 260, paddingBottom: '1em', background: 'rgb(27, 28, 29)'
                    }}
                    >
                    <Menu.Item>
                        <Dropdown trigger={trigger} pointing='top right' icon={null} >
                            <Dropdown.Menu>
                                <Dropdown.Item icon='address book' text='Profile' as={Link} to={`/profile`} />
                                {/* <Dropdown.Item icon='game' text='Editor' as={Link} to={`/editor`} /> */}
                                <Dropdown.Divider />
                                <Dropdown.Item icon='sign out' text='Sign Out' onClick={this._logout} />
                            </Dropdown.Menu>
                        </Dropdown>
                        
                    </Menu.Item>
                    <Menu.Item style={{fontSize: 19, fontWeight: 'bold'}} 
                                as={Link} 
                                to={`${this.props.match.url}/dashboard`}
                                name={'dashboard'}
                                active={activeItem === 'dashboard'}
                                onClick={this.handleItemClick.bind(this, 'dashboard')}>
                                
                            <Icon name='dashboard' />Dashboard   
                    </Menu.Item>
                    <Menu.Item>
                        <Menu.Header>
                            <div style={{display: 'inline-block', fontSize: 19}}>Project</div>
                            
                            <Modal trigger={<Icon name="add circle" size={'large'} style={{float: 'right', cursor: 'pointer'}} />} >
                                <Header icon='archive' content='Create Project' />
                                
                                <Modal.Content>
                                    <Estimate />
                                </Modal.Content>

                                <Modal.Actions>
                                    <Button>
                                        <Icon name='plus' /> Create
                                    </Button>
                                    <Button>
                                        <Icon name='cancel' /> Cancel
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                        </Menu.Header>

                        <Menu.Menu>
                            {this.state.projects.map(project => (
                                <Menu.Item 
                                    key={project._id}
                                    style={{fontSize: 15}}
                                    name={project.project_name}
                                    active={activeItem === project.project_name}
                                    onClick={this.handleItemClick.bind(this, project.project_name)}
                                    as={Link} to={`${this.props.match.url}/project/${project.project_name}`}> 
                                    @ {project.project_name}
                                </Menu.Item>
                            ))}
                        </Menu.Menu>
                    </Menu.Item>

                    <Menu.Item>
                        <Menu.Header>
                            <div style={{display: 'inline-block', fontSize: 19}}>Chat</div>
                            <Icon name="add circle" size={'large'} style={{float: 'right', cursor: 'pointer'}} />
                        </Menu.Header>

                        <Menu.Menu>
                            <Menu.Item 
                                style={{fontSize: 15}}
                                name='rails'
                                active={activeItem === 'rails'}
                                onClick={this.handleItemClick}> 
                                @ Rails
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher onClick={this.hideSidebar}>
                    <NavBar {...this.props} toggleVisibility={this.toggleVisibility} />
                    <Route path={`${this.props.match.url}/dashboard`} component={Dashboard} />
                    <Route path={`${this.props.match.url}/project/:project`} component={Project} />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

const mapStateToProps = (state) => {
    return {sidebar: state.sidebarReducer};
}

const mapDispatchToProps = {
    changeVisible
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);