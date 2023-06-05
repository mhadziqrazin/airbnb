'use client'

interface MenuItemProps {
  onClick?: () => void
  label?: string
  children?: React.ReactNode
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick, label, children
}) => {
  return (
    <button
      onClick={onClick}
      className="text-left px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition font-semibold"
    >
      {label}
      {children}
    </button>
  )
}

export default MenuItem