import PropTypes from 'prop-types';
import { cn } from "../utils.js"

function Divisor({ className, orientation = "horizontal", label, color = "black" }) {
  const colorClasses = {
    black: "bg-gray-300",
    red: "bg-red-700",
    yellow: "bg-yellow-700",
  }

  const baseClasses = cn(
    "flex items-center",
    orientation === "horizontal" ? "w-full" : "h-full flex-col",
    className
  )

  const lineClasses = cn(
    colorClasses[color],
    orientation === "horizontal" ? "h-px w-full" : "w-px flex-1"
  )

  return (
    <div className={baseClasses}>
      <div className={lineClasses} />
      {label && (
        <span
          className={cn(
            "px-2 text-sm text-muted-foreground",
            orientation === "vertical" && "py-2"
          )}
        >
          {label}
        </span>
      )}
      {label && <div className={lineClasses} />}
    </div>
  )
}

Divisor.propTypes = {
  className: PropTypes.string,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  label: PropTypes.string,
  color: PropTypes.oneOf(['black', 'red', 'yellow']),
};

export default Divisor


