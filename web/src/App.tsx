import InventoryComponent from './components/inventory';
import useNuiEvent from './hooks/useNuiEvent';
import { Items } from './store/items';
import { Locale } from './store/locale';
import { setImagePath } from './store/imagepath';
import { setupInventory } from './store/inventory';
import { Inventory } from './typings';
import { useAppDispatch } from './store';
import { debugData } from './utils/debugData';
import DragPreview from './components/utils/DragPreview';
import { fetchNui } from './utils/fetchNui';
import { useDragDropManager } from 'react-dnd';
import KeyPress from './components/utils/KeyPress';
import { closeContextMenu } from './store/contextMenu';
import { closeTooltip } from './store/tooltip';
import { useRef } from 'react';

interface HandleCloseClickEvent extends React.MouseEvent<HTMLDivElement, MouseEvent> {}

debugData([
  {
    action: 'setupInventory',
    data: {
      leftInventory: {
        id: 'test',
        type: 'player',
        slots: 50,
        label: 'Bob Smith',
        weight: 3000,
        maxWeight: 5000,
        items: [
          {
            slot: 1,
            name: 'iron',
            weight: 3000,
            metadata: {
              description: `name: Svetozar Miletic  \n Gender: Male`,
              ammo: 3,
              mustard: '60%',
              ketchup: '30%',
              mayo: '10%',
              imageurl: "https://i.imgur.com/b9lMvL5.png"
            },
            count: 5,
          },
          { slot: 2, name: 'powersaw', weight: 0, count: 1, metadata: { durability: 75, imageurl: "https://i.imgur.com/Lfwfj4G.png" } },
          { slot: 3, name: 'copper', weight: 100, count: 12, metadata: { type: 'Special', imageurl: "https://i.imgur.com/oQo8ByL.png" } },
          {
            slot: 4,
            name: 'water',
            weight: 100,
            count: 1,
            metadata: { description: 'Generic item description' },
          },
          { slot: 5, name: 'water', weight: 100, count: 1, metadata: { 
              description: 'Generic item description',
              durability: 75,
              ammo: 20,
              serial: "1234567890",
            }
        },
        ],
      },
      rightInventory: {
        id: 'shop',
        type: 'newdrop',
        slots: 20,
        label: 'Bob Smith',
        weight: 3000,
        maxWeight: 5000,
        items: [
          
        ],
      },
    },
  },
]);

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const manager = useDragDropManager();
  const inventoryRef = useRef<{ openInventory: () => void; closeInventory: () => void }>(null);

  useNuiEvent<{
    locale: { [key: string]: string };
    items: typeof Items;
    leftInventory: Inventory;
    imagepath: string;
  }>('init', ({ locale, items, leftInventory, imagepath }) => {
    for (const name in locale) Locale[name] = locale[name];
    for (const name in items) Items[name] = items[name];

    setImagePath(imagepath);
    dispatch(setupInventory({ leftInventory }));
  });

  fetchNui('uiLoaded', {});

  useNuiEvent('closeInventory', () => {
    manager.dispatch({ type: 'dnd-core/END_DRAG' });
  });

  const handleCloseClick = (event: HandleCloseClickEvent): void => {
    if (event.target === event.currentTarget) {
      inventoryRef.current?.closeInventory();
    }
  }

  return (
    <div className="app-wrapper" onClick={handleCloseClick}>
      <InventoryComponent ref={inventoryRef} />
      <DragPreview />
      <KeyPress />
    </div>
  );
};

addEventListener("dragstart", function(event) {
  event.preventDefault()
})

export default App;
