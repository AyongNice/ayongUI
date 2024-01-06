export function trackUploadProgress({action, name, file, method, headers, data, withCredentials, progressCallback}) {
  return new Promise((resolve, reject) => {
    const reader = file.stream().getReader();
    const totalSize = file.size;
    /**
     *     const localReaderFile = new FileReader();
     *
     *     localReaderFile.onprogress = (e) => {
     *       if (e.lengthComputable) {
     *         const progress = (e.loaded / e.total) * 100;
     *         console.log(`localReaderFile----progress: ${progress.toFixed(2)}%`);
     *       }
     *     };
     *
     *     localReaderFile.onload = () => {
     *       // 文件加载完成后的处理
     *       console.log('localReaderFile---- successfully:', localReaderFile.result,file);
     *     };
     *
     *     localReaderFile.onerror = () => {
     *       console.error('localReaderFile---- loading failed');
     *     };
     *     localReaderFile.readAsArrayBuffer(file);
     */

    let erroeStauts = false;
    let uploadedSize = 0;
    const formData = new FormData();
    formData.append(name, file);

    for (let key in data) {
      formData.append(key, data[key]);
    }
    fetch(action, {
      method: method,
      credentials: withCredentials ? 'include' : 'omit',
      headers,
      body: formData
    }).then(response => {
      if (!response.ok) {
        erroeStauts = true;
        throw new Error('Upload failed');
      }
      resolve(response);
    }).catch(error => {
      erroeStauts = true;
      reject(error);
    });

    reader.read().then(function processChunk({done, value}) {
      console.log('erroeStauts', erroeStauts);
      if (done || erroeStauts) {
        return;
      }

      uploadedSize += value.length;
      const progress = (uploadedSize / totalSize) * 100;
      progressCallback(progress);
      return reader.read().then(processChunk);
    });
  });
}


