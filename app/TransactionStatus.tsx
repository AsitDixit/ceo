import React, { useState, useEffect } from 'react';

type propType={
  company:string
}

function TransactionStatus(company: propType ) {
  const [messages, setMessages] = useState([
    'Composing mail using ChatGPT 4',
    `Sending mail to CEO of ${company.company}`,
    'Mail is on the way...🌠 🌠 🌠 ',
    'Mail reached the CEO',
    'They verified and approved the request, 🥳🎉',
    `Successfully you've become CEO of ${company.company}. Now, buy a flight ticket to ${company.company} and run your company.`,
  ]);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (messageIndex < messages.length - 1) {
        setMessageIndex((prevMessageIndex) => prevMessageIndex + 1);
      }
    }, 1500);

    return () => {
      clearInterval(intervalId);
    };
  }, [messageIndex, messages]);

  return (
    <div>
      <p>{messages[messageIndex]}</p>
    </div>
  );
}

export default TransactionStatus;
