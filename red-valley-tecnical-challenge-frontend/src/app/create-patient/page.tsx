'use client'

import { useForm } from 'react-hook-form'
import { Button } from '../components/ui/atoms/Button'
import { Input } from '../components/ui/atoms/Input'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createPatient } from '../lib/api/api'
import { useRouter } from 'next/navigation'
import { getProviders, getStatuses } from '../lib/api/api'

export default function CreatePatientPage() {
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  
  const { data: providers } = useQuery({ queryKey: ['providers'], queryFn: getProviders })
  const { data: statuses } = useQuery({ queryKey: ['statuses'], queryFn: getStatuses })

  const mutation = useMutation({ mutationFn: createPatient, onSuccess: () => router.push('/patients') })

  const onSubmit = (data: any) => mutation.mutate(data)

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Patient</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Full Name" {...register('full_name')} className='w-full border border-gray-300 bg-white text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'/>
        <Input placeholder="Email" type="email" {...register('email')} className='w-full border border-gray-300 bg-white text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500' />
        <Input placeholder="Phone" {...register('phone')} className='w-full border border-gray-300 bg-white text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500' />

        <select {...register('provider_id')} className="w-full border border-gray-300 bg-white text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Select Provider</option>
          {providers?.map((p: any) => (
            <option key={p.id} value={p.id}>{p.full_name}</option>
          ))}
        </select>

        <select {...register('status_id')} className="w-full border border-gray-300 bg-white text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option className='bg-transparent' value="">Select Status</option>
          {statuses?.map((s: any) => (
            <option className='bg-transparent' key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <Button type="submit" buttonClass="bg-blue-600 text-white w-full rounded text-center p-3">Create Patient</Button>
      </form>
    </div>
  )
}
