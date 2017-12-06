import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {
    Sidebar,
    Button,
    Menu,
    Image,
    Icon,
    Header,
    Modal,
    Dropdown
} from 'semantic-ui-react';
import { changeVisible } from './SidebarActions';
import Estimate from '../estimate/Estimate';
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
    // toggleVisibility = () => this.props.changeVisible(!this.props.sidebar.visibleSidebar)

    hideSidebar = () => this.props.sidebar.visibleSidebar ? this.props.changeVisible(false) : ''

    handleItemClick = name => {
        sessionStorage.current_project = name;
        this.setState({activeItem: name});
        this.hideSidebar();
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
        var trigger = (
            <Header style={{color: 'white', marginBottom: 0}} as='h1'> 
                <Image centered circular='true' size={'small'} style={{borderRadius: '50%'}} src='https://react.semantic-ui.com/assets/images/avatar/large/patrick.png' />
                {' '}{this.props.match.params.company}
            </Header>
        );
        return (
                <Sidebar
                    as={Menu}
                    animation='push'
                    visible={this.props.sidebar.visibleSidebar}
                    vertical
                    inverted
                    style={{
                        width: 260, paddingBottom: '1em', background: '#18222a'
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
                                
                            <Icon name='dashboard' style={{float: 'left', marginRight: 10, marginLeft: 30}} />Dashboard   
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
                                    <Icon name='rocket' style={{float: 'left', marginRight: 10}} /> {project.project_name}
                                </Menu.Item>
                            ))}
                        </Menu.Menu>
                    </Menu.Item>
                    <Menu.Item>
                        <Menu.Header>
                            <div style={{display: 'inline-block', fontSize: 19}}>Activity</div>
                        </Menu.Header>

                        <Menu.Menu>
                            {this.state.projects.map(project => (
                                <Menu.Item 
                                    key={project._id}
                                    style={{fontSize: 15}}
                                    name={project.project_name + '_activity'}
                                    active={activeItem === project.project_name + '_activity'}
                                    onClick={this.handleItemClick.bind(this, project.project_name + '_activity')}
                                    as={Link} to={`${this.props.match.url}/activity/${project.project_name}`}> 
                                    <Icon name='rocket' style={{float: 'left', marginRight: 10}} /> {project.project_name}
                                </Menu.Item>
                            ))}
                        </Menu.Menu>
                    </Menu.Item>
                </Sidebar>
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