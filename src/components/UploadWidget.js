import { useEffect, useRef, useState } from 'react'

const UploadWidget = ({ onFileSelect }) => {
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    const [url, setUrl] = useState([])

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: 'dwvhwovdd',
                uploadPreset: 'chicken'
            },
            (error, result) => {
                if (!error && result && result.event === 'success') {
                    const postedUrl = result.info.secure_url
                    setUrl(postedUrl)
                    onFileSelect(result.info.file)
                }
            }
        )
    }, [])

    const clearSelection = () => {
        setUrl(null)
        widgetRef.current.reset() // Reset the widget to clear the selected file
    }


    return (
        <div>
            {url && <p>Selected file: {url}</p>}
            <button type="button" onClick={() => widgetRef.current.open()}>
                Select File
            </button>
            <button type="button" onClick={clearSelection}>
                Clear Selection
            </button>
        </div>
    )
}

export default UploadWidget