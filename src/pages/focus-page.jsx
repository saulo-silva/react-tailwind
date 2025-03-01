import { useQuery } from "@tanstack/react-query";
import { useIdle } from '@mantine/hooks';
const getFlow = async () => {
  const response = await fetch('https://json-server-caju.vercel.app/api/registrations');
  return response.json();
}

export function FocusPage() {
  const idle = useIdle(3000);
  const { data } = useQuery({
    queryKey: ['flow'],
    queryFn: getFlow,
    enabled: idle,
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true
  })

  const statusUser = data?.[0]?.status

  return (
    <div>
      <h1>Focus Page</h1>
      <p>Status: <span
        className={`rounded px-2 py-1 text-white ${statusUser === 'REVIEW' ? 'bg-blue-500' : statusUser === 'REPROVED' ? 'bg-red-500' : statusUser === 'APPROVED' ? 'bg-green-500' : ''}`}>{statusUser}</span>
      </p>
    </div>
  )
}

