import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { Card, Button } from "antd";
import CustomForm from "../components/Form";

class ArticleDetail extends Component {
  state = {
    article: {},
  };

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const articleID = this.props.match.params.articleID;
    axios.get(`http://127.0.0.1:8000/api/${articleID}/`).then((res) => {
      this.setState({
        article: res.data,
      });
    });
  }

  handleDelete = (e) => {
    e.preventDefault();
    if (this.props.token !== null) {
      const articleID = this.props.match.params.articleID;
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`,
      };
      axios.delete(`http://127.0.0.1:8000/api/${articleID}/`).then((res) => {
        if (res.status === 204) {
          this.props.history.push("/");
        }
      });
    } else {
      // Do some kind of message or logic to show or not delete action
    }
  };

  render() {
    return (
      <Card title={this.state.article.title}>
        <p>{this.state.article.content}</p>
        <br />
        <h2> To update the article </h2>
        <CustomForm
          {...this.props}
          token={this.props.token}
          btnSubmitTxt={"Update"}
          requestType={"put"}
          articleID={this.props.match.params.articleID}
        />
        <form onSubmit={this.handleDelete}>
          <Button type="danger" htmlType="submit">
            Delete
          </Button>
        </form>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};
export default connect(mapStateToProps)(ArticleDetail);
