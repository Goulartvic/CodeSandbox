// Body.tsx
import { useState, useEffect } from 'react';

export default function Body() {
  const [flag, setFlag] = useState<string>('');
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/7a6970')
      .then(response => response.text())
      .then(data => {
        setFlag(data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isLoading && displayedText.length < flag.length) {
      const timer = setTimeout(() => {
        setDisplayedText(flag.slice(0, displayedText.length + 1));
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [displayedText, isLoading, flag]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {displayedText.split('').map((char, index) => (
        <li key={index}>{char}</li>
      ))}
    </ul>
  );
}

// Script to get URL in step 2
// const elements = document.querySelectorAll('b.ramp.ref');
// const values = Array.from(elements).map(element => element.getAttribute('value'));
// const formattedValues = values.map(value => value.replace(/,/g, ''));
// const url = formattedValues.join('');
// console.log(url);
