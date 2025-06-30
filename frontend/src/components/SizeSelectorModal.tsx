// components/SizeSelectorModal.tsx
import React, { useState } from 'react';
import './SizeSelector.css';

interface SizeSelectorModalProps {
  onSelectSize: (size: string) => void;
  onClose: () => void;
}

const availableSizes = ['S', 'M', 'L', 'XL'];

const SizeSelectorModal: React.FC<SizeSelectorModalProps> = ({ onSelectSize, onClose }) => {
  const [selected, setSelected] = useState<string>('');

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Select Size</h3>
        <div className="size-options">
          {availableSizes.map(size => (
            <button
              key={size}
              className={`size-btn ${selected === size ? 'selected' : ''}`}
              onClick={() => setSelected(size)}
            >
              {size}
            </button>
          ))}
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={() => {
              if (selected) onSelectSize(selected);
            }}
            disabled={!selected}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeSelectorModal;
