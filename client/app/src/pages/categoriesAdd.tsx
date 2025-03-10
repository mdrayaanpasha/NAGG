"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import Navbar from "@/components/ui/nav";

const allCategories = [
  { "name": "Business", "emoji": "💼" }, { "name": "Entertainment", "emoji": "🎭" }, { "name": "Health", "emoji": "⚕️" }, { "name": "Science", "emoji": "🔬" }, { "name": "Sports", "emoji": "⚽" }, { "name": "Technology", "emoji": "💻" }, { "name": "Education", "emoji": "📚" }, { "name": "Travel", "emoji": "✈️" }, { "name": "Food", "emoji": "🍽️" },
  { "name": "Fashion", "emoji": "👗" }, { "name": "Music", "emoji": "🎶" }, { "name": "Art", "emoji": "🎨" }, { "name": "Gaming", "emoji": "🎮" }, { "name": "Fitness", "emoji": "💪" },
  { "name": "Nature", "emoji": "🌳" }, { "name": "Photography", "emoji": "📷" }, { "name": "History", "emoji": "🏛️" }, { "name": "Politics", "emoji": "🏛️" }, { "name": "Finance", "emoji": "💰" },
  { "name": "Automotive", "emoji": "🚗" }, { "name": "Space", "emoji": "🚀" }, { "name": "Movies", "emoji": "🎬" }, { "name": "Books", "emoji": "📖" }, { "name": "Cooking", "emoji": "👨‍🍳" }, { "name": "DIY", "emoji": "🛠️" }, { "name": "Gardening", "emoji": "🌱" },
  { "name": "Animals", "emoji": "🐾" }, { "name": "Adventure", "emoji": "⛰️" }, { "name": "Beauty", "emoji": "💄" }, { "name": "Comedy", "emoji": "😂" }, { "name": "Dance", "emoji": "💃" },
  { "name": "Design", "emoji": "✏️" }, { "name": "Environment", "emoji": "🌍" }, { "name": "Family", "emoji": "👨‍👩‍👧" }, { "name": "Hobbies", "emoji": "🎲" }, { "name": "Lifestyle", "emoji": "🏡" }, { "name": "News", "emoji": "📰" }, { "name": "Philosophy", "emoji": "🤔" }, { "name": "Psychology", "emoji": "🧠" }, { "name": "Relationships", "emoji": "💑" }, { "name": "Spirituality", "emoji": "🧘" }, { "name": "Writing", "emoji": "🖋️" }, { "name": "Astronomy", "emoji": "🌌" }, { "name": "Architecture", "emoji": "🏠" }, { "name": "Engineering", "emoji": "⚙️" }, { "name": "Mathematics", "emoji": "➗" }, { "name": "Physics", "emoji": "⚛️" }, { "name": "Chemistry", "emoji": "🧪" }, { "name": "Biology", "emoji": "🧬" }, { "name": "Medicine", "emoji": "💊" }, { "name": "Law", "emoji": "⚖️" }, { "name": "Economics", "emoji": "📈" }, { "name": "Marketing", "emoji": "📣" }, { "name": "Advertising", "emoji": "🖼️" }, { "name": "Social Media", "emoji": "📱" }, { "name": "Cybersecurity", "emoji": "🔒" }, { "name": "AI", "emoji": "🤖" }, { "name": "Robotics", "emoji": "🦾" }, { "name": "Virtual Reality", "emoji": "🥽" }, { "name": "Animation", "emoji": "🎞️" }, { "name": "Theater", "emoji": "🎟️" }, { "name": "Television", "emoji": "📺" }, { "name": "Podcasts", "emoji": "🎙️" }, { "name": "Crafts", "emoji": "✂️" }, { "name": "Sustainability", "emoji": "♻️" }, { "name": "Urban Planning", "emoji": "🏙️" }, { "name": "Transportation", "emoji": "🚆" }, { "name": "Aviation", "emoji": "🛩️" }, { "name": "Marine", "emoji": "⛵" }, { "name": "Weather", "emoji": "⛅" }, { "name": "Geology", "emoji": "🪨" }, { "name": "Archaeology", "emoji": "🗿" }, { "name": "Mythology", "emoji": "📜" }, { "name": "Languages", "emoji": "🗣️" }, { "name": "Culture", "emoji": "🌏" }, { "name": "Events", "emoji": "🎉" }, { "name": "Charity", "emoji": "🤝" }, { "name": "Volunteering", "emoji": "🙋" }, { "name": "Pets", "emoji": "🐶" }, { "name": "Wildlife", "emoji": "🦒" }, { "name": "Hiking", "emoji": "🥾" }, { "name": "Camping", "emoji": "⛺" }, { "name": "Fishing", "emoji": "🎣" }, { "name": "Skiing", "emoji": "⛷️" }, { "name": "Surfing", "emoji": "🏄" }, { "name": "Cycling", "emoji": "🚴" }, { "name": "Running", "emoji": "🏃" }, { "name": "Yoga", "emoji": "🧘‍♀️" }, { "name": "Meditation", "emoji": "🕉️" }, { "name": "Nutrition", "emoji": "🥗" }, { "name": "Mental Health", "emoji": "🧘‍♂️" }, { "name": "Parenting", "emoji": "👶" }, { "name": "Weddings", "emoji": "💍" }, { "name": "Interior Design", "emoji": "🛋️" }, { "name": "Real Estate", "emoji": "🏘️" }, { "name": "Startups", "emoji": "🚀" }, { "name": "Entrepreneurship", "emoji": "💡" }, { "name": "Productivity", "emoji": "⏰" }, { "name": "Motivation", "emoji": "🌟" }, { "name": "Trivia", "emoji": "❓" },
];

export default function Categories() {
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | null }>({ text: '', type: null });
  const [userCategories, setUserCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/getCategories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(response.data.categories)) {
          setUserCategories(response.data.categories);
        } else {
          console.error("API returned non-array categories:", response.data.categories);
          setUserCategories([]);
        }
      } catch (err: any) {
        console.error("Error fetching categories:", err);
        setUserCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const availableCategories = allCategories.filter(({ name }) => {
    if (Array.isArray(userCategories)) {
      return !userCategories.includes(name);
    }
    return true;
  });

  const toggleCategory = (category: string) => {
    setSelected((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const addCategories = async () => {
    if (selected.length === 0) return;
    setLoading(true);
    setMessage({ text: '', type: null });

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/updateCategories",
        { newCategories: selected },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage({ text: "Categories updated!", type: "success" });
      setUserCategories((prev) => [...prev, ...selected]);
      setSelected([]);
    } catch (err: any) {
      setMessage({ text: err.response?.data?.message || "Failed to update categories", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: null });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Navbar />
      <Card className="w-full w-full shadow-lg rounded-xl mt-20">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold mb-2">Refine Your Interests</CardTitle>
        </CardHeader>
        <CardContent>
          {availableCategories.length === 0 ? (
            <div className="text-center text-gray-600 p-4 rounded-md">
              <Check className="mx-auto h-6 w-6 text-green-500 mb-2" />
              <p>All categories added. Splendid!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {availableCategories.map(({ name, emoji }) => (
                <button
                  key={name}
                  onClick={() => toggleCategory(name)}
                  className={cn(
                    "flex items-center justify-center gap-2 px-4 py-2 rounded-3xl border transition-colors duration-200",
                    selected.includes(name)
                      ? "bg-gray-800 text-white hover:bg-gray-700"
                      : "border-gray-300 hover:bg-gray-100"
                  )}
                >
                  <span className="text-lg">{emoji}</span>
                  <span className="text-sm">{name}</span>
                  {selected.includes(name) && <Check className="h-4 w-4" />}
                </button>
              ))}
            </div>
          )}

          <Button
            className="w-full mt-4 flex items-center justify-center fixed bottom-0 left-0 right-0"
            onClick={addCategories}
            disabled={loading || selected.length === 0}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Interests"
            )}
          </Button>

          {message.text && (
            <div
              className={cn(
                "fixed top-4 left-1/2 transform -translate-x-1/2 p-3 rounded-md shadow-md transition-opacity duration-300",
                message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              )}
            >
              {message.text}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}