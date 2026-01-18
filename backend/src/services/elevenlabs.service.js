import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import { Readable } from 'stream';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

// Default voice ID for George (a good general voice)
const DEFAULT_VOICE_ID = 'JBFqnCBsd6RMkjVDRZzb';

// Lazy-initialize ElevenLabs client
let elevenlabsClient = null;
function getElevenLabsClient() {
  if (!elevenlabsClient) {
    elevenlabsClient = new ElevenLabsClient({
      apiKey: ELEVENLABS_API_KEY
    });
  }
  return elevenlabsClient;
}

/**
 * Convert text to speech using ElevenLabs API
 * @param {string} text - The text to convert to speech
 * @param {string} voiceId - Optional voice ID (defaults to George)
 * @returns {Buffer} Audio buffer
 */
export async function textToSpeech(text, voiceId = DEFAULT_VOICE_ID) {
  try {
    const client = getElevenLabsClient();
    
    // Use the official SDK method
    const audio = await client.textToSpeech.convert(voiceId, {
      text: text,
      modelId: 'eleven_multilingual_v2',
      outputFormat: 'mp3_44100_128',
    });

    // Convert the stream to a buffer
    const chunks = [];
    const reader = audio.getReader();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    
    return Buffer.concat(chunks);
  } catch (error) {
    console.error('ElevenLabs TTS Error:', error);
    throw new Error('Failed to convert text to speech');
  }
}

/**
 * Convert speech to text using ElevenLabs Speech to Text API
 * @param {Buffer} audioBuffer - Audio file buffer
 * @param {string} languageCode - Language code (optional, auto-detect if not provided)
 * @returns {string} Transcribed text
 */
export async function speechToText(audioBuffer, languageCode = null) {
  try {
    const elevenlabs = getElevenLabsClient();
    
    // Create a Blob from the buffer
    const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' });
    
    const transcription = await elevenlabs.speechToText.convert({
      file: audioBlob,
      modelId: 'scribe_v2', // ElevenLabs Speech to Text model
      tagAudioEvents: true, // Tag audio events like laughter, applause, etc.
      languageCode: languageCode, // Language of the audio file. If null, auto-detect
      diarize: false // Whether to annotate who is speaking (false for single speaker)
    });

    // Extract the transcription text
    return transcription.text || '';
  } catch (error) {
    console.error('ElevenLabs Speech to Text Error:', error.response?.data || error.message);
    throw new Error('Failed to convert speech to text');
  }
}

/**
 * Get available voices from ElevenLabs
 * @returns {Array} List of available voices
 */
export async function getAvailableVoices() {
  try {
    const client = getElevenLabsClient();
    const voices = await client.voices.getAll();
    return voices.voices;
  } catch (error) {
    console.error('Get Voices Error:', error);
    throw new Error('Failed to get available voices');
  }
}
