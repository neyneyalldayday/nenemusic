




export const getSpotifyToken = async () => {
    try {
        
        const clientId = '85253b48527d495cb850a265dc3606f3';
        const clientSecret = '319bf8f970d04de58b321b3ed4bd05e4';
        const credentials = btoa(`${clientId}:${clientSecret}`);

        console.log(credentials,"================")
        
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${credentials}`
            },
            body: 'grant_type=client_credentials'
        });

        if (!response.ok) {
            throw new Error(`Spotify API error:  ${response.status}`);

        }

        const data = await response.json();

        return data.access_token
        
    } catch (err) {
        console.error("failed to get spotify token",err);
        throw err;
        
    }
}