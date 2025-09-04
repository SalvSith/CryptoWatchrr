import React, { useState, useRef, useEffect } from 'react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  onUpdateNotifications: (push: boolean, email: boolean, sms: boolean) => void;
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  pushNotifications,
  emailNotifications,
  smsNotifications,
  onUpdateNotifications
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  // Local state for toggles
  const [localPush, setLocalPush] = useState(pushNotifications);
  const [localEmail, setLocalEmail] = useState(emailNotifications);
  const [localSms, setLocalSms] = useState(smsNotifications);

  const startYRef = useRef(0);
  const currentYRef = useRef(0);
  const modalRef = useRef<HTMLDivElement>(null);

  // Update local state when props change
  useEffect(() => {
    setLocalPush(pushNotifications);
    setLocalEmail(emailNotifications);
    setLocalSms(smsNotifications);
  }, [pushNotifications, emailNotifications, smsNotifications]);

  // Disable body scroll when modal is open and reset drag state
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset drag state when opening
      setDragY(0);
      setIsDragging(false);
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
    // Don't start drag if touching a toggle or button
    const target = e.target as HTMLElement;
    if (target.closest('[role="switch"]') || target.tagName === 'BUTTON') {
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
    // Don't start drag if clicking on a toggle or button
    const target = e.target as HTMLElement;
    if (target.closest('[role="switch"]') || target.tagName === 'BUTTON') {
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
      // Apply changes when modal closes
      onUpdateNotifications(localPush, localEmail, localSms);
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop (not the modal content)
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleToggle = (type: 'push' | 'email' | 'sms') => {
    switch (type) {
      case 'push':
        setLocalPush(!localPush);
        break;
      case 'email':
        setLocalEmail(!localEmail);
        break;
      case 'sms':
        setLocalSms(!localSms);
        break;
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
            Set Notifications
          </div>
        </div>

        {/* Container Section - EXACT FIGMA */}
        <div className="box-border flex flex-col gap-[8.998px] items-start justify-center p-[17.997px] relative shrink-0 w-full">
          
          {/* Push Notification - EXACT FIGMA */}
          <div className="box-border flex gap-[17.997px] items-center justify-start px-0 py-[8.998px] relative shrink-0 w-full">
            <div className="basis-0 flex flex-col grow items-start justify-start min-h-px min-w-px relative shrink-0">
              <div className="font-jakarta font-medium text-[15.747px] leading-[26.995px] text-[#15171a] relative shrink-0">
                Push Notification
              </div>
              <div className="font-jakarta font-normal text-[13.497px] leading-[24.745px] text-gray-500 w-[280.072px] relative shrink-0">
                Get instant alerts directly on your phone via your app when your price alert goes off.
              </div>
            </div>
            <button
              role="switch"
              aria-checked={localPush}
              onClick={() => handleToggle('push')}
              className={`box-border flex gap-[3.572px] h-[25.005px] items-center p-[3.572px] relative rounded-[50px] shrink-0 w-[46.438px] transition-all duration-200 ${
                localPush 
                  ? 'bg-[#256bfd] justify-end' 
                  : 'bg-[#e1e3e6] justify-start'
              }`}
            >
              <div className="bg-[#fbfbfb] rounded-[50px] shrink-0 w-[17.861px] h-[17.861px]" />
            </button>
          </div>

          {/* Email Notification - EXACT FIGMA */}
          <div className="box-border flex gap-[17.997px] items-center justify-start px-0 py-[8.998px] relative shrink-0 w-full">
            <div className="basis-0 flex flex-col grow items-start justify-start min-h-px min-w-px relative shrink-0">
              <div className="font-jakarta font-medium text-[15.747px] leading-[26.995px] text-[#15171a] relative shrink-0">
                Email Notification
              </div>
              <div className="font-jakarta font-normal text-[13.497px] leading-[24.745px] text-gray-500 w-[291.32px] relative shrink-0">
                Receive an email with details of this price alert, for you to review.
              </div>
            </div>
            <button
              role="switch"
              aria-checked={localEmail}
              onClick={() => handleToggle('email')}
              className={`box-border flex gap-[3.572px] h-[25.005px] items-center p-[3.572px] relative rounded-[50px] shrink-0 w-[46.438px] transition-all duration-200 ${
                localEmail 
                  ? 'bg-[#256bfd] justify-end' 
                  : 'bg-[#e1e3e6] justify-start'
              }`}
            >
              <div className="bg-[#fbfbfb] rounded-[50px] shrink-0 w-[17.861px] h-[17.861px]" />
            </button>
          </div>

          {/* SMS Notification - EXACT FIGMA */}
          <div className="box-border flex gap-[17.997px] items-center justify-start px-0 py-[8.998px] relative shrink-0 w-full">
            <div className="basis-0 flex flex-col grow items-start justify-start min-h-px min-w-px relative shrink-0">
              <div className="font-jakarta font-medium text-[15.747px] leading-[26.995px] text-[#15171a] relative shrink-0">
                SMS Notification
              </div>
              <div className="font-jakarta font-normal text-[13.497px] leading-[24.745px] text-gray-500 w-[291.32px] relative shrink-0">
                Get a SMS straight to your phone for timely updates, even without internet access.
              </div>
            </div>
            <button
              role="switch"
              aria-checked={localSms}
              onClick={() => handleToggle('sms')}
              className={`box-border flex gap-[3.572px] h-[25.005px] items-center p-[3.572px] relative rounded-[50px] shrink-0 w-[46.438px] transition-all duration-200 ${
                localSms 
                  ? 'bg-[#256bfd] justify-end' 
                  : 'bg-[#e1e3e6] justify-start'
              }`}
            >
              <div className="bg-[#fbfbfb] rounded-[50px] shrink-0 w-[17.861px] h-[17.861px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
