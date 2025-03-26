import React , { useEffect, useState }from 'react'
 
import { getSpotifyToken } from '../../Api/spotifyApi'

const Hero = () => {
    const [artistData, setArtistData] = useState(null)

  const fetchArtistData = async () => {
    try {

        const token = await getSpotifyToken();
        const response = await fetch('https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb', {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        });

        if (!response.ok) {
            throw new Error(`Artist fetch failed: ${response.status}`);
          }

          const data = await response.json();
          setArtistData(data)

        console.log("stuff",data)
      
        
    } catch (err) {
        console.error("trouble in paradise", err)
        
    }



} 


useEffect(() => {
    fetchArtistData()
}, [])
  return (
    <div>
        {artistData && (
        <div>
          <h2>{artistData.name}</h2>
          <img 
            src={artistData.images[0]?.url} 
            alt={artistData.name}
            style={{ height: '200px' }}
          />
          <p>Followers: {artistData.followers.total.toLocaleString()}</p>
        </div>
      )}
    </div>
  )
}

export default Hero