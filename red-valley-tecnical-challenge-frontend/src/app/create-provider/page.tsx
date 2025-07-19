'use client'

import { useForm } from 'react-hook-form'
import { Button } from '../components/ui/atoms/Button'
import { Input } from '../components/ui/atoms/Input'
import { useMutation } from '@tanstack/react-query'
import { createProvider } from '../lib/api/api'
import { useRouter } from 'next/navigation'

export default function CreateProviderPage() {
  const { register, handleSubmit } = useForm()
  const router = useRouter()

  const mutation = useMutation({ mutationFn: createProvider, onSuccess: () => router.push('/providers') })

  const onSubmit = (data: any) => mutation.mutate(data)

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Provider</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Full Name" {...register('full_name')} className='w-full border border-gray-300 bg-white text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500' />
        <Input placeholder="Specialty" {...register('specialty')} className='w-full border border-gray-300 bg-white text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'/>
        <Button type="submit" buttonClass="bg-blue-600 text-white w-full rounded text-center p-3">Create Provider</Button>
      </form>
    </div>
  )
}
