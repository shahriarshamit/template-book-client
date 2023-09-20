import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './routes/Home/home';
import Books from './routes/Books/book';
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
            <Route path="/about" element={<About/>}/>
        </Routes>
        <Footer/>
    </Router>
    </>);
}

export default App
