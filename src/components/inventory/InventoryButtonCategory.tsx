import React from 'react'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'


interface InventoryButtonCategoryProps {
    view: string,
    icon?: IconName
}

export const InventoryButtonCategory: React.FC<InventoryButtonCategoryProps> = ({ view, icon = "cuboid" }) => {
  return (
    <div className='bg-white py-1 px-3 rounded-md border-box'>
        <DynamicIcon name={icon} color="#de6262" size={30} />
    </div>
  )
}
