'use client'
import { TagEditor as Component } from '../../../components/admin/organisms/TagEditor'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import { useCustomToast } from '../../../hooks/useCustomToast'
import { TagType } from '../../../types'
type TagEditorProps = {
  tag: TagType
}
export const TagEditor = ({ tag }: TagEditorProps) => {
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const selectedTag: TagType = {
    id: tag.id,
    name: tag.name,
    color: tag.color,
    backgroundColor: tag.backgroundColor,
    created_at: tag.created_at,
    updated_at: tag.updated_at,
    deleted_at: tag.deleted_at,
  }
  const [tagData, setTagData] = useState<TagType>(selectedTag)

  const [errors, setErrors] = useState({
    nameError: '',
    colorError: '',
    backgroundColorError: '',
  })

  const [isSubmitting, SetIsSubmitting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!tagData) {
        showErrorToast('データの取得に失敗しました。')
      }
    }, 10000)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagData])

  const hasChanges = () => {
    return JSON.stringify(selectedTag) !== JSON.stringify(tag)
  }

  const isNotChanged = useCallback(() => {
    return !hasChanges()
  }, [hasChanges])

  const updateTag = async (event: FormEvent) => {
    event.preventDefault()

    SetIsSubmitting(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tag`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: tagData.id,
            name: tagData.name,
            color: tagData.color,
            backgroundColor: tagData.backgroundColor,
          }),
        },
      )

      const validResults = await response.json()

      if (response.ok) {
        showSuccessToast(validResults.message)
        setErrors({
          nameError: '',
          colorError: '',
          backgroundColorError: '',
        })
      } else {
        showErrorToast('タグの更新に失敗しました。')
      }
    } catch (error) {
      showErrorToast('タグの更新に失敗しました。')
    } finally {
      SetIsSubmitting(false)
    }
  }

  return (
    <Component
      tagData={tagData}
      setTagData={setTagData}
      updateTag={updateTag}
      isNotChanged={isNotChanged}
      errors={errors}
      isSubmitting={isSubmitting}
    />
  )
}
