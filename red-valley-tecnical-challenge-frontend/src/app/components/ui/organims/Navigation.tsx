'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../atoms/Button'
import { Users, UserPlus, Stethoscope, UserCheck, Activity, Menu, X } from 'lucide-react'

const navItems = [
  { href: '/patients', label: 'Patients', icon: Users },
  { href: '/create-patient', label: 'Add Patient', icon: UserPlus },
  { href: '/providers', label: 'Doctors', icon: Stethoscope },
  { href: '/create-provider', label: 'Add Doctor', icon: UserCheck },
]

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link href={'/'} key={'home'}>
          <Button buttonClass="text-xl font-bold flex items-center gap-2 cursor-pointer">
            <Activity className="h-6 w-6" />
            Patient Management
          </Button>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link key={href} href={href} passHref>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    buttonClass="bg-blue-500 text-white px-4 py-2 rounded flex items-center cursor-pointer"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {label}
                  </Button>
              </Link>
            )
          })}
        </div>

        {/* Mobile Menu Button */}
        <Button
          buttonClass="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 py-2 space-y-2 grid grid-cols-2 gap-4">
          {navItems.map(({ href, label, icon: Icon }) => {
            return (
           <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-4 py-2 rounded bg-transparent text-white hover:bg-blue-600 transition-colors cursor-pointer"
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
