import React, { Component } from "react";
import { Form, Input, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authSignup } from "../store/actions/authActions";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.onFinish = this.onFinish.bind(this);
  }

  state = {
    username: "",
    email: "",
    password: "",
    confirm: "",
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: [e.target.value] });
  };
  onFinish = (values) => {
    this.setState(values); //values is an object with al values
    const { username, email, password, confirm } = this.state;
    this.props.onAuthSignup(username, email, password, confirm);
  };

  render() {
    const { username, email, password, confirm } = this.state;
    const { error, loading, token } = this.props;
    // Spin
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    if (token) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        {error && <p>{error.message}</p>}
        {loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <Form onFinish={this.onFinish}>
            <Form.Item
              onChange={this.handleChange}
              value={username}
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
              onChange={this.handleChange}
              value={email}
              name="email"
              placeholder="E-mail address"
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
              onChange={this.handleChange}
              value={password}
              name="password"
              placeholder="Password"
              type="password"
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
              onChange={this.handleChange}
              value={confirm}
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
              Already have an account?
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

const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
