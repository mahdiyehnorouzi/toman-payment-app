import React from 'react';

interface BadgeProps {
  text: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'custom';
  className?: string;
  customColors?: string;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'default',
  className = '',
  customColors = '',
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    custom: customColors,
  };

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {text}
    </span>
  );
};

export default Badge;