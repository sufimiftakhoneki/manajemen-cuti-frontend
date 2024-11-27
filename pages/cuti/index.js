import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from '../../services/api';

const EditCuti = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [cuti, setCuti] = useState(null);
  const router = useRouter();
  const { id } = router.query; // Mendapatkan ID cuti dari URL

  useEffect(() => {
    if (id) {
      // Ambil data cuti berdasarkan ID
      axios.get('/cuti/${id}')
        .then((response) => {
          const cutiData = response.data;
          setCuti(cutiData);

          // Set nilai untuk formulir
          setValue('alasan_cuti', cutiData.alasan_cuti);
          setValue('tanggal_mulai_cuti', cutiData.tanggal_mulai_cuti);
          setValue('tanggal_selesai_cuti', cutiData.tanggal_selesai_cuti);
        })
        .catch((error) => {
          setErrorMessage('Gagal mengambil data cuti');
        });
    }
  }, [id]);

  const onSubmit = async (data) => {
    try {
      await axios.put('/cuti/${id}', data); // Update data cuti
      router.push('/dashboard'); // Kembali ke dashboard setelah berhasil
    } catch (error) {
      setErrorMessage('Gagal mengedit data cuti');
    }
  };

  if (!cuti) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Edit Cuti</h1>
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
        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  );
};

export default EditCuti;
