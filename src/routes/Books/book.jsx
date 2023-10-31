import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Books() {
    const baseUrl = 'http://localhost:8001/api/v1/books';
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(function () {
        const fetchData = async function () {
            try {
                let url = baseUrl;
                if (selectedCategory) {
                    url += `?category=${selectedCategory}`
                }
                const response = await fetch(url);
                if (!response.ok) {
                    setIsError('Error: Data fetch failed. Please try again later.');
                    setIsLoading(false);
                } else {
                    const apiResponse = await response.json();
                    const booksData = apiResponse.data;
                    setData(booksData);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
                setIsError('Error: fetching data. Please try again later.');
                setIsLoading(false);
            }
        };
        fetchData();
    }, [selectedCategory]);

    return (<section>
        <h1>Books List</h1>
        <div className="panel">
            <div className="col-1">
                <label>Categories</label>
                <select className="filters" onChange={function (e) {
                            setSelectedCategory(e.target.value)
                                }}>
                    <option value="">All</option>
                    <option value="romance">Romance</option>
                    <option value="science">Science</option>
                    <option value="crime">Crime</option>
                    <option value="food">Food</option>
                    <option value="adventure">Adventure</option>
                    <option value="thriller">Thriller</option>
                    <option value="fiction">Fiction</option>
                    <option value="other">other</option>
                </select>
            </div>
            <div className="col-2">
                <Link className={"book-create"} to="/books/add">+ Add New Book</Link>
            </div>
        </div>
        {isLoading ? (<p>Loading</p>) : isError ? ({isError}) :
                        (<ul className="books">
                            {data.map(function (item) {
                                                        return (<li key={item._id}>
                                                            <Link to={`/books/${item.slug}`}>
                                                            <img src={`http://localhost:8000/uploads/${item.thumbnail}`} alt={item.title}/>
                                                            <h3>{item.title}</h3>
                                                            </Link>
                                                        </li>);
                                                    })}
                        </ul>)}
    </section>);
}

export default Books;