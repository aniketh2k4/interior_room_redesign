"use client"
import React, { useContext, useState } from 'react'
import ImageSelection from './_components/ImageSelection'
import RoomType from './_components/RoomType'
import DesignType from './_components/DesignType'
import AdditionalReq from './_components/AdditionalReq'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/config/firebaseConfig'
import { useUser } from '@clerk/nextjs'
import CustomLoading from './_components/CustomLoading'
import AiOutputDialog from '../_components/AiOutputDialog'
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { db } from '@/config/db'
import { Users } from '@/config/schema'   // ✅ correct import

function CreateNew() {
  const { user } = useUser()
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [aiOutputImage, setAiOutputImage] = useState()
  const [openOutputDialog, setOpenOutputDialog] = useState(false)
  const [closeDialog,setCloseDialog] = useState(false);
  const [orgImage, setOrgImage] = useState()
  const { userDetail, setUserDetail } = useContext(UserDetailContext)

  const onHandleInputChange = (value, fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }))
    console.log(formData)
  }

  const GenerateAiImage = async () => {
    if (!userDetail || userDetail.credits <= 0) {
      alert("You don’t have enough credits!")
      return
    }

    setLoading(true)
    try {
      const rawImageUrl = await SaveRawImageToFirebase()
      const result = await axios.post('/api/redesign-room', {
        imageUrl: rawImageUrl,
        roomType: formData?.roomType,
        designType: formData?.designType,
        additionalReq: formData?.additionalReq,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      })
      console.log(result)

      await updateUserCredits()   // ✅ safe now

      setAiOutputImage(result.data.result)
      setOpenOutputDialog(true)
    } catch (err) {
      console.error("Error generating AI image:", err)
    } finally {
      setLoading(false)
    }
  }

  const SaveRawImageToFirebase = async () => {
    const fileName = Date.now() + "_raw.png"
    const imageRef = ref(storage, 'room-redesign/' + fileName)

    await uploadBytes(imageRef, formData.image)
    console.log('File Uploaded...')

    const downloadUrl = await getDownloadURL(imageRef)
    console.log(downloadUrl)
    setOrgImage(downloadUrl)
    return downloadUrl
  }

  const updateUserCredits = async () => {
    if (!userDetail) return

    const result = await db
      .update(Users)
      .set({
        credits: (userDetail.credits || 0) - 1,  // ✅ safe subtraction
      })
      .returning({ id: Users.id })

    if (result?.length > 0) {
      setUserDetail(prev => ({
        ...prev,
        credits: (prev?.credits || 0) - 1,  // ✅ update context safely
      }))
      return result[0].id
    }
  }

  return (
    <div>
      <h2 className='font-bold text-4xl text-primary text-center'>
        Experience the Magic of AI Remodeling
      </h2>
      <p className='text-center text-gray-500'>
        Transform any room with a click. Select a space, choose a style, and watch as AI instantly reimagines your environment.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10'>
        <ImageSelection selectedImage={value => onHandleInputChange(value, 'image')} />

        <div>
          <RoomType selectedRoomType={value => onHandleInputChange(value, 'roomType')} />
          <DesignType selectedDesignType={value => onHandleInputChange(value, 'designType')} />
          <AdditionalReq additionalRequirementInput={value => onHandleInputChange(value, 'additionalReq')} />

          <Button className="w-full mt-5" onClick={GenerateAiImage}>
            Generate
          </Button>
          <p className='text-sm text-gray-500 mb-52'>
            NOTE: 1 Credit will be used to redesign your room
          </p>
        </div>
      </div>

      <CustomLoading loading={loading} />

      <AiOutputDialog
        openDialog={openOutputDialog}
        closeDialog={setOpenOutputDialog}
        orgImage={orgImage}
        aiImage={aiOutputImage}
      />
    </div>
  )
}

export default CreateNew
