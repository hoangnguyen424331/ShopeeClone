import { useSearchParams } from 'react-router-dom'

//lấy query param trên url
export default function useQueryParams() {
  const [searchParams] = useSearchParams()
  return Object.fromEntries([...searchParams])
}
