import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

function WeatherForecast() {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = '11b77f617b594dce935211441241909'; // Replace with your WeatherAPI key
        const city = 'Bratislava'; // Specify the city

        // Fetch weather data for the next 5 days
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`);
        const forecastData = response.data.forecast.forecastday;

        const formattedDays = forecastData.map((data) => {
          const date = new Date(data.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
          const dayName = new Date(data.date).toLocaleDateString('en-GB', { weekday: 'long' });
          const temp = `${data.day.avgtemp_c}°C`;
          const icon = data.day.condition.icon;

          return {
            date,
            day: dayName,
            temp,
            icon: `http:${icon}`, // Prefix with `http:` for the icon URL
            isToday: date === new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
          };
        });

        setDays(formattedDays);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Unable to fetch weather data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="p-6 my-10 bg-white rounded-lg shadow-lg lg:mr-[440px] lg:ml-[18px]">
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">Current weather</h2>
          <p className="text-gray-600">Weather forecast for the next few days</p>
        </div>

        {/* Container for horizontal scroll on small screens */}
        <div className="overflow-x-auto">
          <div className="flex gap-4 md:grid md:grid-cols-3 lg:grid-cols-5">
            {days.map((day, index) => (
              <div
                key={index}
                className={`min-w-[120px] p-4 rounded-lg flex-shrink-0 flex flex-col items-center justify-center ${
                  day.isToday ? 'border-2 border-gray-400 bg-gray-50' : 'bg-gray-100'
                }`}
              >
                <div className="text-sm font-semibold text-gray-700">{day.date}</div>
                <div className="text-xs text-gray-500">{day.day}</div>
                <div className="my-2 text-4xl">
                  <img src={day.icon} alt="Weather icon" className="w-12 h-12" />
                </div>
                <div className="text-lg font-bold text-gray-800">{day.temp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherForecast;
