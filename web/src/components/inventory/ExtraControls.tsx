import React, { useState } from 'react'
import { ShowID } from './ShowID'
// import { ShowClothing } from './ShowClothing'
import InventoryClothing from './InventoryClothing'
import { fetchNui } from '../../utils/fetchNui';

export const ExtraControls: React.FC = () => {
    const [clothingMenuVisible, setClothingMenuVisible] = useState(false);
    
    const toggleClothingMenu = () => {
        setClothingMenuVisible(prev => !prev);
    };
    
    const handleRevert = () => {
        fetchNui("toggleCloth", "revertir");
    };
    
    return (
        <>
            <div className='flex justify-between w-full px-2 translate-y-[0.45rem]'>
                <div className='flex'>
                    {clothingMenuVisible && (
                        <div 
                            onClick={handleRevert} 
                            className="shadow-md bg-white p-2 text-[#0A0A0A] rounded-xl border-[#0A0A0A] border-b-4 border-r-4 cursor-pointer hover:text-white hover:border-white hover:bg-[#0A0A0A] active:scale-[1.02] transition-all duration-200"
                        >
                            <span className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24"><path fill="currentColor" d="M18.258 3.508a.75.75 0 0 1 .463.693v4.243a.75.75 0 0 1-.75.75h-4.243a.75.75 0 0 1-.53-1.28L14.8 6.31a7.25 7.25 0 1 0 4.393 5.783a.75.75 0 0 1 1.488-.187A8.75 8.75 0 1 1 15.93 5.18l1.51-1.51a.75.75 0 0 1 .817-.162"/></svg>
                            </span>
                        </div>
                    )}
                </div>
                <div className='flex flex-row-reverse gap-2'>
                    <ShowID />
                    {/* <ShowClothing toggleClothingMenu={toggleClothingMenu} /> */}
                </div>
            </div>
            <InventoryClothing visible={clothingMenuVisible} />
        </>
    )
}