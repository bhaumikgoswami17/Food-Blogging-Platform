import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const BlogPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
    category: "",
    tags: [],
    cookingTime: "",
    servings: "",
    difficulty: "",
    ingredients: [""],
    instructions: [""],
    tips: "",
    author: "",
    imageUrl: ""
  });

  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    { name: "North Indian", emoji: "🍛" },
    { name: "South Indian", emoji: "🥥" },
    { name: "Bengali", emoji: "🐟" },
    { name: "Gujarati", emoji: "🥗" },
    { name: "Punjabi", emoji: "🧈" },
    { name: "Maharashtrian", emoji: "🌶️" },
    { name: "Rajasthani", emoji: "🏺" },
    { name: "Street Food", emoji: "🍿" },
    { name: "Desserts", emoji: "🍮" },
    { name: "Snacks", emoji: "🥨" },
    { name: "Beverages", emoji: "🥤" },
    { name: "Festival Special", emoji: "🎉" }
  ];

  const difficulties = [
    { level: "Easy", icon: "😊" },
    { level: "Medium", icon: "🤔" },
    { level: "Hard", icon: "😤" }
  ];

  // ---------- Handlers ----------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item))
    }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (index, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove)
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const cloudData = new FormData();
    cloudData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/upload", cloudData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setFormData((prev) => ({ ...prev, imageUrl: res.data.url }));
      setImagePreview(res.data.url);
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("⚠️ Image upload failed. Check backend.");
    }
  };

  const handleSubmit = async () => {
  if (!formData.imageUrl) {
    toast.error("Please upload an image first!", { position: "top-center" }); // ⚠️ Center
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:5000/api/blogs/create",
      formData
    );
    console.log("Blog saved:", res.data);

    toast.success("🎉 Recipe published successfully!", { position: "top-center" }); // ✅ Center

    // reset form
    setFormData({
      title: "",
      subtitle: "",
      content: "",
      category: "",
      tags: [],
      cookingTime: "",
      servings: "",
      difficulty: "",
      ingredients: [""],
      instructions: [""],
      tips: "",
      author: "",
      imageUrl: "",
    });
    setImagePreview(null);
  } catch (err) {
    console.error("Error publishing blog:", err);
    toast.error("❌ Failed to publish blog. Check backend.", { position: "top-center" }); // ❌ Center
  }
};
  return (
    <div className="max-w-3xl mx-auto p-8 mt-16 bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-xl border border-orange-200">
      <h2 className="text-3xl font-bold mb-8 text-orange-600 text-center">
        Create Your Recipe
      </h2>

      {/* Title & Subtitle */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={formData.title}
          onChange={handleInputChange}
          className="border border-orange-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
        />
        <input
          type="text"
          name="subtitle"
          placeholder="Subtitle / Short Description"
          value={formData.subtitle}
          onChange={handleInputChange}
          className="border border-orange-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
        />
      </div>

      {/* Category, Difficulty, Cooking Time & Servings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="border border-orange-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.name} value={c.name}>
              {c.emoji} {c.name}
            </option>
          ))}
        </select>

        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleInputChange}
          className="border border-orange-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
        >
          <option value="">Select Difficulty</option>
          {difficulties.map((d) => (
            <option key={d.level} value={d.level}>
              {d.icon} {d.level}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="cookingTime"
          placeholder="Cooking Time (e.g., 30 mins)"
          value={formData.cookingTime}
          onChange={handleInputChange}
          className="border border-orange-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
        />

        <input
          type="number"
          name="servings"
          placeholder="Servings (e.g., 4)"
          value={formData.servings}
          onChange={handleInputChange}
          className="border border-orange-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
        />
      </div>

      {/* Tags */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add tag"
            className="border border-orange-300 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
          />
          <button
            type="button"
            onClick={addTag}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 rounded-lg hover:scale-105 transition transform"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap mt-3 gap-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full flex items-center gap-1 hover:bg-orange-200 transition"
            >
              {tag}
              <X
                className="cursor-pointer hover:text-red-500"
                size={16}
                onClick={() => removeTag(tag)}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Ingredients & Instructions */}
      <div className="mb-6 space-y-6">
        <div>
          <label className="font-semibold text-orange-600 mb-2 block">
            Ingredients
          </label>
          {formData.ingredients.map((ing, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={ing}
                onChange={(e) =>
                  handleArrayChange(i, e.target.value, "ingredients")
                }
                className="border border-orange-300 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(i, "ingredients")}
                className="text-red-500 font-bold px-2"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("ingredients")}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition transform"
          >
            Add Ingredient
          </button>
        </div>

        <div>
          <label className="font-semibold text-orange-600 mb-2 block">
            Instructions
          </label>
          {formData.instructions.map((ins, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={ins}
                onChange={(e) =>
                  handleArrayChange(i, e.target.value, "instructions")
                }
                className="border border-orange-300 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(i, "instructions")}
                className="text-red-500 font-bold px-2"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("instructions")}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition transform"
          >
            Add Instruction
          </button>
        </div>
      </div>

      {/* Tips & Author */}
      <textarea
        name="tips"
        value={formData.tips}
        onChange={handleInputChange}
        placeholder="Tips"
        className="border border-orange-300 rounded-lg p-4 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
      />
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleInputChange}
        placeholder="Author Name"
        className="border border-orange-300 rounded-lg p-4 mb-6 w-full focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
      />

      {/* Image Upload */}
      <div className="mb-6 flex flex-col items-center">
        <input type="file" onChange={handleImageUpload} className="mb-4" />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-64 rounded-xl shadow-lg border border-orange-200 hover:scale-105 transition transform"
          />
        )}
      </div>

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-4 rounded-xl hover:scale-105 transition transform"
      >
        Publish Recipe
      </button>
    </div>
  );
};

export default BlogPostForm;
