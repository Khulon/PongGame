import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './test';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:chatId/:userId/:messageId/:inlineMessageId" element={<Test/>} />
      </Routes>
    </Router>
  );
};
export default App;
