import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'zgtxw8fc', 
  dataset: 'production',
  apiVersion: '2024-07-01',
  useCdn: true,
})
