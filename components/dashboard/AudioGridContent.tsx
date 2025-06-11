'use client';
import { Mic, MicOff } from 'lucide-react';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { GetAnalyzeResponse } from '@/types/api';



const BAR_COUNT = 41; // Must be odd for a center bar
const CENTER_INDEX = Math.floor(BAR_COUNT / 2);
const FLICKER_INTENSITY = 0.8;
const VOLUME_THRESHOLD = 50;

const AudioGridContent = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [levels, setLevels] = useState<number[]>(Array(BAR_COUNT).fill(2));
  const animationRef = useRef<number | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null); // Reference to the MediaStream
  const [transcript, setTranscript] = useState<string>('');
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const barModifiers = useRef(
    Array.from({ length: CENTER_INDEX + 1 }, () => ({
      gain: 0.6 + Math.random() * 0.8,
      phaseOffset: Math.random() * 1000,
    }))
  );

//   const fetchAnalyze = async () => {
//     try {
//       const consultationId = sessionStorage.getItem('consultationId');
//       if (!consultationId) {
//         console.error('No consultationId found in sessionStorage.');
//         return;
//       }
//       const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL || ''}/analyze`;
//       const response = await axios.post<GetAnalyzeResponse>(apiUrl, {
//         transcript, // include transcript from state
//         consultationId, // include consultationId from sessionStorage
//       });
//       sessionStorage.setItem('prescribedMedicine', JSON.stringify(response.data.prescribed_medicine));
//       sessionStorage.setItem('topDiseases', JSON.stringify(response.data.top_5_diseases));
//       sessionStorage.setItem('transcriptSummary', response.data.transcript_summary);
//       console.log('Fetched Analyze:', response.data);
//     } catch (error) {
//       console.error('Failed to fetch Analyze:', error);
//     }
//   };

  const startRecording = async () => {
    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let dataArray: Uint8Array;
    let source: MediaStreamAudioSourceNode;
    let startTime = performance.now();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream; // Store the MediaStream reference

      const recorder = new MediaRecorder(stream);
      audioChunks.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.current.push(e.data);
      };
      recorder.onstop = handleAudioStop;
      recorder.start();

      setMediaRecorder(recorder);

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioContext = new AudioCtx();
      analyser = audioContext.createAnalyser();
      source = audioContext.createMediaStreamSource(stream);
      analyser.fftSize = 64;

      dataArray = new Uint8Array(analyser.frequencyBinCount);
      source.connect(analyser);

      const tick = (time: number) => {
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;

        const timeElapsed = time - startTime;

        // Build first half + center
        const halfLevels = barModifiers.current.map(({ gain, phaseOffset }) => {
          let level = 2;

          if (avg >= VOLUME_THRESHOLD) {
            const base = avg * 0.25 * gain;
            const flicker = Math.sin((timeElapsed + phaseOffset) / 100) * (FLICKER_INTENSITY * 10);
            level = Math.max(2, base + flicker);
          }

          return level;
        });

        // Mirror left and right
        const mirroredLevels = [
          ...halfLevels.slice(0, -1).reverse(), // left side (excluding center)
          ...halfLevels, // center + right
        ];

        setLevels(mirroredLevels);
        animationRef.current = requestAnimationFrame(tick);
      };

      animationRef.current = requestAnimationFrame(tick);
    } catch (err) {
      console.error('Mic error:', err);
      setIsRecording(false); // Stop recording if there's an error
    }
  };

  const stopRecording = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setLevels(Array(BAR_COUNT).fill(2)); // Reset levels

    // Stop all tracks of the MediaStream
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null; // Clear the MediaStream reference
    }

    // Stop MediaRecorder for Whisper
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  // Send audio to backend for Whisper transcription
const handleAudioStop = async () => {
  const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
  const url = URL.createObjectURL(audioBlob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'recording.webm';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);


    // try {
    //   const response = await axios.post<{ transcript: string }>(
    //     `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL || ''}/whisper-transcribe`,
    //     formData,
    //     { headers: { 'Content-Type': 'multipart/form-data' } }
    //   );
    //   setTranscript(response.data.transcript);
    // } catch (err) {
    //   console.error('Whisper transcription failed:', err);
    //   setTranscript('');
    // }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
      // Call the API for further actions like analysis if needed after transcription
      // fetchAnalyze(); 
    } else {
      startRecording();
    }
    setIsRecording((prev) => !prev);
  };

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      {/* Mic icon */}
      <div className="flex h-full absolute z-10 items-center px-3">
        <button
          onClick={handleToggleRecording}
          className="bg-white opacity-100 py-1.5 rounded-full flex items-center justify-center p-2 "
        >
          {isRecording ? <Mic size={70} color="black" /> : <MicOff size={50} color="black" />}
        </button>
      </div>

      {/* Equalizer bars */}
      {levels.map((level, idx) => {
        const totalHeight = Math.max(2, level * 2);
        const offset = (idx - CENTER_INDEX) * 6;

        return (
          <div
            key={idx}
            className="absolute bg-white rounded-full w-[2px] transition-all duration-150 ease-in-out"
            style={{
              height: `${totalHeight}px`,
              bottom: '50%',
              transform: 'translateY(50%)',
              left: `calc(50% + ${offset}px)`,
            }}
          />
        );
      })}
    </div>
  );
};

export default AudioGridContent;
