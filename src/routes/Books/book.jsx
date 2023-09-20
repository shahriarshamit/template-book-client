import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Books() {
    const baseUrl = 'http://localhost:8000/api/v1/books';
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
                    throw new Error('Data fetch failed');
                }
                const apiResponse = await response.json();
                const booksData = apiResponse.data;
                setData(booksData);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsError('Error fetching data. Please try again later.');
                setIsLoading(false);
            }
        };
        fetchData();
    }, [selectedCategory]);

    return (<section>
        <h1>Books</h1>
        <p>Books Page Content</p>
        <h2>Books List</h2>
        <div className="filters">
            <label>Categories</label>
            <select onChange={function (e) {
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
        { isLoading ?
                        (<p>Loading</p>) :
                        isError ?
                    ({isError}) :
                            (<ul className="books">
                            {data.map(function (item) {
                                                    return (<li key={item._id}>
        <Link to={`/books/${item.slug}`}>
        <img src={`http://localhost:8000/uploads/${item.thumbnail}`} alt={item.title}/>
        <h3>{item.title}</h3>
        </Link>
    </li>)
                                                })}
                        </ul>)}
    </section>);
}

export default Books;