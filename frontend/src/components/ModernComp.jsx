import React, { useState, useEffect } from 'react';


const ModernSection = () => {
  const [posts, setPosts] = useState([]); 

  useEffect(() => {
    
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts/category/MakeitModern");
        const data = await response.json();
  
        setPosts(data.posts);  
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();  // Call the fetch function when the component mounts
  }, []);  // Empty dependency array to only run on mount

  return (
    <div className="container mx-auto p-6">
      {/* Section Title */}
      <div className="border-b mb-4 pb-2">
        <h2 className="text-white text-sm bg-black inline-block p-2">MAKE IT MODERN</h2>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
        {/* Map over the posts and display each one */}
        {posts.map((article) => (
          <div key={article._id} className="flex flex-col relative">
            {/* "Make it Modern" label */}
            <div className="relative">
              <span style={{ fontSize: '10px' }} className="absolute bottom-0 left-0 text-xs bg-black text-white px-2 py-1 hover:bg-blue-500 rounded-sm">
                Make it Modern
              </span>
              <img
                src={article.imgSrc || 'default-image.jpg'}  // Use default image if none provided
                alt={article.altText || article.title}  // Fallback to title if altText is missing
                className="w-full h-48 object-cover"  // Ensure the image covers the space
              />
            </div>

            {/* Article title */}
            <div className="mt-2">
              <h3 className="mt-2 text-sm hover:text-blue-500">
                {article.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModernSection;
