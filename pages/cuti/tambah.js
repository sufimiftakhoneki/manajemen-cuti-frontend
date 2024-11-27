import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from '../../services/api';
import { useRouter } from 'next/router';

const TambahCuti = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await axios.post('/cuti', data);
      router.push('/dashboard'); // Kembali ke dashboard setelah berhasil
    } catch (error) {
      setErrorMessage('Gagal menambahkan cuti');
    }
  };

  return (
    <div>
      <h1>Tambah Cuti</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Alasan Cuti</label>
          <input {...register('alasan_cuti', { required: 'Alasan cuti wajib diisi' })} />
          {errors.alasan_cuti && <p>{errors.alasan_cuti.message}</p>}
        </div>
        <div>
          <label>Tanggal Mulai Cuti</label>
          <input type="date" {...register('tanggal_mulai_cuti', { required: 'Tanggal mulai cuti wajib diisi' })} />
          {errors.tanggal_mulai_cuti && <p>{errors.tanggal_mulai_cuti.message}</p>}
        </div>
        <div>
          <label>Tanggal Selesai Cuti</label>
          <input type="date" {...register('tanggal_selesai_cuti', { required: 'Tanggal selesai cuti wajib diisi' })} />
          {errors.tanggal_selesai_cuti && <p>{errors.tanggal_selesai_cuti.message}</p>}
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Tambah Cuti</button>
      </form>
    </div>
  );
};

export default TambahCuti;
