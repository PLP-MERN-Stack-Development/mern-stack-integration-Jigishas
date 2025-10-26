import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PostList from './pages/postlistview';
import SinglePostView from './pages/singlepostview';
import CreateEditForm from './pages/Createform';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:postId" element={<SinglePostView />} />
          <Route path="/create" element={<CreateEditForm />} />
          <Route path="/edit/:postId" element={<CreateEditForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
