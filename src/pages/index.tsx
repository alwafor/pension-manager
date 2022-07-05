import {useRef} from 'react'
import Tesseract from 'tesseract.js'

const Home = () => {

  const fileInputRef = useRef<HTMLInputElement>(null)

  const recognizeText = () => {
    if(!fileInputRef.current || !fileInputRef.current.files?.length) {
      return
    }
    
    const file = fileInputRef.current.files[0]
    
    Tesseract.recognize(file, 'rus', {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      console.log(text)
    })
  }

  return (
    <div>
      <input type="file" ref={fileInputRef}/>

      <button onClick={() => recognizeText()} type="button" id="start">
        Начать обработку
      </button>
    </div>
  )
}

export default Home
