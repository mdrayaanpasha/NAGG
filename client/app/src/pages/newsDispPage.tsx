import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import Navbar from "@/components/ui/nav";

const NewsFeed = () => {
  if(!localStorage.getItem("token")){
    alert("login first")
    window.location.href = "/login";
  }
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:5000/api/getCategories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data.categories.categories)
        if (response.data.categories && Array.isArray(response.data.categories)) {
          const validCategories = response.data.categories.filter(
            (category) => category && category.trim() !== ""
          );
          setCategories(validCategories);
          console.log("valid cat: ", validCategories)
          console.log("Fetched categories:", validCategories);
        }
      } catch (err) {
        console.error("❌ Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const fetchNews = async (category) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found.");
      setLoading(false);
      return;
    }
    
    try {
        const response = await axios.post(
            "http://localhost:5000/api/newsByCategory",
            { category},
            { headers: { Authorization: `Bearer ${token}` } }
        );
    
      console.log("Fetched news for category:", category, response.data.news);

      setNews(response.data.news);
    } catch (err) {
      setError("Failed to fetch news.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(categories.length > 0) {
    fetchNews(categories);
    }
  }, [categories]);

  if (loading) {
    return <Loader className="animate-spin mx-auto my-10" size={40} />;
  }

  if (error) {
    return <div className="text-red-500 text-center my-10">{error}</div>;
  }

  return (
    <div className="mx-auto px-4 py-8">
      <div className="flex space-x-4 mb-6 shadow-md overflow-x-auto pb-2 fixed top-0 left-0 right-0 bg-white z-10 p-3 items-center justify-center">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={(e)=>{window.location.href=`./category/${category}`}}
            className={`bg-black shadow-md text-white py-2 px-4 rounded-full text-sm font-medium focus:outline-none hover:cursor-pointer ${
              selectedCategory === category ? "bg-gray-800" : ""
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-8 mt-10 flex flex-col items-center justify-center">
        {news.map((article, index) => (
          <div
            key={index}
            className="w-full md:w-[75vw] flex flex-col bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-3xl overflow-hidden"
          >
            <div className="w-full h-[45vh] flex-shrink-0">
              <img
                src={article.urlToImage || "/placeholder.jpg"}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-between p-6 flex-grow">
              <h2 className="text-2xl font-bold text-gray-900">{article.title}</h2>

              <p className="mt-3 text-gray-700 text-md">
                {article.description || "No description available."}
              </p>

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

export default NewsFeed;