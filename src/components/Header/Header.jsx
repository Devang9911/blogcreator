import React, { useEffect, useRef, useState } from 'react'
import { Logo } from "../index"
import Hamburger from 'hamburger-react'

function Header() {

  const [open, setOpen] = useState(false)
  const menuRef = useRef()

  useEffect(() => {
    const handler = (e) => {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  return (
    <header className='bg-gray-400 p-4 flex justify-between'>
      <Logo />

      {/* hamburger button */}

      <div ref={menuRef} className='sm:hidden'>
        <Hamburger toggled={open} toggle={setOpen} />

        {/* mobile menu design */}
        {open && (
          <div className='absolute top-20 right-0 bg-gray-400 border-t-2 min-w-full'>
            <ul className='flex flex-col gap-4 px-4 py-5 items-start'>
              <li onClick={() => setOpen(false)} className='cursor-pointer'>Home</li>
              <li onClick={() => setOpen(false)} className='cursor-pointer'>Blog</li>
              <li onClick={() => setOpen(false)} className='cursor-pointer'>Add-Blog</li>
              <li onClick={() => setOpen(false)} className='cursor-pointer'>Sign-up</li>
            </ul>
          </div>
        )}
      </div>

    </header>
  )
}

export default Header