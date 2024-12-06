import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface AttributeValue {
  value_code: string;
  value_label: string;
}

interface Attribute {
  attribute_id: number;
  name: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'boolean';
  options: string[] | null;
  required: boolean;
  help_text: string | null;
  values?: AttributeValue[];
}

interface AttributeSelectionProps {
  categoryId: number | null;
  productId: number | null;
  selectedAttributes: Record<number, string | string[]>;
  onAttributeSelect: (attributeId: number, value: string | string[]) => void;
  errors?: Record<string, any>;
}

const AttributeSelection: React.FC<AttributeSelectionProps> = ({
  categoryId,
  productId,
  onAttributeSelect,
  selectedAttributes,
}) => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedAttributes, setExpandedAttributes] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (categoryId) {
      fetchAttributes(categoryId);
    } else {
      setAttributes([]);
    }
  }, [categoryId]);



  const fetchAttributes = async (categoryId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/categories/${categoryId}/attributes`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch attributes');
      }

      const data = await response.json();
      // Fetch attribute values for each attribute
      const attributesWithValues = await Promise.all(
        data.map(async (attr: Attribute) => {
          if (attr.type === 'select' || attr.type === 'multiselect' || attr.type === 'boolean') {
            const valuesResponse = await fetch(
              `${API_BASE_URL}/api/merchant-dashboard/attributes/${attr.attribute_id}/values`,
              {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                  'Content-Type': 'application/json',
                },
              }
            );
            if (valuesResponse.ok) {
              const values = await valuesResponse.json();
              return { ...attr, values };
            }
          }
          return attr;
        })
      );
      setAttributes(attributesWithValues);
    } catch (error) {
      console.error('Error fetching attributes:', error);
      setError('Failed to load attributes. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAttribute = useCallback((attributeId: number) => {
    setExpandedAttributes(prev => {
      const next = new Set(prev);
      if (next.has(attributeId)) {
        next.delete(attributeId);
      } else {
        next.add(attributeId);
      }
      return next;
    });
  }, []);

  const handleValueSelect = useCallback((attribute: Attribute, value: string) => {
    if (!onAttributeSelect) {
      console.error('onAttributeSelect is not provided');
      return;
    }

    if (!productId) {
      console.error('Product ID is required to save attribute values');
      return;
    }

    try {
      // For boolean attributes, value is already the value_code (true/false)
      // For select/multiselect, value might be value_label, so we need to find the value_code
      let valueToSend = value;
      let valueToStore = value;
      
      if (attribute.type === 'select' || attribute.type === 'multiselect' || attribute.type === 'boolean') {
        const attributeValue = attribute.values?.find(v => 
          attribute.type === 'boolean' ? v.value_code === value : v.value_label === value
        );
        
        if (!attributeValue) {
          console.error('Selected value not found in attribute values');
          return;
        }
        
        valueToSend = attributeValue.value_code;
        valueToStore = attribute.type === 'boolean' ? attributeValue.value_code : value;
      }

      // Update local state first
      if (attribute.type === 'multiselect') {
        const currentValues = (selectedAttributes[attribute.attribute_id] as string[]) || [];
        const newValues = currentValues.includes(valueToStore)
          ? currentValues.filter(v => v !== valueToStore)
          : [...currentValues, valueToStore];
        onAttributeSelect(attribute.attribute_id, newValues);
      } else {
        onAttributeSelect(attribute.attribute_id, valueToStore);
      }

      // Prepare the data for the backend
      let dataToSend;
      if (attribute.type === 'multiselect') {
        const currentCodes = [];
        const currentStoredValues = (selectedAttributes[attribute.attribute_id] as string[]) || [];
        
        // Convert stored values to codes for backend
        for (const storedValue of currentStoredValues) {
          const av = attribute.values?.find(v => v.value_label === storedValue);
          if (av) currentCodes.push(av.value_code);
        }
        
        const newCodes = currentCodes.includes(valueToSend)
          ? currentCodes.filter(c => c !== valueToSend)
          : [...currentCodes, valueToSend];
          
        dataToSend = { [attribute.attribute_id]: newCodes };
      } else {
        dataToSend = { [attribute.attribute_id]: valueToSend };
      }

      // Send to backend
      fetch(`${API_BASE_URL}/api/merchant-dashboard/products/${productId}/attributes/values`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })
      .then(async response => {
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to save attribute values');
        }
        
        // console.log('Attribute values saved successfully:', data);
      })
      .catch(error => {
        console.error('Error saving attribute values:', error);
        // Revert the local state change if the API call fails
        if (attribute.type === 'multiselect') {
          const currentValues = (selectedAttributes[attribute.attribute_id] as string[]) || [];
          onAttributeSelect(attribute.attribute_id, currentValues);
        } else {
          onAttributeSelect(attribute.attribute_id, selectedAttributes[attribute.attribute_id] as string);
        }
      });

    } catch (error) {
      console.error('Error handling attribute selection:', error);
    }
  }, [onAttributeSelect, selectedAttributes, productId]);

  const renderAttributeValue = useCallback((attribute: Attribute) => {
    switch (attribute.type) {
      case 'multiselect':
        return (
          <div className="mt-2 space-y-2">
            {attribute.values?.map((attributeValue, index) => {
              const selectedValues = (selectedAttributes[attribute.attribute_id] as string[]) || [];
              const isSelected = selectedValues.includes(attributeValue.value_label);
              return (
                <div
                  key={index}
                  className={`px-3 py-2 rounded-md cursor-pointer flex items-center ${
                    isSelected ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleValueSelect(attribute, attributeValue.value_label)}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  {attributeValue.value_label}
                </div>
              );
            })}
          </div>
        );

      case 'select':
        return (
          <div className="mt-2 space-y-2">
            {attribute.values?.map((attributeValue, index) => (
              <div
                key={index}
                className={`px-3 py-2 rounded-md cursor-pointer ${
                  selectedAttributes[attribute.attribute_id] === attributeValue.value_label
                    ? 'bg-primary-50 text-primary-700'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleValueSelect(attribute, attributeValue.value_label)}
              >
                {attributeValue.value_label}
              </div>
            ))}
          </div>
        );

      case 'number':
        return (
          <div className="mt-2">
            <input
              type="number"
              value={selectedAttributes[attribute.attribute_id] as string || ''}
              onChange={(e) => handleValueSelect(attribute, e.target.value)}
              placeholder={`Enter ${attribute.name.toLowerCase()}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        );

      case 'boolean':
        return (
          <div className="mt-2 space-y-2">
            {attribute.values?.map((attributeValue, index) => {
              const isSelected = selectedAttributes[attribute.attribute_id] === attributeValue.value_code;
              return (
                <div
                  key={index}
                  className={`px-3 py-2 rounded-md cursor-pointer ${
                    isSelected ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleValueSelect(attribute, attributeValue.value_code)}
                >
                  {attributeValue.value_label}
                </div>
              );
            })}
          </div>
        );

      default: // text
        return (
          <div className="mt-2">
            <input
              type="text"
              value={selectedAttributes[attribute.attribute_id] as string || ''}
              onChange={(e) => handleValueSelect(attribute, e.target.value)}
              placeholder={`Enter ${attribute.name.toLowerCase()}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        );
    }
  }, [handleValueSelect, selectedAttributes]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">{error}</p>
        <button
          onClick={() => categoryId && fetchAttributes(categoryId)}
          className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Try again
        </button>
      </div>
    );
  }

  if (attributes.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No attributes available for this category
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {attributes.map((attribute) => (
        <div key={attribute.attribute_id} className="border border-gray-200 rounded-lg overflow-hidden">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleAttribute(attribute.attribute_id)}
          >
            <div>
              <div className="flex items-center">
                <h3 className="text-sm font-medium text-gray-900">{attribute.name}</h3>
                {attribute.required && (
                  <span className="ml-2 text-xs text-red-600">*</span>
                )}
              </div>
              {attribute.help_text && (
                <p className="text-xs text-gray-500 mt-1">{attribute.help_text}</p>
              )}
            </div>
            <button className="p-1 hover:bg-gray-100 rounded">
              {expandedAttributes.has(attribute.attribute_id) ? (
                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRightIcon className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
          {expandedAttributes.has(attribute.attribute_id) && (
            <div className="px-4 pb-4 border-t border-gray-100">
              {renderAttributeValue(attribute)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AttributeSelection; 