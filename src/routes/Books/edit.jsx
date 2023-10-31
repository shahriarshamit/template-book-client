import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";

import NoImageSelected from "../../assets/no-image-selected.jpg";

function BookEdit() {
    const baseUrl = 'http://localhost:8001/api/v1/books';
    const paramUrl = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [submitted, setSubmitted] = useState("");
    const [isError, setIsError] = useState(null);

    const [bookId, setBookId] = useState("");
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [stars, setStars] = useState(0);
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [image, setImage] = useState("");

    const fetchData = async () => {
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
                    setBookId(booksData._id);
                    setTitle(booksData.title);
                    setSlug(booksData.slug);
                    setStars(booksData.stars);
                    setCategories(booksData.category);
                    setDescription(booksData.description);
                    setThumbnail(booksData.thumbnail);
                    setIsLoading(false);
                }
            }
        } catch (error) {
            console.log(error);
            setIsError('Error: Data fetch failed. Please try again later.');
            setIsLoading(false);
        }
    };

    const updateBook = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("bookId", bookId);
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("stars", stars);
        formData.append("description", description);
        formData.append("category", categories);
        formData.append("thumbnail", thumbnail);
        try {
            const response = await fetch("http://localhost:8000/api/books/" + bookId, {
                method: "PUT",
                body: formData
            });
            if (response.ok) {
                setTitle("");
                setSlug("");
                setSubmitted(true);
            } else {
                console.log("Failed to submit data.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCategoryChange = (e) => {
        setCategories(e.target.value.split(",").map((category) => category.trim()));
    };

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setThumbnail(e.target.files[0]);
        }
    };

    const removeBook = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/books/" + bookId, {
                method: "DELETE"
            });

            if (response.ok) {
                navigate("/books");
                console.log("Book removed.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(function () {
        fetchData();
    }, []);

    return (<section>
        <h1>Edit Book</h1>
    
        {isLoading ? (<p>Loading</p>) : isError ? ({isError}) : (<p>Edit Book</p>)}
    </section>);
}

export default BookEdit;