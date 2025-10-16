// import { type ReactNode } from 'react';


// type Props = {
//     title: string;
//     value: string | number;
//     subtitle?: string;
//     icon?: ReactNode;
// };


// export default function StatCard({ title, value, subtitle, icon }: Props) {
//     return (
//         <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
//             <div className="flex items-center justify-between">
//                 <div>
//                     <div className="text-xs uppercase tracking-wider text-gray-500">{title}</div>
//                     <div className="mt-1 text-2xl font-semibold">{value}</div>
//                     {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
//                 </div>
//                 <div className="text-2xl" style={{ color: 'var(--brand-accent)' }}>{icon}</div>
//             </div>
//         </div>
//     );
// }