import React, { useCallback, useState } from 'react';
import { FileAudio, Upload } from 'lucide-react';

interface AudioUploadProps {
  onUpload: (file: File) => void;
}

const AudioUpload: React.FC<AudioUploadProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const audioFile = files.find(file => file.type.startsWith('audio/'));
      
      if (audioFile) {
        setFile(audioFile);
        onUpload(audioFile);
      }
    },
    [onUpload]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files[0]) {
        setFile(files[0]);
        onUpload(files[0]);
      }
    },
    [onUpload]
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl">
      <div className="text-center mb-4">
        <div className="inline-block p-3 bg-blue-50 rounded-full mb-2">
          <FileAudio className="w-6 h-6 text-blue-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Audio File</h2>
      </div>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-4 text-center transition-colors
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${file ? 'bg-green-50 border-green-500' : 'hover:border-blue-400'}
        `}
      >
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileInput}
          className="hidden"
          id="audio-upload"
        />
        <label
          htmlFor="audio-upload"
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          <Upload className="w-8 h-8 text-gray-400" />
          {file ? (
            <span className="text-green-600 font-medium">{file.name}</span>
          ) : (
            <>
              <span className="text-gray-600">Drop your audio file here</span>
              <span className="text-sm text-gray-500">or click to browse</span>
            </>
          )}
        </label>
      </div>
    </div>
  );
}

export default AudioUpload;

