import React, { useState, useEffect, useRef } from 'react';

interface AlertNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onConfirm: (name: string) => void;
}

const AlertNameModal: React.FC<AlertNameModalProps> = ({
  isOpen,
  onClose,
  currentName,
  onConfirm,
}) => {
  const [alertName, setAlertName] = useState(currentName);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);

  useEffect(() => {
    setAlertName(currentName);
  }, [currentName]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset drag state when opening
      setDragY(0);
      setIsDragging(false);
      // Trigger slide-in animation after a small delay to ensure DOM is ready
      setTimeout(() => setIsVisible(true), 10);
    } else {
      document.body.style.overflow = 'unset';
      setIsVisible(false);
      setDragY(0);
      setIsDragging(false);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    // Don't start drag if touching an input or button
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'BUTTON' || target.closest('input, button')) {
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

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
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
    // Don't start drag if clicking on an input or button
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'BUTTON' || target.closest('input, button')) {
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
    }, 300);
  };

  const handleConfirm = () => {
    onConfirm(alertName.trim() || currentName);
    closeModal();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop (not the modal content)
    if (e.target === e.currentTarget) {
      closeModal();
    }
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
        
        {/* Header Section - EXACT FIGMA */}
        <div className="box-border flex flex-col gap-[4.499px] items-center justify-center overflow-hidden p-[17.997px] relative shrink-0 w-full">
          {/* Grid Background Pattern - EXACT FIGMA */}
          <div className="absolute bottom-[0.42px] flex flex-col items-start justify-start left-1/2 translate-x-[-50%] pointer-events-none">
            <div className="flex items-center justify-start relative shrink-0 w-full">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="relative shrink-0 w-[33.744px] h-[33.744px]">
                  <div className="absolute border-[#f0f0f2] border-[1.125px] border-solid inset-[-0.562px] pointer-events-none" />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-start relative shrink-0 w-full">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="relative shrink-0 w-[33.744px] h-[33.744px]">
                  <div className="absolute border-[#f0f0f2] border-[1.125px] border-solid inset-[-0.562px] pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Title - EXACT FIGMA */}
          <div className="font-jakarta font-medium text-[17.997px] leading-[29.244px] text-[#15171a] relative shrink-0">
            Set Alert Name
          </div>
        </div>

        {/* Container Section - EXACT FIGMA */}
        <div className="box-border flex flex-col gap-[26.995px] items-center justify-end p-[17.997px] relative shrink-0 w-full">
          {/* Input Form - EXACT FIGMA */}
          <div className="flex flex-col gap-[8.998px] items-start justify-start relative shrink-0 w-[384.677px]">
            <div className="flex flex-col gap-[13.497px] items-start justify-start relative shrink-0 w-full">
              <div className="flex gap-[17.997px] items-center justify-start relative shrink-0 w-full">
                <div className="basis-0 font-jakarta font-medium text-[15.75px] leading-[26.995px] text-[#15171a] grow min-h-px min-w-px relative shrink-0">
                  Alert Name
                </div>
              </div>
              <div className="bg-[#f4f4f6] box-border flex gap-[17.997px] h-[56.239px] items-center justify-start px-[17.997px] py-[13.497px] relative rounded-[11px] shrink-0 w-full border border-[#e1e3e6]">
                <input
                  type="text"
                  value={alertName}
                  onChange={(e) => setAlertName(e.target.value)}
                  className="basis-0 font-jakarta font-normal text-[15.75px] leading-[26.995px] text-[#15171a] bg-transparent outline-none grow min-h-px min-w-px relative shrink-0 w-full"
                  placeholder="Bitcoin"
                />
              </div>
            </div>
          </div>
          
          {/* Confirm Button - EXACT FIGMA */}
          <button
            onClick={handleConfirm}
            className="bg-[#256bfd] box-border flex gap-[8.998px] h-[56.239px] items-center justify-center px-[26.995px] py-[13.497px] relative rounded-[11px] shrink-0 w-[384.677px] hover:bg-blue-600 transition-colors active:scale-[0.98]"
          >
            <div className="font-jakarta font-medium text-[15.75px] leading-[26.995px] text-[#fbfbfb] relative shrink-0">
              Confirm
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertNameModal;
