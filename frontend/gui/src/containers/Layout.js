import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import { connect } from "react-redux";
import { logout } from "../store/actions/authActions";

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">
              <Link to="/">Post</Link>
            </Menu.Item>

            {this.props.isAuthenticated ? (
              <Menu.Item key="2" onClick={this.props.logout}>
                <Link to="/login">Logout</Link>
              </Menu.Item>
            ) : (
              <Menu.Item key="2">
                <Link to="/login">Login</Link>
              </Menu.Item>
            )}
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to={"/"}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={"/"}>List</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{ background: "#fff", padding: 24, minHeight: 280 }}
            className="site-layout-content"
          >
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));
