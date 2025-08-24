// Handle image upload
const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formDataCloud = new FormData();
  formDataCloud.append("file", file);
  formDataCloud.append("upload_preset", "blog_post"); // <-- Replace
  formDataCloud.append("folder", "blog_images"); // optional

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/djimfq1jk/image/upload", // <-- Replace
      formDataCloud
    );

    // Save uploaded image URL to formData
    setFormData(prev => ({ ...prev, imageUrl: res.data.secure_url }));
    setImagePreview(res.data.secure_url); // for preview
  } catch (error) {
    console.error("Error uploading image:", error);
    alert("⚠️ Image upload failed. Check your Cloudinary settings.");
  }
};
