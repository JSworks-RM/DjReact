import React, { Component } from "react";
import { Form, Input, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { authSignup } from "../store/actions/authActions";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.onFinish = this.onFinish.bind(this);
  }
  onFinish = (values) => {
    console.log("Received values of form: ", values);
    this.props.onAuthSignup(
      values.username,
      values.email,
      values.password,
      values.confirm
    );
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
          <Form onFinish={this.onFinish}>
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
              name="email"
              placeholder="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
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
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
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
                Signup
              </Button>
              or
              <NavLink style={{ marginLeft: "10px" }} to="/login/">
                Login
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
    onAuthSignup: (username, email, password, confirm) =>
      dispatch(authSignup(username, email, password, confirm)),
  };
};

export default connect(mapStateToPtops, mapDispatchToProps)(RegistrationForm);
