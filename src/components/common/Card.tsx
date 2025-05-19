import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  return (
    <div
      className={`
        bg-white rounded-lg shadow-sm border border-gray-200
        overflow-hidden
        ${hoverable ? 'transition-transform duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;