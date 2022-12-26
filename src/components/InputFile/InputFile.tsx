import React, { useCallback, useRef } from 'react'
import { toast } from 'react-toastify'
import { config } from 'src/constants/config'

interface Props {
  onChange?: (fileImage?: File) => void
}

export default function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileFromLocal = event.target.files?.[0]
      fileInputRef.current?.setAttribute('value', '')
      if (
        fileFromLocal &&
        (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))
      ) {
        toast.error(`Dụng lượng file tối đa 1 MB. Định dạng:.JPEG, .PNG`, {
          position: 'top-center'
        })
      } else {
        onChange && onChange(fileFromLocal)
      }
    },
    [onChange]
  )

  const handleUpload = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return (
    <div>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={(event) => onFileChange(event)}
        onClick={(event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(event.target as any).value = null
        }}
      />
      <button
        onClick={() => handleUpload()}
        type='button'
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
      >
        Chọn ảnh
      </button>
    </div>
  )
}
