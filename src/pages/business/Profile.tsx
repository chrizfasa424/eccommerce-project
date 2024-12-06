import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  UserCircleIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock data - replace with actual user data
  const [profileData, setProfileData] = useState({
    personalInfo: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567'
    },
    businessInfo: {
      businessName: 'Tech Gadgets Store',
      businessType: 'Electronics Retail',
      registrationNumber: 'BRN123456789',
      address: '123 Commerce Street, Business District',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'United States',
      website: 'www.techgadgets.com'
    },
    accountInfo: {
      accountNumber: '1234567890',
      bankName: 'State Bank of India',
      branchName: 'Main Branch',
      ifscCode: 'SBIN0123456',
      accountType: 'Current'
    }
  });

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
    // console.log('Saving profile:', profileData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage your personal, business, and account information
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-8">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <UserCircleIcon className="w-6 h-6 text-orange-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center px-4 py-2 border border-orange-500 text-sm font-medium rounded-md text-orange-500 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileData.personalInfo.name}
                    disabled={!isEditing}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="flex rounded-md border border-gray-300 bg-gray-50">
                    <div className="px-3 py-2 text-gray-500">
                      <EnvelopeIcon className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      value={profileData.personalInfo.email}
                      disabled
                      className="block w-full rounded-r-md border-0 bg-gray-50 px-3 py-2"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="flex rounded-md border border-gray-300">
                    <div className="px-3 py-2 text-gray-500">
                      <PhoneIcon className="w-5 h-5" />
                    </div>
                    <input
                      type="tel"
                      value={profileData.personalInfo.phone}
                      disabled={!isEditing}
                      className="block w-full rounded-r-md border-0 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 sm:p-8">
              <div className="flex items-center space-x-2 mb-6">
                <BuildingOfficeIcon className="w-6 h-6 text-orange-500" />
                <h2 className="text-xl font-semibold text-gray-900">Business Information</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    value={profileData.businessInfo.businessName}
                    disabled={!isEditing}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                  <input
                    type="text"
                    value={profileData.businessInfo.businessType}
                    disabled={!isEditing}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                  <input
                    type="text"
                    value={profileData.businessInfo.registrationNumber}
                    disabled={!isEditing}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <div className="flex rounded-md border border-gray-300">
                    <div className="px-3 py-2 text-gray-500">
                      <GlobeAltIcon className="w-5 h-5" />
                    </div>
                    <input
                      type="url"
                      value={profileData.businessInfo.website}
                      disabled={!isEditing}
                      className="block w-full rounded-r-md border-0 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
                  <div className="flex rounded-md border border-gray-300">
                    <div className="px-3 py-2 text-gray-500">
                      <MapPinIcon className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      value={profileData.businessInfo.address}
                      disabled={!isEditing}
                      className="block w-full rounded-r-md border-0 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={profileData.businessInfo.city}
                    disabled={!isEditing}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                  <input
                    type="text"
                    value={profileData.businessInfo.state}
                    disabled={!isEditing}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                  <input
                    type="text"
                    value={profileData.businessInfo.zipCode}
                    disabled={!isEditing}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={profileData.businessInfo.country}
                    disabled={!isEditing}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 sm:p-8">
              <div className="flex items-center space-x-2 mb-6">
                <BanknotesIcon className="w-6 h-6 text-orange-500" />
                <h2 className="text-xl font-semibold text-gray-900">Account Details</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                  <input
                    type="text"
                    value={profileData.accountInfo.accountNumber}
                    disabled={!isEditing}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={profileData.accountInfo.bankName}
                    disabled={!isEditing}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branch Name</label>
                  <input
                    type="text"
                    value={profileData.accountInfo.branchName}
                    disabled={!isEditing}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                  <input
                    type="text"
                    value={profileData.accountInfo.ifscCode}
                    disabled={!isEditing}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                  <input
                    type="text"
                    value={profileData.accountInfo.accountType}
                    disabled={!isEditing}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="w-full sm:w-auto inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 