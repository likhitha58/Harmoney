import React, { useState } from 'react';
import { FaMagic, FaRocket, FaImages } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';


const DreamFrameUI = () => {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('HD');
  const [preference, setPreference] = useState('Speed');

  const styles = [
    { name: 'Default', icon: '↻' },
    { name: 'Panda', icon: '🐼' },
    { name: 'Futuristic', icon: '🤖' },
    { name: 'Fantasy', icon: '🧝‍♀️' }
  ];

  return (
    <div className="flex h-screen bg-[#0f0d1e] text-white">
      {/* Sidebar Controls */}
      <div className="w-[30%] p-6 space-y-6 border-r border-gray-700">
        <h1 className="text-xl font-bold mb-4">Create an image from text prompt</h1>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you'd like to generate"
          className="w-full p-3 rounded bg-[#1a1733] text-white resize-none h-28 focus:outline-none"
        />

        <Button className="bg-purple-600 w-full py-2 rounded text-white hover:bg-purple-700">
          Submit
        </Button>

        {/* Model Selection */}
        <div>
          <p className="font-semibold mb-2">Choose a model</p>
          <div className="flex gap-3">
            {['Standard', 'HD', 'Genius'].map((m) => (
              <button
                key={m}
                onClick={() => setModel(m)}
                className={`px-4 py-2 rounded ${
                  model === m ? 'bg-purple-700 text-white' : 'bg-[#1f1c38]'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Preference */}
        <div>
          <p className="font-semibold mb-2">Preference</p>
          <div className="flex gap-3">
            {['Speed', 'Quality'].map((p) => (
              <button
                key={p}
                onClick={() => setPreference(p)}
                className={`px-4 py-2 rounded ${
                  preference === p ? 'bg-purple-700 text-white' : 'bg-[#1f1c38]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Styles */}
        <div>
          <p className="font-semibold mb-2">Choose a style</p>
          <div className="flex gap-4">
            {styles.map((s, idx) => (
              <button key={idx} className="w-12 h-12 rounded-full bg-[#1f1c38] flex items-center justify-center text-xl hover:bg-purple-700">
                {s.icon}
              </button>
            ))}
          </div>
          <button className="mt-2 text-purple-400 text-sm hover:underline">
            View all +100 styles
          </button>
        </div>

        {/* Shape Dropdown */}
        <div>
          <details className="text-sm mt-4">
            <summary className="cursor-pointer text-purple-400">Choose Shape</summary>
            <div className="mt-2">
              <select className="bg-[#1f1c38] w-full p-2 rounded text-white">
                <option>Square</option>
                <option>Portrait</option>
                <option>Landscape</option>
              </select>
            </div>
          </details>
        </div>
      </div>

      {/* Image Preview Panel */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-[#1a1733] w-3/4 h-3/4 flex items-center justify-center rounded-xl border-2 border-[#2c294a]">
          <span className="text-6xl animate-pulse">🐬</span>
        </div>
      </div>
    </div>
  );
};

export default DreamFrameUI;
