'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, ChevronDown } from 'lucide-react';
import Image from 'next/image';

// Modal for adding and editing inventory items
function AddEditModal({ isOpen, onClose, onSubmit, initialData }) {
  const [itemName, setItemName] = useState(initialData?.item_name || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [propertyId, setPropertyId] = useState(initialData?.property_id || '');

  useEffect(() => {
    if (initialData) {
      setItemName(initialData.item_name);
      setImage(initialData.image || '');
      setPropertyId(initialData.property_id);
    } else {
      setItemName('');
      setImage('');
      setPropertyId('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the data to submit. You may add validations here.
    onSubmit({ item_name: itemName, image, property_id: propertyId });
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold mb-4">{initialData ? 'Edit Item' : 'Add New Item'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Item Name</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Property ID</label>
            <input
              type="number"
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              required
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-[#0063ff] text-white">
              {initialData ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal for confirming deletion
function DeleteModal({ isOpen, onClose, onConfirm, item }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-80 p-6">
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-6">Are you sure you want to delete "{item.item_name}?</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">
            Cancel
          </button>
          <button onClick={() => onConfirm(item)} className="px-4 py-2 rounded-lg bg-red-600 text-white">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Dummy categories – if your backend supports categories, adjust accordingly.
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'kitchen', name: 'Kitchen' },
    { id: 'bedroom', name: 'Bedroom' },
    { id: 'bathroom', name: 'Bathroom' },
    { id: 'decor', name: 'Decor' },
  ];

  // Fetch inventory items from the backend
  const fetchInventory = async () => {
    try {
      // Build query parameters for search (and if applicable, category)
      let queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append('search', searchTerm);
      // If your backend can filter by category or property_id, add that parameter here.
      // e.g., if (selectedCategory !== 'all') queryParams.append('property_id', selectedCategory);
      
      const res = await fetch(`/api/inventory?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include your JWT token here if required:
          // 'Authorization': `Bearer ${yourToken}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch inventory');
      const data = await res.json();
      // Expecting data.inventory from backend
      setInventoryItems(data.inventory);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  // Re-fetch items when searchTerm or (client-side) selectedCategory changes.
  useEffect(() => {
    fetchInventory();
  }, [searchTerm]);

  // Client-side filtering by category (if items include a category field)
  const filteredItems = inventoryItems.filter(item =>
    selectedCategory === 'all' ? true : item.category === selectedCategory
  );

  // Handle adding a new item
  const handleAdd = async (formData) => {
    try {
      const res = await fetch('/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add JWT header if needed.
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to add item');
      const data = await res.json();
      // Update local state (or refetch inventory)
      setInventoryItems((prev) => [...prev, data.inventory]);
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Handle editing an item
  const handleEdit = async (formData) => {
    try {
      const res = await fetch(`/api/inventory/${currentItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add JWT header if needed.
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to update item');
      const data = await res.json();
      // Update state
      setInventoryItems((prev) =>
        prev.map((item) => (item.id === currentItem.id ? data.inventory : item))
      );
      setShowEditModal(false);
      setCurrentItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Handle deleting an item
  const handleDelete = async (item) => {
    try {
      const res = await fetch(`/api/inventory/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add JWT header if needed.
        },
      });
      if (!res.ok) throw new Error('Failed to delete item');
      // Remove deleted item from state
      setInventoryItems((prev) => prev.filter((i) => i.id !== item.id));
      setShowDeleteModal(false);
      setCurrentItem(null);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-600 mt-1">Manage your items for the move</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#0063ff] text-white rounded-xl hover:bg-[#0055dd] transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Item
        </button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0063ff] focus:border-transparent"
          />
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0063ff] focus:border-transparent appearance-none"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </button>
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(selectedCategory === 'all' ? inventoryItems : filteredItems).map((item) => (
          <Card key={item.id} className="overflow-hidden border-none shadow-xl shadow-gray-200/50">
            <div className="relative h-48">
              <Image src={item.image} alt={item.item_name} fill className="object-cover" />
              <div className="absolute top-2 right-2">
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors">
                  <MoreVertical className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.item_name}</h3>
                  {/* If your backend returns a category, display it here */}
                  {item.category && <p className="text-sm text-gray-500 capitalize">{item.category}</p>}
                </div>
              </div>

              {/* Additional details if available */}
              <div className="space-y-3 mb-6">
                {/* Add any other item details here */}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCurrentItem(item);
                    setShowEditModal(true);
                  }}
                  className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setCurrentItem(item);
                    setShowDeleteModal(true);
                  }}
                  className="flex-1 py-2 border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Modal */}
      <AddEditModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAdd}
      />

      {/* Edit Modal */}
      <AddEditModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setCurrentItem(null);
        }}
        onSubmit={handleEdit}
        initialData={currentItem}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setCurrentItem(null);
        }}
        onConfirm={handleDelete}
        item={currentItem || {}}
      />
    </div>
  );
}
