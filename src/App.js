import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import BookPage from './pages/book/BookPage';
import BookDetailPage from './pages/book/BookDetailPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={BookPage} />
      <Route path="/book/:id" component={BookDetailPage} />
    </Switch>
  );
}

export default App;
