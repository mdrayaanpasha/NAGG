import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loader } from "lucide-react";

import Navbar from "@/components/ui/nav";
const SingleNews = () => {
  const { cat } = useParams(); // Extract category from URL
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:5000/api/SingleNewsByCategory", {
          category: cat, // Send URL param as req.body.category
        });

        setNews(response.data.news);
      } catch (err) {
        setError("Failed to fetch news.");
      } finally {
        setLoading(false);
      }
    };

    if (cat) fetchNews(); // Fetch only if category exists
  }, [cat]);

  if (loading) return <Loader className="animate-spin mx-auto my-10" size={40} />;
  if (error) return <div className="text-red-500 text-center my-10">{error}</div>;

  return (
    <div className=" px-4 py-8">
      <Navbar></Navbar>
      {/* Fixed Category Header */}
   

      {/* News Grid */}
      <div className="space-y-8 mt-16 flex flex-col items-center justify-center">
        {news.map((article, index) => (
          <div className="w-full md:w-[75vw] min-h-[90vh] flex flex-col bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-3xl overflow-hidden"> 
          {/* Image Section */}
            <div className="w-full h-[40vh] flex-shrink-0">
              <img
                src={article.urlToImage || "/placeholder.jpg"}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-between p-6 flex-grow">
              <h2 className="text-2xl font-bold text-gray-900">{article.title}</h2>
              <p className="mt-3 text-gray-700 text-md">{article.description || "No description available."}</p>

              {/* Footer */}
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">Source: {article.source?.name || "Unknown"}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
                    Read More
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleNews;
