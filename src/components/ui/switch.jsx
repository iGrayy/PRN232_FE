// src/components/ui/switch.jsx
import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../../lib/utils'; // hàm nối className, ví dụ của shadcn/ui

export const Switch = React.forwardRef(
  ({ className, checked, onCheckedChange, ...props }, ref) => (
    <SwitchPrimitive.Root
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        checked ? 'bg-green-600' : 'bg-gray-200',
        className
      )}
      checked={checked}
      onCheckedChange={onCheckedChange}
      ref={ref}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </SwitchPrimitive.Root>
  )
);

Switch.displayName = SwitchPrimitive.Root.displayName;
