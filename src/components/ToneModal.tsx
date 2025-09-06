import React, { useState, useRef, useEffect } from 'react';

// Icons - local assets
const playIcon = "/assets/play.svg";
const checkmarkIcon = "/assets/checkmark.svg";

interface ToneModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTone: string | null;
  onUpdateTone: (tone: string) => void;
}

const ToneModal: React.FC<ToneModalProps> = ({
  isOpen,
  onClose,
  selectedTone,
  onUpdateTone
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  // Local state for selection
  const [localTone, setLocalTone] = useState<string | null>(selectedTone);
  const [playingTone, setPlayingTone] = useState<string | null>(null);
  const [hasUpdatedParent, setHasUpdatedParent] = useState(false);

  const startYRef = useRef(0);
  const currentYRef = useRef(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Available tones with their display names and file names
  const tones = [
    { id: 'default', name: 'Default', fileName: 'Default.mp3' },
    { id: 'bubble-pop', name: 'Bubble Pop', fileName: 'BubblePop.mp3' },
    { id: 'bell-ding', name: 'Bell Ding', fileName: 'BellDing.mp3' },
    { id: 'cha-ching', name: 'Cha-Ching!', fileName: 'ChaChing.mp3' },
    { id: 'alien-pulse', name: 'Alien Pulse', fileName: 'AlienPulse.mp3' },
    { id: 'sonar', name: 'Sonar', fileName: 'Sonar.mp3' },
    { id: 'danger', name: 'Danger', fileName: 'Danger.mp3' },
  ];

  // Disable body scroll when modal is open and reset drag state
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset drag state when opening
      setDragY(0);
      setIsDragging(false);
      setHasUpdatedParent(false); // Reset update flag when opening
      // Sync local state with props when modal opens
      setLocalTone(selectedTone);
      // Small delay to ensure smooth slide-in animation
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
      // Stop any playing audio when modal closes
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setPlayingTone(null);
    };
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    // Don't start drag if touching a play button or checkbox
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
    // Don't start drag if clicking on a play button or checkbox
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
    // Stop any playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingTone(null);
    // Wait for slide-out animation to complete before calling onClose
    setTimeout(() => {
      onClose();
      // Apply changes when modal closes (only if a selection was made and we haven't already updated)
      if (localTone !== null && !hasUpdatedParent) {
        onUpdateTone(localTone);
      }
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop (not the modal content)
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleToneSelect = (toneId: string) => {
    setLocalTone(toneId);
    // Update parent immediately and close modal
    onUpdateTone(toneId);
    setHasUpdatedParent(true); // Mark that we've already updated the parent
    closeModal();
  };

  const handlePlayTone = (fileName: string, toneId: string) => {
    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Set playing state
    setPlayingTone(toneId);

    // Create new audio element and play
    const audio = new Audio(`/sounds/${fileName}`);
    audioRef.current = audio;
    
    // Add event listeners
    audio.addEventListener('ended', () => {
      setPlayingTone(null);
    });
    
    audio.addEventListener('error', () => {
      setPlayingTone(null);
      console.error('Error playing audio:', fileName);
    });
    
    audio.play().catch(error => {
      setPlayingTone(null);
      console.error('Error playing audio:', error);
    });
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
        className={`bg-[#fbfbfb] flex flex-col items-start justify-start overflow-hidden relative rounded-[21.371px] w-full max-w-[421px] mx-4 mb-6 transition-transform duration-300 ease-out touch-none select-none ${
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
          className="absolute bg-gray-500 h-[4.499px] left-1/2 rounded-[112.479px] top-[-2.37px] translate-x-[-50%] w-[35.993px] z-20"
        />
        
        {/* Header Section - EXACT FIGMA */}
        <div className="box-border flex flex-col gap-[4.499px] items-center justify-center overflow-hidden p-[17.997px] relative shrink-0 w-full">
          {/* Grid Background Pattern - EXACT FIGMA */}
          <div className="absolute bottom-[0.55px] flex flex-col items-start justify-start left-1/2 translate-x-[-50%] pointer-events-none">
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
            Set Custom Tone
          </div>
        </div>

        {/* Tones Container - EXACT FIGMA */}
        <div className="box-border flex flex-col gap-[8.998px] items-start justify-center p-[17.997px] relative shrink-0 w-full">
          
          {tones.map((tone) => (
            <div key={tone.id} className="box-border flex items-center justify-between px-0 py-[8.998px] relative shrink-0 w-full">
              <div className="flex gap-[11.248px] items-center justify-start relative shrink-0 w-[213.71px]">
                {/* Play Button / Spinner - EXACT FIGMA */}
                <button
                  onClick={() => handlePlayTone(tone.fileName, tone.id)}
                  className="flex h-[20.246px] items-center justify-center relative shrink-0 w-[20.246px] hover:opacity-80 transition-opacity"
                >
                  {playingTone === tone.id ? (
                    // Spinner when playing
                    <div className="w-[20.246px] h-[20.246px] border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  ) : (
                    // Play icon when not playing
                    <div className="flex-none rotate-90">
                      <div className="relative w-[20.246px] h-[20.246px]">
                        <img 
                          alt="play" 
                          className="block max-w-none size-full" 
                          src={playIcon} 
                        />
                      </div>
                    </div>
                  )}
                </button>
                
                {/* Tone Name - EXACT FIGMA */}
                <div 
                  className="font-jakarta font-medium text-[15.747px] leading-[26.995px] text-[#15171a] relative shrink-0 cursor-pointer"
                  onClick={() => handleToneSelect(tone.id)}
                >
                  {tone.name}
                </div>
              </div>
              
              {/* Checkbox - EXACT FIGMA */}
              <button
                role="checkbox"
                aria-checked={localTone === tone.id}
                onClick={() => handleToneSelect(tone.id)}
                className="flex gap-[8.998px] items-center justify-start relative shrink-0"
              >
                <div className={`relative shrink-0 w-[22.496px] h-[22.496px] rounded-[6px] transition-all duration-200 ${
                  localTone === tone.id 
                    ? 'bg-[#256bfd]' 
                    : 'border border-[#e1e3e6]'
                }`}>
                  {localTone === tone.id && (
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
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToneModal;
