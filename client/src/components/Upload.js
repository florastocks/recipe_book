import { useState } from 'react'


const Upload = ({ data, setData }) => {

  const [loading, setLoading] = useState(false)
  // const [ imageSelected, setImageSelected ] = useState('')

  const uploadImage = async (e) => {
    const files = e.target.files
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('upload_preset', 'recipes_user_upload')
    setLoading(true)

    const res = await fetch('https://api.cloudinary.com/v1_1/aaf-proj3/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    )

    const File = await res.json()
    console.log(File.secure_url)
    setData({ ...data, profile_image: File.secure_url })
    setLoading(false)
  }

  return (
    <div>
      <input type="file" name='profile_image' onChange={uploadImage} />
      <br />
      {loading ? (<h3>Loading...</h3>) : <img src={data.images} style={{ width: '200px' }}/>}
    </div>
  )
}
export default Upload
