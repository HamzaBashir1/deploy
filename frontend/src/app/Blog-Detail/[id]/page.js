"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../component/Navbar';
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import Footer from "../../components/Footer/Footer";
import { Base_URL } from '../../config';
import ArticleLayout from '../component/Article';


const Page = ({ params }) => {
    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const router = useRouter(); 
    const { id } = params;

    useEffect(() => {
        if (!id) {
            setError('Invalid URL parameter');
            setLoading(false);
            return;
        }

        const fetchBlogData = async () => {
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${id}`;
            console.log(`Fetching from URL: ${url}`);
            try {
                const response = await fetch(url);
                console.log('API Response:', response);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setBlogData(result);
                console.log("Fetched blogData:", result); // Log after data is set
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchBlogData();
    }, [id]);

    if (loading) {
        return <Loading message="Loading article, please wait..." />; // Add message to Loading
    }

    if (error) {
        return <Error message={error} />;
    }

    return (
        <div>
            <Navbar />
            <section>

                
                <div className="bg-white">
                    <ArticleLayout data={blogData} />
                </div>
                
                
               
            </section>
            <Footer />
        </div>
    );
};

export default Page;
