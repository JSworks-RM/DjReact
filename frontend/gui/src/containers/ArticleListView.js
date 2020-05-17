import React, { Component } from "react";
import Articles from "../components/Article";
import axios from "axios";
import { connect } from "react-redux";

import CustomForm from "../components/Form";

class ArticleList extends Component {
  state = {
    articles: [],
  };

  fetchArticles = () => {
    axios.get("http://127.0.0.1:8000/api/").then((res) => {
      this.setState({
        articles: res.data,
      });
    });
  };

  componentDidMount() {
    this.fetchArticles();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      this.fetchArticles();
    }
  }

  render() {
    return (
      <div>
        <Articles data={this.state.articles} />
        <br />
        <h2> Create an article </h2>
        <CustomForm
          btnSubmitTxt={"Create"}
          requestType={"post"}
          articleID={null}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};
export default connect(mapStateToProps)(ArticleList);
