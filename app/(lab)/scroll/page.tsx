import { BaseScroll } from '@/components/BaseScroll';
import { ButtonShowcase } from './ButtonShowcase';

export default function ScrollPreview() {
  const items = Array.from({ length: 50 }, (_, i) => i + 1);

  return (
    <div className="h-full min-h-0 flex flex-col">
      <BaseScroll>
        <div className="p-4 space-y-2">
          <ButtonShowcase />
          {items.map((n) => (
            <div
              key={n}
              className={`h-16 flex items-center px-4 rounded ${n % 2 === 0 ? 'bg-zinc-200' : 'bg-zinc-400'}`}
            >
              Item {n}
            </div>
          ))}
        </div>
      </BaseScroll>
    </div>
  );
}

// Base Scrollable Page (without Scroll Container)
// export default function ScrollPreview() {
//   const items = Array.from({ length: 50 }, (_, i) => i + 1)

//   return (
//     <div className="h-full min-h-0 flex flex-col">
//       {/* Scroll container */}
//       <div className="flex-1 min-h-0 overflow-y-auto">
//         <div className="p-4 space-y-2">
//           {items.map((n) => (
//             <div
//               key={n}
//               className={`
//                 h-16
//                 flex items-center px-4 rounded
//                 ${n % 2 === 0 ? 'bg-zinc-200' : 'bg-zinc-400'}
//               `}
//             >
//               Item {n}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
