import { motion } from 'framer-motion';
import '../../styles/UI.css';

const Button = ({
  children,
  variant = 'primary',
  href,
  onClick,
  icon,
  className = '',
  ...props
}) => {
  const Tag = href ? 'a' : 'button';

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      <Tag
        href={href}
        onClick={onClick}
        className={`button button-${variant} ${className}`}
        {...props}
      >
        {children}
        {icon && <span className="button-icon">{icon}</span>}
      </Tag>
    </motion.div>
  );
};

export default Button;
