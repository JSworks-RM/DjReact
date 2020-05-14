import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import { connect } from "react-redux";
import { logout } from "../store/actions/authActions";

const { Header, Content, Footer } = Layout;

const CustomLayout = (props) => {
  console.log(props);
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">
            <Link to="/">Post</Link>
          </Menu.Item>

          {props.isAuthenticated ? (
            <Menu.Item key="2" onClick={props.logout}>
              Logout
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
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(CustomLayout);
