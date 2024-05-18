'use client'

import { z } from 'zod'
import { Spec } from '@prisma/client'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'

import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AlertModal } from '@/components/modals/alert-modal'

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
})

type SpecFormValues = z.infer<typeof formSchema>

interface SpecFormProps {
  initialData: Spec | null
}
export const SpecForm: React.FC<SpecFormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData
    ? 'Редактировать характеристику'
    : 'Создать характеристику'
  const description = initialData
    ? 'Редактировать характеристику'
    : 'Добавить новую характеристику'
  const toastMessage = initialData
    ? 'Характеристика обновлена'
    : 'Характеристика созданна'
  const action = initialData ? 'Сохранить изменения' : 'Создать'

  const form = useForm<SpecFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    },
  })

  const onSubmit = async (data: SpecFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/specs/${params.specId}`, data)
      } else {
        await axios.post(`/api/${params.storeId}/specs`, data)
      }
      router.refresh()
      router.push(`/${params.storeId}/specs`)
      toast.success(toastMessage)
    } catch (error) {
      toast.error('Что-то пошло не так.')
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeId}/specs/${params.specId}`)
      router.refresh()
      router.push(`/${params.storeId}/specs`)
      toast.success(toastMessage)
    } catch (error) {
      toast.error(
        'Убедитесь, что вы удалили все категории, использующие эту доску'
      )
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Название характеристики"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Свойство</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Свойство"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
