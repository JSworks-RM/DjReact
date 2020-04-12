import React from 'react'
import { Route } from 'react-router-dom'

import ArticleList from './containers/ArticleListView'
import ArticleDetail from './containers/ArticleDetailView'

const BaseRouter = () => (
    <div>
        <Route path='/' exact component={ArticleList} />
        <Route path='/:articleID' exact component={ArticleDetail} />
    </div>
)

export default BaseRouter