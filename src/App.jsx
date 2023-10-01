import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './routes/Home/home';
import Books from './routes/Books/book';
import BookSingle from './routes/Books/single';
import BookAdd from './routes/Books/add';
import BookEdit from './routes/Books/edit';
import About from './routes/About/about';

import Header from './components/header';
import Footer from './components/footer';

function App() {
    return (<>
    <Router>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/books" element={<Books/>}/>
            <Route path="/books/add" element={<BookAdd/>}/>
            <Route path="/books/:slug" element={<BookSingle/>}/>
            <Route path="/books/edit/:slug" element={<BookEdit/>}/>
            <Route path="/about" element={<About/>}/>
        </Routes>
        <Footer/>
    </Router>
    </>);
}

export default App
