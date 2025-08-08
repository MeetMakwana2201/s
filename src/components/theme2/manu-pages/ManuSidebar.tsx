import Link from 'next/link';
import React from 'react'
import { ChevronRight } from 'lucide-react';

export default function ManuSidebar({ active }: { active: string }) {
  return (
    <>
      {/* Sidebar */}
      <aside className="w-[350px] p-4 px-0 bg-muted/20 hidden lg:block" >
        <nav className="space-y-2">
          <SidebarLink href="/profile" label="Profile" active={active} />
          <SidebarLink href="/saved-address" label="Saved Addresses" active={active} />
          <SidebarLink href="/order-history" label="Order History" active={active} />
          <SidebarLink href="/support-ticket" label="Support Ticket" active={active} />
        </nav>
      </aside >
    </>
  )
}

function SidebarLink({ href, label, active }: { href: string; label: string } & { active: string }) {
  // You can add active state later with `usePathname()` if needed
  return (
    <Link
      href={href}
      className={`flex justify-between rounded-2xl px-4 py-2 text-lg font-medium hover:bg-accent border  
        ${active === label ? 'border-black' : ''}`}
    >
      {label}
      <span>
        <ChevronRight />
      </span>
    </Link>
  );
}