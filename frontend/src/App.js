import React from 'react';
import './index.css'

function App() {
  return (
    <div className='flex flex-col h-screen'>
      <div className='flex place-content-between p-2'>
        <span>Project Cacodemon</span>
        <a className='rounded p-1 border border-solid'>
          註冊
        </a>
      </div>

      <div className='flex items-center justify-center grow'>
        工事中
      </div>
    </div>
  );
}

export default App;