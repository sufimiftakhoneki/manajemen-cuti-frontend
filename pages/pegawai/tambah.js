import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from '../../services/api';

const TambahPegawai = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await axios.post('/pegawai', data);
      router.push('/dashboard'); // Kembali ke dashboard setelah berhasil
    } catch (error) {
      setErrorMessage('Gagal menambahkan pegawai');
    }
  };

  return (
    <div>
      <h1>Tambah Pegawai</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nama Depan</label>
          <input {...register('nama_depan', { required: 'Nama depan wajib diisi' })} />
          {errors.nama_depan && <p>{errors.nama_depan.message}</p>}
        </div>
        <div>
          <label>Nama Belakang</label>
          <input {...register('nama_belakang', { required: 'Nama belakang wajib diisi' })} />
          {errors.nama_belakang && <p>{errors.nama_belakang.message}</p>}
        </div>
        <div>
          <label>Email</label>
          <input type="email" {...register('email', { required: 'Email wajib diisi' })} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>No HP</label>
          <input {...register('no_hp', { required: 'No HP wajib diisi' })} />
          {errors.no_hp && <p>{errors.no_hp.message}</p>}
        </div>
        <div>
          <label>Alamat</label>
          <textarea {...register('alamat', { required: 'Alamat wajib diisi' })}></textarea>
          {errors.alamat && <p>{errors.alamat.message}</p>}
        </div>
        <div>
          <label>Jenis Kelamin</label>
          <select {...register('jenis_kelamin', { required: 'Jenis kelamin wajib dipilih' })}>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          {errors.jenis_kelamin && <p>{errors.jenis_kelamin.message}</p>}
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Tambah Pegawai</button>
      </form>
    </div>
  );
};

export default TambahPegawai;
