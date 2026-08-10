import React, { useState } from "react";

const ManagePackages = ({ packages, onRefresh, triggerSuccess, triggerError }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // ⚠️ Custom Delete Modal State
  const [deletePackageId, setDeletePackageId] = useState(null);

  // Form State
  const initialFormState = {
    title: "",
    badge: "",
    category: "International",
    continent: "",
    country: "",
    duration: "",
    location: "",
    price: "",
    originalPrice: "",
    rating: 4.5,
    type: "",
    image: "",
    about: "",
    features: "",   
    itinerary: "",  
  };

  const [formData, setFormData] = useState(initialFormState);

  // Modal Open For Add
  const handleOpenAddModal = () => {
    setEditingPackageId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  // Modal Open For Edit
  const handleOpenEditModal = (pkg) => {
    setEditingPackageId(pkg._id);
    setFormData({
      title: pkg.title || "",
      badge: pkg.badge || "",
      category: pkg.category || "International",
      continent: pkg.continent || "",
      country: pkg.country || "",
      duration: pkg.duration || "",
      location: pkg.location || "",
      price: pkg.price || "",
      originalPrice: pkg.originalPrice || "",
      rating: pkg.rating || 4.5,
      type: pkg.type || "",
      image: pkg.image || "",
      about: pkg.about || "",
      features: Array.isArray(pkg.features) ? pkg.features.join(", ") : "",
      itinerary: Array.isArray(pkg.itinerary) ? pkg.itinerary.join("\n") : "",
    });
    setIsModalOpen(true);
  };

  // Handle Form Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Handler (Add / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEditing = Boolean(editingPackageId);
    const url = isEditing
      ? `${import.meta.env.VITE_SERVER_URL}/admin/update-package/${editingPackageId}`
      : `${import.meta.env.VITE_SERVER_URL}/admin/add-package`;

    const method = isEditing ? "PATCH" : "POST";

    const payload = {
      ...formData,
      features: formData.features.split(",").map((f) => f.trim()).filter(Boolean),
      itinerary: formData.itinerary.split("\n").map((i) => i.trim()).filter(Boolean),
    };

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" ,"ngrok-skip-browser-warning": "true"},
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        triggerSuccess(data.message);
        setIsModalOpen(false);
        onRefresh();
      } else {
        triggerError(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      triggerError("Server error. Please try again.");
    }
  };

  // 🗑️ Trigger Custom Delete Confirmation Modal
  const confirmDelete = (id) => {
    setDeletePackageId(id);
  };

  // 🚨 Actual Delete Handler (Triggered after clicking "Yes, Delete" in Custom Modal)
  const handleConfirmDelete = async () => {
    if (!deletePackageId) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/delete-package/${deletePackageId}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "ngrok-skip-browser-warning": "true" }
      });

      const data = await response.json();

      if (data.success) {
        triggerSuccess(data.message);
        onRefresh();
      } else {
        triggerError(data.message || "Failed to delete package.");
      }
    } catch (err) {
      console.error(err);
      triggerError("Server error while deleting package.");
    } finally {
      setDeletePackageId(null); // Close Delete Modal
    }
  };

  // Search Filter Logic
  const filteredPackages = packages.filter((pkg) => {
    const query = searchQuery.toLowerCase();
    return (
      pkg.title?.toLowerCase().includes(query) ||
      pkg.location?.toLowerCase().includes(query) ||
      pkg.category?.toLowerCase().includes(query) ||
      pkg.country?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-4">
      {/* Top Bar with Search & Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Manage Travel Packages</h1>
          <p className="text-xs text-slate-500">Total Packages: {filteredPackages.length}</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Input Bar */}
          <div className="relative flex-1 sm:w-64">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search title, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            onClick={handleOpenAddModal}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm text-xs transition shrink-0"
          >
            <span className="text-sm font-bold">+</span> Add Package
          </button>
        </div>
      </div>

      {/* Compact Package Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPackages.map((pkg) => (
          <div key={pkg._id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition">
            
            {/* Image */}
            <div className="relative h-28 bg-slate-100">
              <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
              {pkg.badge && (
                <span className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow">
                  {pkg.badge}
                </span>
              )}
            </div>

            {/* Compact Body Content */}
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-1">
                  <h3 className="font-bold text-slate-800 text-sm line-clamp-1 truncate" title={pkg.title}>{pkg.title}</h3>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium shrink-0">{pkg.category}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 truncate">{pkg.location}</p>
                <p className="text-[11px] text-slate-400">{pkg.duration}</p>

                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-base font-extrabold text-emerald-600">₹{pkg.price?.toLocaleString()}</span>
                  {pkg.originalPrice && (
                    <span className="text-[11px] text-slate-400 line-through">₹{pkg.originalPrice?.toLocaleString()}</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => handleOpenEditModal(pkg)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-1 rounded text-xs flex justify-center items-center gap-1 transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => confirmDelete(pkg._id)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded text-xs transition"
                  title="Delete Package"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPackages.length === 0 && (
        <div className="text-center py-10 text-slate-400 text-sm">
          No travel packages found matching "{searchQuery}"
        </div>
      )}

      {/* ⚠️ CUSTOM ARE YOU SURE DELETE CONFIRMATION MODAL (Matching Theme) */}
      {deletePackageId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center animate-in fade-in zoom-in duration-200">
            {/* Alert / Trash Icon */}
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl border border-red-100">
              🗑️
            </div>

            <h3 className="text-lg font-bold text-slate-800">Are you sure?</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Do you really want to delete this travel package? This process cannot be undone.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeletePackageId(null)}
                className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-md shadow-red-200 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Popup for Add/Edit Package */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-base font-bold"
            >
              ✕
            </button>

            <h2 className="text-lg font-bold text-slate-800 mb-3">
              {editingPackageId ? "Edit Travel Package" : "Add New Travel Package"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Title</label>
                  <input required name="title" value={formData.title} onChange={handleChange} className="w-full border rounded-lg p-2 text-xs" placeholder="e.g. Bora Bora Discovery" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Badge</label>
                  <input name="badge" value={formData.badge} onChange={handleChange} className="w-full border rounded-lg p-2 text-xs" placeholder="e.g. Luxury / Trending" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="w-full border rounded-lg p-2 text-xs">
                    <option value="International">International</option>
                    <option value="Domestic">Domestic</option>
                    <option value="Honeymoon">Honeymoon</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Continent</label>
                  <input name="continent" value={formData.continent} onChange={handleChange} className="w-full border rounded-lg p-2 text-xs" placeholder="e.g. Australia / Asia" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Country</label>
                  <input name="country" value={formData.country} onChange={handleChange} className="w-full border rounded-lg p-2 text-xs" placeholder="e.g. French Polynesia" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Location</label>
                  <input required name="location" value={formData.location} onChange={handleChange} className="w-full border rounded-lg p-2 text-xs" placeholder="e.g. Bora Bora, French Polynesia" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Duration</label>
                  <input name="duration" value={formData.duration} onChange={handleChange} className="w-full border rounded-lg p-2 text-xs" placeholder="e.g. 5 Days / 4 Nights" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Type</label>
                  <input name="type" value={formData.type} onChange={handleChange} className="w-full border rounded-lg p-2 text-xs" placeholder="e.g. Nature / Adventure" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Price (₹)</label>
                  <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border rounded-lg p-2 text-xs" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Original Price (₹)</label>
                  <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} className="w-full border rounded-lg p-2 text-xs" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Image URL</label>
                <input required name="image" value={formData.image} onChange={handleChange} className="w-full border rounded-lg p-2 text-xs" placeholder="https://..." />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">About Package</label>
                <textarea name="about" value={formData.about} onChange={handleChange} rows={2} className="w-full border rounded-lg p-2 text-xs" placeholder="Describe the trip..." />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Features (Comma-separated)</label>
                <input name="features" value={formData.features} onChange={handleChange} className="w-full border rounded-lg p-2 text-xs" placeholder="5-Star Stay, Free Snorkeling, Daily Breakfast" />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Itinerary (Each day on a NEW line)</label>
                <textarea name="itinerary" value={formData.itinerary} onChange={handleChange} rows={3} className="w-full border rounded-lg p-2 text-xs" placeholder={"Day 1: Arrive\nDay 2: Boat Tour\nDay 3: Departure"} />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-1.5 text-xs text-slate-600">Cancel</button>
                <button type="submit" className="px-4 py-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium">Save Package</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePackages;