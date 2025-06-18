import React, { useEffect, useState } from 'react';
import './SearchBar.css';

function SearchBar({
  websiteVideos,
  userVideos,
  YOUTUBE_API_KEY
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [youtubeResults, setYoutubeResults] = useState([]);
  const [isFetchingYoutube, setIsFetchingYoutube] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Debounce searchTerm
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm.trim() === '') {
      setFilteredVideos([]);
      setYoutubeResults([]);
      setShowSearchResults(false);
      return;
    }
    const combined = [...websiteVideos, ...userVideos];
    const results = combined.filter(video =>
      video.title && video.title.toLowerCase().includes(debouncedTerm.toLowerCase())
    );
    setFilteredVideos(results);
    setShowSearchResults(true);

    if (results.length === 0 && YOUTUBE_API_KEY) {
      setIsFetchingYoutube(true);
      fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(
          debouncedTerm
        )}&key=${YOUTUBE_API_KEY}`
      )
        .then(res => res.json())
        .then(data => {
          setYoutubeResults(data.items || []);
          setIsFetchingYoutube(false);
        })
        .catch(() => {
          setYoutubeResults([]);
          setIsFetchingYoutube(false);
        });
    } else {
      setYoutubeResults([]);
    }
  }, [debouncedTerm, YOUTUBE_API_KEY, websiteVideos, userVideos]);

  return (
    <div className="searchbar-container" style={{ position: "relative" }}>
      <input
        type="text"
        placeholder="Search videos"
        className="search-box"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onFocus={() => { if (filteredVideos.length > 0 || youtubeResults.length > 0) setShowSearchResults(true); }}
        onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
      />
      {showSearchResults && (
        <div className="search-results">
          {filteredVideos.length === 0 && !isFetchingYoutube && youtubeResults.length === 0 && (
            <div className="search-no-results">No videos found.</div>
          )}
          {filteredVideos.length > 0 && (
            <ul>
              {filteredVideos.map(video => (
                <li key={video.url}>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {video.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {isFetchingYoutube && (
            <div className="search-loading">Searching YouTube...</div>
          )}
          {youtubeResults.length > 0 && (
            <ul>
              {youtubeResults.map(item => (
                <li key={item.id.videoId}>
                  <a
                    href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={item.snippet.thumbnails.default.url}
                      alt={item.snippet.title}
                      style={{ verticalAlign: 'middle', marginRight: 8 }}
                    />
                    {item.snippet.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;