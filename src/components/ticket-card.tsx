import React from 'react'

interface TickerCardProps {
  message: string
}

export const TickerCard: React.FC<TickerCardProps> = ({ message }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 w-64 h-16 flex items-center overflow-hidden">
      <p className="w-full text-2xl text-gray-700 truncate font-['Reenie_Beanie']">{message}</p>
    </div>
  )
}