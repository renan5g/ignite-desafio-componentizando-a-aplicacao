import { useEffect, useState } from 'react';

import { api } from '../services/api';

import { Button } from './Button';

import '../styles/sidebar.scss';
import { useMovies } from '../hooks/useMovies';

export function SideBar() {
  const { genres, selectedGenreId, toggleSelectedGenre } = useMovies();

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => toggleSelectedGenre(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
