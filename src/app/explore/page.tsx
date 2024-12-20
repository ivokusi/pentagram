"use client";

import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");

  const handleSearch = async (text: string) => {
    
    console.log(text)

  };

  return (
    <div className="flex flex-col justify-between h-full p-8">
        <div className="max-w-full">
        <div className="w-full">
            <div className="flex gap-2">
            <input
                type="text"
                value={inputText}
                onChange={e => {
                  setInputText(e.target.value);
                  handleSearch(e.target.value);
                }}
                className="flex-1 p-3 rounded-lg bg-black/[.05] dark:bg-white/[.06] border border-black/[.08] dark:border-white/[.145] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                placeholder="Search for images..."
            />
            </div>
        </div>
        </div>
        <div className="flex-1">
        {/* TODO: Add a section here to display generated images */}
        </div>
    </div>
  );
}
