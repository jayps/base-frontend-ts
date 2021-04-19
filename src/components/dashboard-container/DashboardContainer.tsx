import {Link, useHistory, useLocation} from "react-router-dom";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {logout, selectAuth} from "../../features/auth/authSlice";
import {Button, Container, ListGroup, Nav, Navbar} from "react-bootstrap";
import styled from "styled-components";

/**
 * If you want to make the sidebar permanent, so that it doesn't disappear:
 * - Remove the SidebarOverlay.
 * - Change the content width to calc(100vw-250px)
 * - Change the content left to 250px
 * - Change the SidebarLeft to 0 px
 */

export interface DashboardContainerProps {
    children: any;
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Sidebar = styled.div`
  width: 250px;
  position: fixed;
  top: 0;
  left: -250px;
  height: 100vh;
  z-index: 10320;
  background: #e9ecef;
  transition: all 0.3s;

  &.active {
    left: 0;
  }
`;

const Content = styled.div`
  width: 100%;
  min-height: 100vh;
  transition: all 0.3s;
  position: absolute;
  top: 0;
  right: 0;
`;

const SidebarOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  transition: 0.3s;

  &.active {
    background: rgba(0, 0, 0, 0.5);
    width: 100vw;
    z-index: 10310;
  }
`;

const DashboardContainer: React.FC<DashboardContainerProps> = ({children}) => {
    const auth = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    const location = useLocation();
    const history = useHistory();
    const [sidebarActive, setSidebarActive] = React.useState(false);
    const [sidebarClass, setSidebarClass] = React.useState('');

    React.useEffect(() => {
        setSidebarClass(sidebarActive ? 'active' : '');
    }, [sidebarActive]);

    const logoutUser = () => {
        dispatch(logout());
        history.push("/")
    }

    const adminMenuItem = (link: string, title: string, display: boolean = false) => {
        if (!display) {
            return null;
        }

        return (
            <ListGroup.Item action to={link} as={Link} active={location.pathname === link}>
                {title}
            </ListGroup.Item>
        )
    }

    return (
        <Wrapper className="admin-wrapper">
            <SidebarOverlay className={sidebarClass} onClick={() => setSidebarActive(false)}>
                <Sidebar id="sidebar" className={sidebarClass}>
                    <div className="sidebar-header p-3">
                        <h3>Admin Dashboard</h3>
                    </div>
                    <ListGroup>
                        {adminMenuItem("/dashboard", "Home", true)}
                        {adminMenuItem("/users", "Users", auth?.currentUser?.isStaff)}
                        <ListGroup.Item action>
                            Link 3
                        </ListGroup.Item>
                        <ListGroup.Item action>
                            Link 4
                        </ListGroup.Item>
                        <ListGroup.Item action>
                            Link 5
                        </ListGroup.Item>
                        <ListGroup.Item action>
                            Link 6
                        </ListGroup.Item>
                    </ListGroup>
                </Sidebar>
            </SidebarOverlay>
            <Content id="content">
                {/*<button onClick={() => setSidebarActive(!sidebarActive)}>Nav bar</button>*/}
                <Navbar bg="light" expand="lg" fixed={"top"}>
                    <Nav className="mr-auto">
                        <Button
                            variant={"outline-info"}

                            onClick={() => setSidebarActive(!sidebarActive)}>
                            <span className="navbar-toggler-icon"></span>
                        </Button>
                    </Nav>
                    <Navbar.Text>
                        Welcome, {auth?.currentUser?.firstName || auth?.currentUser?.email}. <Button variant="link"
                                                                                                     style={{
                                                                                                         cursor: "pointer",
                                                                                                         padding: 0,
                                                                                                         lineHeight: '1em',
                                                                                                         verticalAlign: 'baseline'
                                                                                                     }}
                                                                                                     onClick={logoutUser}>Logout</Button>
                    </Navbar.Text>
                </Navbar>
                <Container fluid className={"p-3 mt-5"}>
                    {children}
                </Container>
            </Content>
        </Wrapper>
    )
}

export default DashboardContainer;