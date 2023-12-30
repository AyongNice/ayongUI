import React, {useEffect} from 'react';

const FileLsit = ({selectedFile = []}) => {
  useEffect(() => {
    console.log(selectedFile)
  }, [selectedFile])
  return <>
    {
      selectedFile.map((item, index) => <div key={index}>
          <span>{item.name}</span>
          <span>{item.size}</span>
        </div>
      )
    }
  </>
}

export default FileLsit
