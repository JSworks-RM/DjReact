import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Form, Input, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { authLogin } from "../store/actions/authActions";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.onFinish = this.onFinish.bind(this);
  }

  onFinish = (values) => {
    console.log("Success:", values);
    this.props.onAuthLogin(values.username, values.password);
    this.props.history.push("/");
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  render() {
    // Spin
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }
    return (
      <div>
        {errorMessage}
        {this.props.loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <Form
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            style={{ marginTop: "40px" }}
          >
            <Form.Item
              name="username"
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
              name="password"
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

const mapStateToPtops = (state) => {
  return {
    loading: state.loading,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthLogin: (username, password) =>
      dispatch(authLogin(username, password)),
  };
};

export default connect(mapStateToPtops, mapDispatchToProps)(LoginForm);
