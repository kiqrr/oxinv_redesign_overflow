import React, { useEffect, useState } from 'react'
import { IdCard } from 'lucide-react'
import { fetchNui } from '../../utils/fetchNui';

interface ControlProps {
    id?: string;
}

export const ShowID: React.FC<ControlProps> = () => {

    return (
        <div onClick={() => fetchNui('showID')} className="shadow-md bg-white p-2 text-[#0A0A0A] rounded-xl border-[#0A0A0A] border-b-4 border-r-4 cursor-pointer hover:text-white hover:border-white hover:bg-[#0A0A0A] active:scale-[1.02] transition-all duration-200">
            <span className="flex items-center gap-2">
                <IdCard color={"currentColor"} />
            </span>
        </div>
    )
}
