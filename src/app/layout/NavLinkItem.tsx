import { NavLink } from 'react-router-dom';
import { type ReactNode } from 'react';


type Props = { to: string; icon?: ReactNode; label: string };


export default function NavLinkItem({ to, icon, label }: Props) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors
${isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`
            }
        >
            {icon}
            <span>{label}</span>
        </NavLink>
    );
}