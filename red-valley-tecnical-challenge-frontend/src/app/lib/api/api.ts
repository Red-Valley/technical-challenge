export async function getProviders() {
  const res = await fetch('http://localhost:3001/api/providers')
  return res.json()
}

export async function getStatuses() {
  const res = await fetch('http://localhost:3001/api/statuses')
  return res.json()
}

export async function createPatient(data: any) {
  const res = await fetch('http://localhost:3001/api/patients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function createProvider(data: any) {
  const res = await fetch('http://localhost:3001/api/providers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}
export async function deletePatient(id: string) {
  const res = await fetch(`http://localhost:3001/api/patients/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Failed to delete patient')
  }

  return true
}

export async function deleteProvider(id: string) {
  const res = await fetch(`http://localhost:3001/api/providers/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Failed to delete provider')
  }

  return true
}
