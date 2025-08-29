import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Inventory } from '../../typings';
import WeightBar from '../utils/WeightBar';
import InventorySlot from './InventorySlot';
import { getTotalWeight } from '../../helpers';
import { useAppSelector } from '../../store';
import { useIntersection } from '../../hooks/useIntersection';
import InventoryControl from './InventoryControl';
import {Backpack, WeightIcon} from 'lucide-react';
import { InventoryButtonCategory } from './InventoryButtonCategory';
import { IconName } from 'lucide-react/dynamic';

const PAGE_SIZE = 30;

interface InventoryMeta {
  isMainInventory?: boolean;
  isDropInventory?: {
    value: boolean,
    type: string,
    shouldRender: boolean;
  };
}

const InventoryGrid: React.FC<{ inventory: Inventory, renderControl?: boolean, meta?: InventoryMeta }> = ({ inventory, renderControl, meta = {} }) => {
  const weight = useMemo(
    () => (inventory.maxWeight !== undefined ? Math.floor(getTotalWeight(inventory.items) * 1000) / 1000 : 0),
    [inventory.maxWeight, inventory.items]
  );
  const [page, setPage] = useState(0);
  const containerRef = useRef(null);
  const { ref, entry } = useIntersection({ threshold: 0.5 });
  const isBusy = useAppSelector((state) => state.inventory.isBusy);

  useEffect(() => {
    if (entry && entry.isIntersecting) {
      setPage((prev) => ++prev);
    }
  }, [entry]);

  return (
    <div className='flex flex-col gap-2'>

      {
        renderControl && (
          <>
            {
              /*<span className='buttons flex flex-row-reverse gap-2'>
                <InventoryButtonCategory view={"clothing"} icon='cuboid' />
              </span>*/
            }

            <div style={{ border: "4px solid #2f303183", backgroundColor: "rgba(10, 10, 10, .98)" }} className='flex justify-around items-center p-3 rounded-xl '>
              <span className='flex items-center gap-2'>
                <Backpack color='#EFEFF0' />
                <p className='text-[#EFEFF0] text-2xl'>INVENTORY</p>
              </span>
              <InventoryControl />
            </div>
          </>
        )
      }

      <div
          className={`relative inventory-grid-wrapper rounded-xl
           transition-all duration-300
          ${meta?.isDropInventory?.value ? meta.isDropInventory.shouldRender ? "opacity-100 h-auto p-3 pb-5 border-4" : "opacity-0 h-0 scale-y-[50%] scale-x-0 p-0" : "p-3 pb-5 border-4" }`}
          style={{ pointerEvents: isBusy ? 'none' : 'auto', backgroundColor: "rgba(10, 10, 10, .99)", borderColor: "#2f303188" }}
      >
        <div>
 

          <div style={{ color: "rgb(227 228 227)" }} className="relative flex flex-col rounded-sm mt-2 py-1 pb-3 mx-3">
            <div className="flex justify-around">
              <p style={{ textTransform: "uppercase" }}>{ meta.isDropInventory?.type === "newdrop" ? "FLOOR" : inventory.label }</p>
              { inventory.maxWeight && (
                  <span className="header_resolve flex px-2 gap-2">
                      <WeightIcon></WeightIcon>
                        <p>
                          {weight / 1000}/{inventory.maxWeight / 1000}kg
                        </p>
                  </span>
              ) }
            </div>
            
            {/* Barra de progreso del peso */}
            { inventory.maxWeight && (
              <div className="absolute w-full bottom-0 left-0">
                <div style={{ backgroundColor: "rgba(255, 255, 255, 0.10)" }} className="w-full rounded-full h-[2px]">
                  <div 
                    className="h-[2px] rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.55)",
                      width: `${Math.min((weight / inventory.maxWeight) * 100, 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          { /* <div className="inventory-grid-header-wrapper">
            <p>{inventory.label}</p>
            {inventory.maxWeight && (
              <p>
                {weight / 1000}/{inventory.maxWeight / 1000}kg
              </p>
            )}
          </div>
          <WeightBar percent={inventory.maxWeight ? (weight / inventory.maxWeight) * 100 : 0} /> */ }
        </div>
        <div className={`inventory-grid-container ${meta?.isDropInventory?.value ? meta.isDropInventory.shouldRender ? "p-3" : "p-0" : "p-3" }`} ref={containerRef}>
          <>
            {inventory.items.slice(0, (page + 1) * PAGE_SIZE).map((item, index) => (
              <InventorySlot
                key={`${inventory.type}-${inventory.id}-${item.slot}`}
                item={item}
                ref={index === (page + 1) * PAGE_SIZE - 1 ? ref : null}
                inventoryType={inventory.type}
                inventoryGroups={inventory.groups}
                inventoryId={inventory.id}
              />
            ))}
          </>
        </div>
      </div>
    </div>
  );
};

export default InventoryGrid;
