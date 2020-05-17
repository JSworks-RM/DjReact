import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Form, Input, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { authLogin } from "../store/actions/authActions";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.onFinish = this.onFinish.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    username: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFinish = (values) => {
    this.props.onAuthLogin(values.username, values.password);
    this.setState({ username: values.username, password: values.password });
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    // Spin
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const { error, loading, token } = this.props;
    const { username, password } = this.state;
    if (token) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        {error && <p>{this.props.error.message}</p>}
        {loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <Form
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            style={{ marginTop: "40px" }}
          >
            <Form.Item
              onChange={this.handleChange}
              name="username"
              value={username}
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              onChange={this.handleChange}
              name="password"
              value={password}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                style={{ marginRight: "10px", marginTop: "10px" }}
                htmlType="submit"
                loading={loading}
                disabled={loading}
              >
                Login
              </Button>
              or
              <NavLink style={{ marginLeft: "10px" }} to="/signup/">
                Signup
              </NavLink>
            </Form.Item>
          </Form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthLogin: (username, password) =>
      dispatch(authLogin(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
