import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const VARIANTS = {
  primary: 'btn-primary',
  accent: 'btn-accent',
  outline: 'btn-outline',
  light: 'btn-light',
  ghostLight: 'btn-ghost-light',
};

/**
 * Button – one button for the whole site, with hover + tap animation.
 * Pass `to` to render a router link, otherwise it renders a <button>.
 */
export default function Button({ to, variant = 'primary', size, className = '', children, ...props }) {
  const classes = `btn ${VARIANTS[variant]} ${size === 'sm' ? 'btn-sm' : ''} ${className}`;
  const motionProps = { whileHover: { y: -2, scale: 1.03 }, whileTap: { scale: 0.95 }, transition: { type: 'spring', stiffness: 400, damping: 20 } };

  if (to) {
    return (
      <motion.span className="inline-block" {...motionProps}>
        <Link to={to} className={classes} {...props}>{children}</Link>
      </motion.span>
    );
  }
  return (
    <motion.button className={classes} {...motionProps} {...props}>
      {children}
    </motion.button>
  );
}
