import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => setMessage('API failed: ' + err));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🧠 Spring Boot + React Demo</h1>
      <p>後端回傳訊息：{message}</p>
    </div>
  );
}

export default App;