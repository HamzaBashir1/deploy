"use client";
import { useEffect, useState, useContext } from 'react';
import PropertyCard from './Card';
import { AuthContext } from '../../context/AuthContext.js'; 
import { Base_URL } from '../../config'; 
import Loading from '../../components/Loader/Loading.js';
import { toast } from 'react-toastify';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext); 

    useEffect(() => {
        const fetchFavorites = async () => {
            if (user) {
                try {
                    const response = await fetch(`${Base_URL}/favorite/my-favorites?userId=${user._id}`);
                    const data = await response.json();
                    console.log("Favorites data:", data); // Log to check structure
                    setFavorites(Array.isArray(data.favorites) ? data.favorites : []);
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                    toast.error("Error fetching favorites: " + error.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchFavorites();
    }, [user]);

    const handleRemoveFavorite = async (propertyId) => {
        try {
            const response = await fetch(`${Base_URL}/favorite/remove/${propertyId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user._id,
                    accommodationId: propertyId,
                }),
            });
    
            const result = await response.json();
            if (response.ok) {
                toast.success('Removed from favorites!');
                setFavorites(prevFavorites => prevFavorites.filter(id => id !== propertyId)); // Remove the property from favorites
            } else {
                console.error(result.error);
                toast.error(result.error);
            }
        } catch (error) {
            console.error("Error updating favorite:", error);
            toast.error("Error updating favorite: " + error.message);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
            <p>User: {user ? user.name : "Guest"}</p>
            {favorites.length === 0 ? (
                <p>No favorites found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {favorites.map((property) => (
                        <PropertyCard
                            key={property._id} 
                            property={property}
                            onRemoveFavorite={handleRemoveFavorite} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites
