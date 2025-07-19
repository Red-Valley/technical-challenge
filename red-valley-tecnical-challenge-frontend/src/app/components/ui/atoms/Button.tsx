import React from 'react'

type ButtonProps = {
  buttonClass?: string
  children: React.ReactNode
  variant?: string
  onClick?: () => void
  size?: string
  type?: 'button' | 'submit' | 'reset',
  disabled?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      buttonClass = '',
      children,
      variant = 'default',
      onClick,
      size = 'md',
      type = 'button',
      ...rest
    },
    ref
  ) => {
    return (
      <button
        type={type}
        ref={ref}
        onClick={onClick}
        className={buttonClass}
        {...rest}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
