import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/home/Home";
import Posts from './pages/post/Posts';
import Post from './pages/post/Post';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path='/post' element={<Post />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
