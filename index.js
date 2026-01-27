import 'dotenv/config';
import axios from 'axios';
import fs from 'fs';

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID;
const emotions = JSON.parse(fs.readFileSync('./emotions.json'));

const emotion = process.argv[2] || 'calm';
const emotionSettings = emotions[emotion];

if (!emotionSettings) {
  console.error(`❌ Emotion "${emotion}" not found`);
  process.exit(1);
}

const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;

const payload = {
  text: `This voice is speaking with ${emotion} emotion.`,
  model_id: "eleven_multilingual_v2",
  voice_settings: emotionSettings
};

async function run() {
  try {
    const response = await axios.post(url, payload, {
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'
      },
      responseType: 'arraybuffer'
    });

    const fileName = `output-${emotion}.mp3`;
    fs.writeFileSync(fileName, response.data);
    console.log(`✅ Audio created: ${fileName}`);
  } catch (err) {
    console.error('❌ Error:', err.response?.data || err.message);
  }
}

run();
