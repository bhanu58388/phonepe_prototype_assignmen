import React from 'react';

interface PhonePeLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  textColor?: string;
}

export const PhonePeLogo: React.FC<PhonePeLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  textColor = 'text-white',
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-base',
    lg: 'w-12 h-12 text-xl',
  };

  const textClasses = {
    sm: 'text-base font-bold tracking-tight',
    md: 'text-lg font-bold tracking-tight',
    lg: 'text-2xl font-bold tracking-tight',
  };

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* PhonePe Distinctive Purple Rounded Square Badge with Devanagari 'पे' */}
      <div
        className={`${sizeClasses[size]} bg-gradient-to-br from-[#6f2dbd] to-[#4f1a87] text-white rounded-xl flex items-center justify-center font-extrabold shadow-sm shadow-[#5f259f]/30 shrink-0 border border-white/20`}
        aria-hidden="true"
      >
        <span className="font-sans font-black leading-none drop-shadow-sm">पे</span>
      </div>
      {showText && (
        <span className={`${textClasses[size]} ${textColor} font-sans tracking-tight`}>
          Phone<span className="text-[#a855f7] dark:text-[#c084fc]">Pe</span>
        </span>
      )}
    </div>
  );
};
