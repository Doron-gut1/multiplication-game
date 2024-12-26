import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

const Dialog = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { open: boolean; onOpenChange: (open: boolean) => void }
>(({ children, open, onOpenChange }, ref) => {
  return (
    <AnimatePresence>
      {open && (
        <div 
          ref={ref}
          className="fixed inset-0 z-50"
          onClick={() => onOpenChange(false)}
        >
          <motion.div 
            className="fixed inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div 
            className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg sm:rounded-lg"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
})
Dialog.displayName = "Dialog"

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => {
  const motionProps = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 0.1 }
  }

  return (
    <div
      ref={ref}
      className={`relative bg-white shadow-lg rounded-lg max-h-[90vh] overflow-y-auto ${className}`}
      {...props}
    >
      <motion.div {...motionProps}>
        {children}
      </motion.div>
    </div>
  )
})
DialogContent.displayName = "DialogContent"

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => {
  const motionProps = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 0.2 }
  }

  return (
    <div
      ref={ref}
      className={`flex flex-col space-y-1.5 text-center sm:text-right p-6 ${className}`}
      {...props}
    >
      <motion.div {...motionProps}>
        {children}
      </motion.div>
    </div>
  )
})
DialogHeader.displayName = "DialogHeader"

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className = "", children, ...props }, ref) => {
  const motionProps = {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { delay: 0.3 }
  }

  return (
    <h2
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    >
      <motion.span {...motionProps}>
        {children}
      </motion.span>
    </h2>
  )
})
DialogTitle.displayName = "DialogTitle"

export { Dialog, DialogContent, DialogHeader, DialogTitle }