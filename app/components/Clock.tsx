import React from 'react';

export function Clock() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="font-bold text-9xl text-center text-white">
      {time.toLocaleTimeString('tr-TR', {
        timeStyle: 'short',
      })}
    </div>
  );
}
