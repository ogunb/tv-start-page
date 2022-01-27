import type { ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const getRandomLoadingStatement = () => {
  const lines = [
    'Locating the required gigapixels to render...',
    'Spinning up the hamster...',
    'Shovelling coal into the server...',
    'Programming the flux capacitor',
  ];

  return lines[Math.round(Math.random() * (lines.length - 1))];
};

export default function Button({
  children,
  loading,
  className = '',
  ...attrs
}: ButtonProps) {
  const disabled = loading || attrs.disabled;

  const classes = classnames(
    'font-semibold rounded bg-sky-500 px-4 py-2 border-2 border-transparent',
    { 'bg-sky-600': disabled },
    className
  );

  return (
    <button className={classes} disabled={disabled} {...attrs}>
      {loading ? getRandomLoadingStatement() : children}
    </button>
  );
}
