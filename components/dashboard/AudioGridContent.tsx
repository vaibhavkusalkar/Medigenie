'use client';
import { Mic, MicOff } from "lucide-react";
import React, { useRef, useState } from "react";

const BAR_COUNT = 41; // Must be odd for a center bar
const CENTER_INDEX = Math.floor(BAR_COUNT / 2);
const FLICKER_INTENSITY = 0.8;
const VOLUME_THRESHOLD = 50;

const AudioGridContent = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [levels, setLevels] = useState<number[]>(Array(BAR_COUNT).fill(2));
    const animationRef = useRef<number | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null); // Reference to the MediaStream

    const barModifiers = useRef(
        Array.from({ length: CENTER_INDEX + 1 }, () => ({
            gain: 0.6 + Math.random() * 0.8,
            phaseOffset: Math.random() * 1000,
        }))
    );

    const startRecording = async () => {
        let audioContext: AudioContext;
        let analyser: AnalyserNode;
        let dataArray: Uint8Array;
        let source: MediaStreamAudioSourceNode;
        let startTime = performance.now();

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream; // Store the MediaStream reference

            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            audioContext = new AudioCtx();
            analyser = audioContext.createAnalyser();
            source = audioContext.createMediaStreamSource(stream);
            analyser.fftSize = 64;

            dataArray = new Uint8Array(analyser.frequencyBinCount);
            source.connect(analyser);

            const tick = (time: number) => {
                analyser.getByteFrequencyData(dataArray);
                const avg =
                    dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;

                const timeElapsed = time - startTime;

                // Build first half + center
                const halfLevels = barModifiers.current.map(({ gain, phaseOffset }) => {
                    let level = 2;

                    if (avg >= VOLUME_THRESHOLD) {
                        const base = avg * 0.25 * gain;
                        const flicker =
                            Math.sin((timeElapsed + phaseOffset) / 100) * (FLICKER_INTENSITY * 10);
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
            console.error("Mic error:", err);
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
    };

    const handleToggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
        setIsRecording((prev) => !prev);
    };

    return (
        <div className="relative h-full w-full flex items-center justify-center">
            {/* Mic icon */}
            <div className="flex h-full bg-white absolute z-10 items-center px-3">
                <button
                    onClick={handleToggleRecording}
                    className="bg-white py-1.5 rounded-full flex items-center justify-center"
                >
                    {isRecording ? <Mic size={50} /> : <MicOff size={50} />}
                </button>
            </div>

            {/* Equalizer bars */}
            {levels.map((level, idx) => {
                const totalHeight = Math.max(2, level * 2);
                const offset = (idx - CENTER_INDEX) * 6;

                return (
                    <div
                        key={idx}
                        className="absolute bg-black rounded-full w-[2px] transition-all duration-150 ease-in-out"
                        style={{
                            height: `${totalHeight}px`,
                            bottom: "50%",
                            transform: "translateY(50%)",
                            left: `calc(50% + ${offset}px)`,
                        }}
                    />
                );
            })}
        </div>
    );
};

export default AudioGridContent;