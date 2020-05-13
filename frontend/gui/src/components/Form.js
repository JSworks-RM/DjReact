import React, { Component } from "react";
import { Form, Input, Button } from "antd";

import axios from "axios";

class CustomForm extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit = (value, requestType, articleID) => {
    const title = value.title;
    const content = value.content;

    switch (requestType) {
      case "post":
        return axios
          .post("http://127.0.0.1:8000/api/", {
            title: title,
            content: content,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      case "put":
        return axios
          .put(`http://127.0.0.1:8000/api/${articleID}/`, {
            title: title,
            content: content,
          })
          .then((res) => {
            console.log(res);
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

export default CustomForm;
