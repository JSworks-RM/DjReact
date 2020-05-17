import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import ArticleList from "./containers/ArticleListView";
import ArticleDetail from "./containers/ArticleDetailView";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={ArticleList} />
    <Route exact path="/article/:articleID/" component={ArticleDetail} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
  </Hoc>
);

export default BaseRouter;
