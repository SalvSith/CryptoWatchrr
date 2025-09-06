import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedPriceProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  isAnimating?: boolean;
}

const AnimatedPrice: React.FC<AnimatedPriceProps> = ({ 
  value, 
  onChange, 
  className = '',
  placeholder = '0.00',
  isAnimating = false
}) => {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (isAnimating) {
      // Trigger animation by changing key
      setAnimationKey(prev => prev + 1);
    }
  }, [isAnimating]);

  return (
    <motion.div
      key={animationKey}
      initial={isAnimating ? { scale: 0.95, opacity: 0.7 } : false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        scale: {
          type: "spring",
          damping: 20,
          stiffness: 400
        }
      }}
      className="inline-flex"
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
      />
    </motion.div>
  );
};

export default AnimatedPrice;
