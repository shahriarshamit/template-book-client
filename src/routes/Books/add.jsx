import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import NoImageSelected from "../../assets/no-image-selected.jpg";

function BookAdd() {
    const baseUrl = 'http://localhost:8001/api/v1/books/add';
    
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(null);

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [stars, setStars] = useState(0);
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [thumbnail, setThumbnail] = useState(NoImageSelected);
    const [image, setImage] = useState(NoImageSelected);

    const createBook = async function (event) {
        event.preventDefault();
        try {
            const response = await fetch(baseUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "title": title,
                    "slug": slug,
                    "stars": stars,
                    "description": description,
                    "category": categories,
                    "thumbnail": thumbnail
                })
            });
            if (response.ok) {
                setTitle("");
                setSlug("");
                setStars(0);
                setDescription("");
                setCategories("");
                setThumbnail(NoImageSelected);
                setIsSubmitted(true);
            } else {
                setIsError('Error: Data submit failed. Please try again later.');
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsError('Error: Page load failed. Please try again later.');
            setIsLoading(false);
        }
    };

    const handleSlugGenerate = function (title) {
        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        setSlug(slug);
    };

    const handleCategoryChange = function (event) {
        setCategories(event.target.value.split(",").map(function (category) {
            return category.trim();
        }));
    };

    const handleImageChange = function (event) {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            setThumbnail(event.target.files[0]);
        }
    };

    return (<section>
    <h1>Add New Book</h1>
    <Link to={"/books"}>🔙 Book List</Link>
    {(isSubmitted) ? (<p>Successfully Submitted</p>) : ("") }
    <form className="book-details" onSubmit={createBook}>
        <div className="col-1">
            <label>Upload Thumbnail</label>
            <img src={image} alt="preview image" />
            <input onChange={handleImageChange} type="file" accept="image/gif, image/jpeg, image/png" />
        </div>
        <div className="col-2">
            <div>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} onKeyUp={(e) => handleSlugGenerate(e.target.value)} />
            </div>
            <div>
                <label>Slug</label>
                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} />
            </div>
            <div>
                <label>Stars</label>
                <input type="text" value={stars} onChange={(e) => setStars(e.target.value)} />
            </div>
            <div>
                <label>Description</label>
                <textarea rows="4" cols="50" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Categories (comma-seperated)</label>
                <input type="text" value={categories} onChange={handleCategoryChange} />
            </div>
            <input type="submit" value="Save Book" />
        </div>
    </form>
</section>);
}

export default BookAdd;