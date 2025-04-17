"use client";

import AudioPlayer from "@/components/ui/AudioPlayer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full gap-4 grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        <AudioPlayer
          audioSrc="https://storage.googleapis.com/pc_media_files/audio/74b89be1-9985-4e8f-8246-c26c64a350e5.wav"
          audioTitle="Test mp3"
        />
      </div>
    </main>
  );
}
