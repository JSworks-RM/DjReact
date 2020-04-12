import React from 'react'
import 'antd/dist/antd.css'

import CustomLayout from './containers/Layout'
import ArticleList from './containers/ArticleListView'

function App() {
  return (
    <div className="App">
      <CustomLayout>
        <ArticleList />
      </CustomLayout>
    </div>
  );
}

export default App;
