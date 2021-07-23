import JSZip from "jszip";

// util function
const onDownload = (filename, data) => {
  let element = document.createElement('a');
  element.setAttribute('href', data);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();
  document.body.removeChild(element);
}

// Create link to download file
export const downloadZip = (filename, zipfile) => {
  onDownload(filename, 'data:application/zip;base64,' + zipfile)
}

// Create link to download file
export const downloadJson = (filename, content) => {
  var json = new Blob([content], {type: 'text/plain'});
  onDownload(filename, URL.createObjectURL(json))
}

// Generate zip files from keys
export const generateZip = async (privateFile, publicFile) => {
  var zip = new JSZip();
  zip.file("private.pem", privateFile);
  zip.file("public.pem", publicFile);  

  const base64 = await zip.generateAsync({type:"base64"});
  return Promise.resolve(base64)
}

// Show Size in human format
export const bytesToSize = (bytes) => {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}


// Get file from upload file
export const getFileData = (file) => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = event => {
      var data = event.target.result.split(',')[1];
      resolve(data)
    }
    reader.readAsDataURL(file);
  })
}

export const jsonHaveGoodFormat = json => {
  return (
    'name' in json &&
    'digestOriginal' in json &&
    'digestFirmed' in json &&
    'documentFirmed' in json &&
    'pemPublic' in json &&
    'size' in json &&
    'sizeHuman' in json &&
    'generated' in json &&
    !!json.name &&
    !!json.digestOriginal &&
    !!json.digestFirmed &&
    !!json.documentFirmed
  )
}
