import React, { Component } from "react";
import axios from "axios";

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
    axios.get(`http://127.0.0.1:8000/api/${articleID}`).then((res) => {
      this.setState({
        article: res.data,
      });
    });
  }

  handleDelete = (e) => {
    const articleID = this.props.match.params.articleID;
    axios.delete(`http://127.0.0.1:8000/api/${articleID}`);
    this.props.history.push("/");
    this.forceUpdate();
  };

  render() {
    return (
      <Card title={this.state.article.title}>
        <p>{this.state.article.content}</p>
        <br />
        <h2> To update the article </h2>
        <CustomForm
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

export default ArticleDetail;
