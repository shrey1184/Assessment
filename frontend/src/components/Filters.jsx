import { useState } from 'react';

export default function Filters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    location: '',
    minRent: '',
    maxRent: '',
    propertyType: '',
    tenantPreference: ''
  });

  const handleChange = (e) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      location: '',
      minRent: '',
      maxRent: '',
      propertyType: '',
      tenantPreference: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Filter Rooms</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="Enter location"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Rent
          </label>
          <input
            type="number"
            name="minRent"
            value={filters.minRent}
            onChange={handleChange}
            placeholder="Min"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Rent
          </label>
          <input
            type="number"
            name="maxRent"
            value={filters.maxRent}
            onChange={handleChange}
            placeholder="Max"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Type
          </label>
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="1 Bed">1 Bed</option>
            <option value="2 Bed">2 Bed</option>
            <option value="3 Bed">3 Bed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tenant Preference
          </label>
          <select
            name="tenantPreference"
            value={filters.tenantPreference}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Family">Family</option>
            <option value="Girls">Girls</option>
            <option value="Working">Working</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
