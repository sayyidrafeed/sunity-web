import { CircleCheck, Info, LoaderCircle, OctagonX, TriangleAlert } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group font-jakarta"
      icons={{
        success: <CircleCheck className="h-4 w-4 text-[#2F6B3F]" />,
        info: <Info className="h-4 w-4 text-[#3f5af4]" />,
        warning: <TriangleAlert className="h-4 w-4 text-[#f9d509]" />,
        error: <OctagonX className="h-4 w-4 text-[#D32124]" />,
        loading: <LoaderCircle className="h-4 w-4 animate-spin text-[#5A5A57]" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-[#1F1F1D] group-[.toaster]:border-[#E5E5E3] group-[.toaster]:shadow-lg group-[.toaster]:rounded-[16px] p-4 flex gap-3 items-center',
          success: 'group-[.toaster]:bg-[#EBF3ED]! group-[.toaster]:text-[#2F6B3F]! group-[.toaster]:border-[#2F6B3F]/20!',
          error: 'group-[.toaster]:bg-[#FCE8E8]! group-[.toaster]:text-[#D32124]! group-[.toaster]:border-[#D32124]/20!',
          info: 'group-[.toaster]:bg-[#3f5af4]/10! group-[.toaster]:text-[#3f5af4]! group-[.toaster]:border-[#3f5af4]/20!',
          warning: 'group-[.toaster]:bg-[#f9d509]/10! group-[.toaster]:text-[#f9d509]! group-[.toaster]:border-[#f9d509]/20!',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
