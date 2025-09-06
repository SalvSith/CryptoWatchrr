import React, { useState, useRef, useEffect } from 'react';

// Checkmark icon - local asset
const checkmarkIcon = "/assets/checkmark.svg";

interface FrequencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFrequency: 'once' | 'recurring' | null;
  onUpdateFrequency: (frequency: 'once' | 'recurring') => void;
}

const FrequencyModal: React.FC<FrequencyModalProps> = ({
  isOpen,
  onClose,
  selectedFrequency,
  onUpdateFrequency
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  // Local state for selection
  const [localFrequency, setLocalFrequency] = useState<'once' | 'recurring' | null>(selectedFrequency);
  const [hasUpdatedParent, setHasUpdatedParent] = useState(false);

  const startYRef = useRef(0);
  const currentYRef = useRef(0);
  const modalRef = useRef<HTMLDivElement>(null);

  // Disable body scroll when modal is open and reset drag state
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset drag state when opening
      setDragY(0);
      setIsDragging(false);
      setHasUpdatedParent(false); // Reset update flag when opening
      // Sync local state with props when modal opens
      console.log('Modal opening, syncing localFrequency with selectedFrequency:', selectedFrequency);
      setLocalFrequency(selectedFrequency);
      // Small delay to ensure smooth slide-in animation
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    // Don't start drag if touching a checkbox or button
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[role="checkbox"]')) {
      return;
    }
    
    e.preventDefault();
    const touch = e.touches[0];
    startYRef.current = touch.clientY;
    currentYRef.current = touch.clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const deltaY = touch.clientY - startYRef.current;
    
    // Only allow dragging down
    if (deltaY > 0) {
      setDragY(deltaY);
      currentYRef.current = touch.clientY;
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const deltaY = currentYRef.current - startYRef.current;
    
    // Close modal if dragged down more than 100px
    if (deltaY > 100) {
      closeModal();
    } else {
      // Snap back to original position
      setDragY(0);
    }
    
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaY = e.clientY - startYRef.current;
    
    // Only allow dragging down
    if (deltaY > 0) {
      setDragY(deltaY);
      currentYRef.current = e.clientY;
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const deltaY = currentYRef.current - startYRef.current;
    
    // Close modal if dragged down more than 100px
    if (deltaY > 100) {
      closeModal();
    } else {
      // Snap back to original position
      setDragY(0);
    }
    
    setIsDragging(false);
  };

  const handleMouseStart = (e: React.MouseEvent) => {
    // Don't start drag if clicking on a checkbox or button
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[role="checkbox"]')) {
      return;
    }
    
    e.preventDefault();
    startYRef.current = e.clientY;
    currentYRef.current = e.clientY;
    setIsDragging(true);
  };

  const closeModal = () => {
    setIsVisible(false);
    // Wait for slide-out animation to complete before calling onClose
    setTimeout(() => {
      onClose();
      // Apply changes when modal closes (only if a selection was made and we haven't already updated)
      if (localFrequency !== null && !hasUpdatedParent) {
        onUpdateFrequency(localFrequency);
      }
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop (not the modal content)
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleFrequencySelect = (frequency: 'once' | 'recurring') => {
    console.log('handleFrequencySelect called with:', frequency);
    setLocalFrequency(frequency);
    // Update parent immediately and close modal
    console.log('Calling onUpdateFrequency with:', frequency);
    onUpdateFrequency(frequency);
    setHasUpdatedParent(true); // Mark that we've already updated the parent
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-end justify-center bg-black transition-opacity duration-300 ${
        isOpen && isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      {/* Modal - EXACT FIGMA */}
      <div
        ref={modalRef}
        className={`bg-[#fbfbfb] flex flex-col items-start justify-start overflow-hidden relative rounded-[21.371px] w-full max-w-[420.67px] mx-4 mb-6 transition-transform duration-300 ease-out touch-none select-none ${
          isDragging ? 'transition-none cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          transform: `translateY(${!isVisible ? '100%' : dragY + 'px'})`,
          touchAction: 'none'
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseStart}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Home Indicator (Drag Handle) - EXACT FIGMA */}
        <div 
          className="absolute bg-gray-500 h-[4.499px] left-1/2 rounded-[112.479px] top-[-2.25px] translate-x-[-50%] w-[35.993px] z-20"
        />
        
        {/* Container - EXACT FIGMA */}
        <div className="flex flex-col items-start justify-start relative shrink-0 w-full">
          {/* Header Section - EXACT FIGMA */}
          <div className="box-border flex flex-col gap-[4.499px] items-center justify-center overflow-hidden p-[17.997px] relative shrink-0 w-full">
            {/* Grid Background Pattern - EXACT FIGMA */}
            <div className="absolute bottom-[0.43px] flex flex-col items-start justify-start left-1/2 translate-x-[-50%] pointer-events-none">
              <div className="flex items-center justify-start relative shrink-0 w-full">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="relative shrink-0 w-[33.744px] h-[33.744px]">
                    <div className="absolute border-[#f0f0f2] border-[1.125px] border-solid inset-[-0.562px] pointer-events-none" />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-start relative shrink-0 w-full">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="relative shrink-0 w-[33.744px] h-[33.744px]">
                    <div className="absolute border-[#f0f0f2] border-[1.125px] border-solid inset-[-0.562px] pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Title - EXACT FIGMA */}
            <div className="font-jakarta font-medium text-[17.997px] leading-[29.244px] text-[#15171a] relative shrink-0">
              Set Notification Frequency
            </div>
          </div>

          {/* Options Container - EXACT FIGMA */}
          <div className="box-border flex flex-col gap-[8.998px] items-center justify-end p-[17.997px] relative shrink-0 w-full">
            
            {/* Alert me once - EXACT FIGMA */}
            <button
              role="checkbox"
              aria-checked={localFrequency === 'once'}
              onClick={() => handleFrequencySelect('once')}
              className="box-border flex items-center justify-between px-0 py-[8.998px] relative shrink-0 w-full hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              <div className="font-jakarta font-medium text-[15.747px] leading-[26.995px] text-[#15171a] relative shrink-0">
                <span>Alert me once</span>
                <span className="font-jakarta font-normal text-gray-500"> (Once-off)</span>
              </div>
              <div className="flex gap-[8.998px] items-center justify-start relative shrink-0">
                <div className={`relative shrink-0 w-[22.496px] h-[22.496px] rounded-[6px] transition-all duration-200 ${
                  localFrequency === 'once' 
                    ? 'bg-[#256bfd]' 
                    : 'border border-[#e1e3e6]'
                }`}>
                  {localFrequency === 'once' && (
                    <div className="absolute flex h-[12.684px] items-center justify-center left-[3.37px] top-[5.62px] w-[15.658px]">
                      <div className="flex-none rotate-[7.488deg]">
                        <div className="h-[10.916px] relative w-[14.379px]">
                          <img 
                            alt="checkmark" 
                            className="block max-w-none size-full" 
                            src={checkmarkIcon} 
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </button>

            {/* Alert me every time - EXACT FIGMA */}
            <button
              role="checkbox"
              aria-checked={localFrequency === 'recurring'}
              onClick={() => handleFrequencySelect('recurring')}
              className="box-border flex items-center justify-between px-0 py-[8.998px] relative shrink-0 w-full hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              <div className="font-jakarta font-medium text-[15.747px] leading-[26.995px] text-[#15171a] relative shrink-0">
                <span>Alert me every time </span>
                <span className="font-jakarta font-normal text-gray-500">(Recurring)</span>
              </div>
              <div className="flex gap-[8.998px] items-center justify-start relative shrink-0">
                <div className={`relative shrink-0 w-[22.496px] h-[22.496px] rounded-[6px] transition-all duration-200 ${
                  localFrequency === 'recurring' 
                    ? 'bg-[#256bfd]' 
                    : 'border border-[#e1e3e6]'
                }`}>
                  {localFrequency === 'recurring' && (
                    <div className="absolute flex h-[12.684px] items-center justify-center left-[3.37px] top-[5.62px] w-[15.658px]">
                      <div className="flex-none rotate-[7.488deg]">
                        <div className="h-[10.916px] relative w-[14.379px]">
                          <img 
                            alt="checkmark" 
                            className="block max-w-none size-full" 
                            src={checkmarkIcon} 
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequencyModal;
