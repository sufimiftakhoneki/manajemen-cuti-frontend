// pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect user to /login page
    router.push('/login');
  }, [router]);

  return null; // Halaman ini tidak akan menampilkan apa-apa karena langsung diarahkan
}
