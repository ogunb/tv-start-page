import type { InputHTMLAttributes } from 'react';
import classnames from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({
  label,
  disabled,
  className,
  ...attrs
}: InputProps) {
  const classes = classnames(
    'w-full px-4 py-2 bg-sky-100 border border-transparent focus:border-sky-500 text-sky-900 rounded-sm focus:outline-none focus:border',
    { 'bg-sky-600': disabled },
    className
  );

  return (
    <label>
      {label ? label : null}
      <input id="name" type="text" name="name" className={classes} {...attrs} />
    </label>
  );
}
