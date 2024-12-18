import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const ArticleList = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articlesResponse = await axios.get("http://localhost:5000/api/posts/category/Style");
        setNewsData(articlesResponse.data.posts);
        setLoading(false);
      } catch (error) {
        setError("Failed to load news");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const filteredNewsData = newsData.filter(newsItem => newsItem.category?.name === 'Style');
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredNewsData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredNewsData.length / postsPerPage);

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-6">
        {currentPosts.map((article, index) => {
          const formattedDate = article.createdAt
            ? format(new Date(article.createdAt), 'MMMM dd, yyyy')
            : 'No Date Available';

          return (
            <div key={index} className="flex items-start bg-white p-4 border rounded-md shadow-md">
              <img
                src={article.image || 'https://via.placeholder.com/150'}
                alt={article.title}
                className="w-1/3 h-auto object-cover"
              />
              <div className="pl-4 w-2/3">
                <span className="text-xs font-semibold uppercase text-white bg-black px-2 py-1 mb-2 inline-block hover:bg-blue-400">
                  {article.category?.name || 'Uncategorized'}
                </span>
                <h2 className="text-sm md:text-xl font-semibold mb-2 hover:text-blue-500">{article.title}</h2>
                <span className="text-xs text-black mb-2 font-bold">By {article.author || 'Unknown Author'}</span>
                <span className="text-xs"> - {formattedDate}</span>
                <p className="text-gray-700 hidden md:block">
                  {article.content || 'No description available.'}
                </p>
              </div>
              <div className="flex justify-end">
                <span className="text-xs bg-gray-800 text-white rounded-full px-2 py-1 items-center hidden md:flex">
                  {article.views || 0}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          className="bg-blue-500 text-white p-2 rounded"
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          Previous
        </button>

        <div className="flex items-center">
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <button
          className="bg-blue-500 text-white p-2 rounded"
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ArticleList;
