import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'dne38mnjz',
  api_key: '412794596396593',
  api_secret: 'SyoRXUsUvEs1tEc4O4U2hrJGovc',
});

export const GET = async () => {
  try {
    // Fetch all anime folders from Cloudinary
    const folders = await cloudinary.v2.api.sub_folders('anime'); // Fetch sub-folders inside 'anime'

    if (!folders.folders || folders.folders.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'No anime found' }),
        { status: 404 }
      );
    }

    // Fetch anime data for each folder
    const animeDataPromises = folders.folders.map(async (folder) => {
      const animeTitle = folder.name;

      // Fetch cover image separately using a search with folder and public_id 'cover'
      const coverImageRes = await cloudinary.v2.api.resources({
        type: 'upload',
        prefix: `anime/${animeTitle}/cover`, // Fetch only the cover image
        resource_type: 'image',
        max_results: 1, // We only need the cover image
      });

      const coverImage = coverImageRes.resources[0]?.secure_url || ''; // Get cover image or fallback to empty string

      // Fetch all videos (episodes) inside the folder
      let episodes = [];
      let nextCursor = null;
      
      // Handling pagination for episodes
      do {
        const resources = await cloudinary.v2.api.resources({
          type: 'upload',
          prefix: `anime/${animeTitle}`, // Get all resources in the anime folder
          resource_type: 'video', // Fetch only videos
          max_results: 100, // Cloudinary default is 10, max is 500
          next_cursor: nextCursor, // Handle pagination
        });

        episodes = [
          ...episodes,
          ...resources.resources
            .filter((ep) => !ep.public_id.includes('cover')) // Exclude the cover image
            .map((ep) => ({
              title: ep.public_id.split('/').pop(), // Extract episode title from public_id
              url: ep.secure_url, // Use secure_url to get the video URL
            })),
        ];

        nextCursor = resources.next_cursor; // Update next cursor if there are more results
      } while (nextCursor); // Keep fetching while there's a next page

      return {
        animeTitle,
        coverImage,
        episodes,
      };
    });

    const animeData = await Promise.all(animeDataPromises);

    return new Response(JSON.stringify({ success: true, data: animeData }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching anime data:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Failed to fetch anime data' }),
      { status: 500 }
    );
  }
};