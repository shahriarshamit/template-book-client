import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';

function BookSingle() {
    const baseUrl = 'http://localhost:8000/api/v1/books';
    const paramUrl = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);

    useEffect(function () {
        const fetchData = async function () {
            try {
                let url = baseUrl;
                if (!paramUrl.slug) {
                    setIsError('Error: Missing slug. Please try again with proper url.');
                    setIsLoading(false);
                } else {
                    url = url + '/' + paramUrl.slug;
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
                }
            } catch (error) {
                console.log(error);
                setIsError('Error: Data fetch failed. Please try again later.');
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    function StarRating( {numberOfStars}) {
        const stars = [];
        for (let i = 0; i < numberOfStars; i++) {
            stars.push(<span key={i}>⭐</span>);
        }
        return (<div>Rating: {stars}</div>);
    }

    return (<section>
        { isLoading ? (<p>Loading</p>) : isError ? ({isError}) :
                        (<div>
                            <Link to={"/books"}>🔙 Books</Link>
                            <div className="book-details">
                                <div className="col-1">
                                    <img src={`http://localhost:8000/uploads/${data?.thumbnail}`} alt={data?.title} />
                                    <Link to={`/books/edit/${data.slug}`}>Edit</Link>
                                </div>
                                <div className="col-2">
                                    <h1>{data?.title}</h1>
                                    <p>{data?.description}</p>
                                    <StarRating numberOfStars={data?.stars} />
                                    <p>Category</p>
                                    <ul>
                                        {data?.category?.map(function (item, index) {
                                                                    return (<li key={index}>{item}</li>)
                                                                })}
                                    </ul>
                                </div>
                            </div>
                        </div>)}
    </section>);
}

export default BookSingle;