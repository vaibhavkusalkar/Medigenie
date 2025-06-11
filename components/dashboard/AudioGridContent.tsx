'use client';

import React, { useState } from 'react';
import {
  setupWavEncoder,
  startRecording,
  stopRecording,
  uploadBlob,
} from './useAudioRecorder';
import { Mic, MicOff } from 'lucide-react';
import { GetAnalyzeResponse, GetDoctorOrganizationResponse } from '@/types/api';
import axios from 'axios';

const AudioRecorderComponent: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [loading, isLoading] = useState(false);

  const handleStart = async () => {
    await setupWavEncoder();
    await startRecording();
    setIsRecording(true);
  };

  const handleStop = async () => {
    const blob = await stopRecording();
    setIsRecording(false);
    isLoading(true);

    if (blob) {
      // Upload to server after recording
      const response = await uploadBlob(blob, 'wav');
      console.log('Response from server:', response);

      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/analyze`;
      const payload = {
        transcript: response,
        consultation_id: sessionStorage.getItem('consultationId'),
      };

      const result = await axios.post<GetAnalyzeResponse>(apiUrl,payload);

      sessionStorage.setItem('prescribedMedicine', JSON.stringify(result.data.prescribed_medicine));
      sessionStorage.setItem('top5Diseases', JSON.stringify(result.data.top_5_disease));
      sessionStorage.setItem('transcriptSummary', result.data.transcript_summary);
      //setTranscript(response.transcript || 'No transcript returned');
      isLoading(false);
    }
  };

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      {/* Mic icon */}
      <div className="flex h-full absolute z-10 items-center px-3">
        <button
          onClick={isRecording ? handleStop : handleStart}
          className="bg-white opacity-100 py-1.5 rounded-full flex items-center justify-center p-4 "
        >
          {isRecording ? <Mic size={70} color="black" /> : <MicOff size={70} color="black" />}
        </button>
      </div>
    </div>
  );
};

export default AudioRecorderComponent;



{/* <div className="flex flex-col items-center gap-4">
      <button onClick={isRecording ? handleStop : handleStart} className="bg-blue-600 text-white px-4 py-2 rounded">
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>

      {transcript && (
        <div className="text-white mt-4 p-3 bg-gray-800 rounded">
          <strong>Transcript:</strong> {transcript}
        </div>
      )}
    </div> */}


//     {
//   "code": "analyze_success",
//   "message": "Transcript analysis successful",
//   "prescribed_medicine": [
//     "Laxatives and antacids for COPD",
//     "Antimicrobial medications to fight cancer",
//     "Antinephritis for kidney stones",
//     "Stress management and nutrition supplements",
//     "Hydrants for respiratory infections"
//   ],
//   "top_5_disease": [
//     {
//       "name": "Cancer",
//       "percentage": 10
//     },
//     {
//       "name": "Chronic Obstructive Pulmonary Disease (COPD)",
//       "percentage": 9
//     },
//     {
//       "name": "Kidney Stone",
//       "percentage": 8
//     },
//     {
//       "name": "Lung Cancer",
//       "percentage": 7
//     },
//     {
//       "name": "Respiratory System Infections (RSI)",
//       "percentage": 6
//     }
//   ],
//   "transcript_summary": "Tushar is trying to lose weight by eating healthy foods and exercising. He shares his journey of losing weight, including challenges and difficulties he faced, which eventually led him to reach his goal."
// }
