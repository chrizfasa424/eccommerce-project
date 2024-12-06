import React from 'react';
import { Shop, ShopCategory, ShopProduct } from '../../../../services/shopManagementService';
import MultiStepProductForm from './MultiStepProductForm';
import VariantEditForm from './VariantEditForm';

interface EditProductsProps {
  selectedShop: Shop;
  selectedCategory: ShopCategory;
  editingProduct: ShopProduct;
  onComplete: () => void;
  onCancel: () => void;
}

const EditProducts: React.FC<EditProductsProps> = ({
  selectedShop,
  selectedCategory,
  editingProduct,
  onComplete,
  onCancel
}) => {
  // Check if this is a variant product (has parent_product_id)
  const isVariantProduct = editingProduct.parent_product_id !== null && editingProduct.parent_product_id !== undefined;

  if (isVariantProduct) {
    // Use simplified variant edit form for variant products
    return (
      <VariantEditForm
        variant={editingProduct}
        onComplete={onComplete}
        onCancel={onCancel}
      />
    );
  }

  // Use full multi-step form for parent/standalone products
  return (
    <MultiStepProductForm
      selectedShop={selectedShop}
      selectedCategory={selectedCategory}
      editingProduct={editingProduct}
      onComplete={onComplete}
      onCancel={onCancel}
    />
  );
};

export default EditProducts; 