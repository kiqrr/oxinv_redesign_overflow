import InventoryGrid from './InventoryGrid';
import { useAppSelector } from '../../store';
import { selectRightInventory } from '../../store/inventory';
import { isInventoryEmpty } from '../../utils/misc';
import React, {useEffect, useState} from "react";

const calcRender = (inventory: any) => {
  return !( inventory.type === "newdrop" && isInventoryEmpty(inventory) )
}

const RightInventory: React.FC = () => {
  const rightInventory = useAppSelector(selectRightInventory);
  const [shouldRender, setShouldRender] = useState( () => calcRender(rightInventory) );

  useEffect(() => {
    setShouldRender(
        () => calcRender(rightInventory)
    )
  }, [rightInventory]);

  return (
     <InventoryGrid meta={
       {
         isDropInventory: {
           value: true,
           type: rightInventory.type,
           shouldRender: shouldRender,
         }
       }
     } inventory={rightInventory} />
  )

}

export default RightInventory;
