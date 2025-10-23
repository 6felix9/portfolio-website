'use client';

import { Moon, Sun } from 'lucide-react';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ThemeToggleButtonProps {
  theme?: 'light' | 'dark';
  showLabel?: boolean;
  className?: string;
  onClick?: () => void;
}

export const ThemeToggleButton = ({
  theme = 'light',
  showLabel = false,
  className,
  onClick,
}: ThemeToggleButtonProps) => {
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <Button
      variant="ghost"
      size={showLabel ? 'default' : 'icon'}
      onClick={handleClick}
      className={cn(
        'relative overflow-hidden transition-all border border-border bg-transparent dark:bg-transparent hover:bg-accent hover:text-accent-foreground',
        showLabel && 'gap-2',
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <div className="relative grid place-items-center w-[1.2rem] h-[1.2rem]">
        <div
          className={cn(
            'absolute inset-0 transition-all duration-300 ease-in-out flex justify-center items-center',
            theme === 'light'
              ? 'opacity-100 scale-100 rotate-0'
              : 'opacity-0 scale-0 rotate-180'
          )}
        >
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        </div>
        <div
          className={cn(
            'absolute inset-0 transition-all duration-300 ease-in-out flex justify-center items-center',
            theme === 'light'
              ? 'opacity-0 scale-0 -rotate-180'
              : 'opacity-100 scale-100 rotate-0'
          )}
        >
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        </div>
      </div>
      {showLabel && (
        <span className="text-sm">
          {theme === 'light' ? 'Light' : 'Dark'}
        </span>
      )}
    </Button>
  );
};
