// import React from "react";
// import "./sidebar.css";

// const NavItem = ({ icon, label, badge, active }) => (
//     <a className={`rf-nav-item ${active ? "active" : ""}`} href="#">
//         <span className="rf-icon" aria-hidden>{icon}</span>
//         <span className="rf-label">{label}</span>
//         {badge && <span className="rf-badge">{badge}</span>}
//     </a>
// );
// export default function Sidebar({ open }) {
//     return (
//         <aside className={`rf-sidebar ${open ? "open" : "collapsed"}`}>
//             <nav className="rf-nav">
//                 <NavItem active label="Dashboard" badge="5" icon={<HomeIcon />} />
//                 <NavItem label="Orders" icon={<UsersIcon />} />
//                 <NavItem label="Inventory" badge="12" icon={<FolderIcon />} />
//                 <NavItem label="Expenses" badge="20+" icon={<CalendarIcon />} />
//                 <NavItem label="Shipping" icon={<DocIcon />} />
//                 <NavItem label="Reports" icon={<ReportIcon />} />
//                 <NavItem label="Settings" icon={<ReportIcon />} />
//             </nav>
//             <div className="rf-divider" />
//         </aside>
//     );
// }

// /* icons (نفس اللي عندك) */
// function HomeIcon() { return (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11l9-7 9 7" /><path d="M9 22V12h6v10" /></svg>); }
// function UsersIcon() { return (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="3" /><path d="M20 8a3 3 0 1 0-6 0" /></svg>); }
// function FolderIcon() { return (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h5l2 2h11v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>); }
// function CalendarIcon() { return (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>); }
// function DocIcon() { return (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>); }
// function ReportIcon() { return (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h18v4H3z" /><path d="M7 7v14M12 7v14M17 7v14" /></svg>); }
