const FOLDER_NAME = 'OdiaTTS_Data';
const CSV_FILE_NAME = 'metadata.csv';

function setupEnvironment() {
  const folders = DriveApp.getFoldersByName(FOLDER_NAME);
  let folder;
  if (folders.hasNext()) {
    folder = folders.next();
  } else {
    folder = DriveApp.createFolder(FOLDER_NAME);
  }

  const files = folder.getFilesByName(CSV_FILE_NAME);
  let csvFile;
  if (files.hasNext()) {
    csvFile = files.next();
  } else {
    csvFile = folder.createFile(CSV_FILE_NAME, 'timestamp,speaker_id,name,age,gender,district,dialect,standard_text,translated_text,audio_filename\n', MimeType.CSV);
  }
  
  return { folder, csvFile };
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const { folder, csvFile } = setupEnvironment();
    
    // Parse Payload
    const timestamp = new Date().toISOString();
    const speakerId = data.metadata.name.replace(/\s+/g, '_').toLowerCase() + '_' + Date.now().toString().slice(-6);
    const audioFilename = `${speakerId}_${Date.now()}.wav`;
    
    // Save Audio File
    const audioBase64 = data.audio.replace(/^data:audio\/\w+;base64,/, '');
    const audioBlob = Utilities.newBlob(Utilities.base64Decode(audioBase64), 'audio/wav', audioFilename);
    const savedAudioFile = folder.createFile(audioBlob);
    
    // Append to CSV
    const csvContent = csvFile.getBlob().getDataAsString();
    const newRow = [
      timestamp,
      speakerId,
      `"${data.metadata.name}"`,
      data.metadata.age,
      data.metadata.gender,
      `"${data.metadata.district}"`,
      `"${data.metadata.dialect}"`,
      `"${data.text.standard}"`,
      `"${data.text.translated}"`,
      audioFilename
    ].join(',') + '\n';
    
    csvFile.setContent(csvContent + newRow);
    
    // Calculate Stats
    const allLines = (csvContent + newRow).split('\n').filter(line => line.trim() !== '');
    const totalVoices = allLines.length - 1; // Subtract header
    
    // Calculate contributor rank (count unique speakers before this one + 1)
    const speakerIds = allLines.slice(1).map(line => line.split(',')[1]);
    const uniqueSpeakers = [...new Set(speakerIds)];
    const contributorRank = uniqueSpeakers.length;

    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'success', 
      message: 'Data saved successfully',
      speakerId: speakerId,
      audioUrl: savedAudioFile.getUrl(),
      stats: {
        totalVoices: totalVoices,
        contributorRank: contributorRank
      }
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error', 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests for analytics
function doGet(e) {
  try {
    const { csvFile } = setupEnvironment();
    const csvContent = csvFile.getBlob().getDataAsString();
    const lines = csvContent.split('\n').filter(line => line.trim() !== '');
    
    const totalVoices = lines.length - 1;
    const speakerIds = lines.slice(1).map(line => line.split(',')[1]);
    const uniqueSpeakers = [...new Set(speakerIds)].length;
    
    // Estimate hours (assuming ~3 seconds per recording)
    const estimatedHours = ((totalVoices * 3) / 3600).toFixed(1);

    const stats = {
      totalVoices: totalVoices,
      activeSpeakers: uniqueSpeakers,
      hoursCollected: parseFloat(estimatedHours),
      districts: [...new Set(lines.slice(1).map(line => line.split(',')[5]))].length
    };

    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'success', 
      stats: stats 
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error', 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle CORS Preflight Options
function doOptions(e) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(headers);
}
