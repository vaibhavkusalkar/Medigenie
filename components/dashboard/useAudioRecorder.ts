'use client';

import { GetAnalyzeResponse } from '@/types/api';
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';

let mediaRecorder: any = null;
let audioBlobs: Blob[] = [];
let capturedStream: MediaStream | null = null;

/**
 * Registers the WAV encoder.
 */
export async function setupWavEncoder(): Promise<void> {
  await register(await connect());
}

/**
 * Starts recording audio using extendable-media-recorder with WAV format.
 */
export async function startRecording(): Promise<void> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
      },
    });

    audioBlobs = [];
    capturedStream = stream;

    mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'audio/wav',
    });

    mediaRecorder.addEventListener('dataavailable', (event: BlobEvent) => {
      audioBlobs.push(event.data);
    });

    mediaRecorder.start();
  } catch (error) {
    console.error('Error starting recording:', error);
  }
}

/**
 * Stops recording and returns the final audio Blob.
 */
export function stopRecording(): Promise<Blob | null> {
  return new Promise((resolve) => {
    if (!mediaRecorder) {
      resolve(null);
      return;
    }

    mediaRecorder.addEventListener('stop', () => {
      const mimeType = mediaRecorder!.mimeType;
      const audioBlob = new Blob(audioBlobs, { type: mimeType });

      if (capturedStream) {
        capturedStream.getTracks().forEach((track) => track.stop());
      }

      resolve(audioBlob);
    });

    mediaRecorder.stop();
  });
}

export async function uploadBlob(audioBlob: Blob, fileType: string = 'webm'): Promise<string> {
  const formData = new FormData();
  formData.append('audio_data', audioBlob, 'file');
  formData.append('type', fileType);
  // if (consultationId !== null) {
  //   formData.append('consultation_id', consultationId);
  // }

  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/get-transcript`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    cache: 'no-cache',
    body: formData,
  });
    
    const result = await response.json();
    //console.log('Response from server:', result);
    return result.transcript; // Assumes server returns { transcripts: ... }
}
