import React, { Component } from "react";
import { Form, Input, Button } from "antd";

import axios from "axios";
import { connect } from "react-redux";

class CustomForm extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit = (value, requestType, articleID) => {
    const title = value.title;
    const content = value.content;
    const postObj = {
      title: title,
      content: content,
    };

    if (this.props.token !== null) {
      axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
      axios.defaults.xsrfCookieName = "csrftoken";
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`,
      };
    }

    switch (requestType) {
      case "post":
        return axios
          .post("http://127.0.0.1:8000/api/", postObj)
          .then((res) => {
            if (res.status === 201) {
              console.log("Props", this.props);
              //this.props.history.push(`/`);
              window.location.href = "/";
            }
          })
          .catch((error) => {
            console.log(error);
          });
      case "put":
        return axios
          .put(`http://127.0.0.1:8000/api/${articleID}/`, postObj)
          .then((res) => {
            if (res.status === 200) {
              //this.props.history.push(`/`);
              window.location.href = `/article/${articleID}`;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      default:
        break;
    }
  };

  render() {
    return (
      <div>
        <Form
          onFinish={(event) =>
            this.handleFormSubmit(
              event,
              this.props.requestType,
              this.props.articleID
            )
          }
          className="ant-form ant-form-vertical"
        >
          <Form.Item name="title" label="Title">
            <Input placeholder="Put a title here." />
          </Form.Item>
          <Form.Item name="content" label="Content">
            <Input placeholder="Enter a content..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {this.props.btnSubmitTxt}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};
export default connect(mapStateToProps)(CustomForm);
