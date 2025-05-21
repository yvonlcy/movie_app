import React, { useContext, useState, useEffect } from 'react';
import BannerSingle from '../BannerSingle/BannerSingle';
import { MasterContext } from '../../../context/MasterContext';
import { MovieType } from '@/types/MovieType';

const Banner = () => {
    const { movies, error } = useContext(MasterContext) as { movies: MovieType[]; error: Error | null };
    const TOTAL_ITEMS = 6;
    const [currentItem, setCurrentItem] = useState(1);
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        // Reset countdown when currentItem changes
        setCountdown(5);
        const interval = setInterval(() => {
            setCurrentItem(prev => prev === TOTAL_ITEMS ? 1 : prev + 1);
            setCountdown(5);
        }, 5000);
        const countdownInterval = setInterval(() => {
            setCountdown(prev => prev > 0.05 ? +(prev - 0.05).toFixed(2) : 0);
        }, 250);
        return () => {
            clearInterval(interval);
            clearInterval(countdownInterval);
        };
    }, [currentItem]);

    return (
      <>
        {error && (
          <div className="w-full bg-red-100 text-red-800 p-4 mb-4 rounded">
            Error loading movies: {error.message}
          </div>
        )}
        <div className="carousel w-full relative">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
            <div
              className="h-1 bg-blue-500 transition-all duration-200"
              style={{ width: `${(countdown / 5) * 100}%` }}
            />
          </div>
          {/* Only render the active banner for performance */}
          {movies.length > 0 && movies.slice(0, TOTAL_ITEMS).map((movie, index) => (
            index + 1 === currentItem && (
              <BannerSingle
                movie={movie}
                key={movie.id}
                isActive={true}
              />
            )
          ))}
          {/* Fallback if no movies */}
          {movies.length === 0 && (
            <div className="carousel-item w-full">
              <span className="w-full flex justify-center items-center h-60 bg-gray-200 text-gray-600">No movies found</span>
            </div>
          )}
        </div>
        {/* Navigation Buttons */}
        <div className="flex w-full justify-center gap-2 py-2">
          {[...Array(TOTAL_ITEMS)].map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`btn btn-xs ${currentItem === idx + 1 ? 'btn-primary' : ''}`}
              onClick={() => setCurrentItem(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </>
    );
}


export default Banner;