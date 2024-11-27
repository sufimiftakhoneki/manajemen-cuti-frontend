import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from '../../services/api';

const EditPegawai = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [pegawai, setPegawai] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get('/pegawai/${id}')
        .then((response) => {
          const pegawaiData = response.data;
          setPegawai(pegawaiData);

          setValue('nama_depan', pegawaiData.nama_depan);
          setValue('nama_belakang', pegawaiData.nama_belakang);
          setValue('email', pegawaiData.email);
          setValue('no_hp', pegawaiData.no_hp);
          setValue('alamat', pegawaiData.alamat);
          setValue('jenis_kelamin', pegawaiData.jenis_kelamin);
        })
        .catch((error) => {
          setErrorMessage('Gagal mengambil data pegawai');
        });
    }
  }, [id]);

  const onSubmit = async (data) => {
    try {
      await axios.put('/pegawai/${id}', data);
      router.push('/pegawai'); // Kembali ke daftar pegawai setelah berhasil
    } catch (error) {
      setErrorMessage('Gagal memperbarui data pegawai');
    }
  };

  if (!pegawai) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Edit Pegawai</h1>
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
          <input {...register('email', { required: 'Email wajib diisi' })} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>No HP</label>
          <input {...register('no_hp', { required: 'Nomor HP wajib diisi' })} />
          {errors.no_hp && <p>{errors.no_hp.message}</p>}
        </div>
        <div>
          <label>Alamat</label>
          <input {...register('alamat', { required: 'Alamat wajib diisi' })} />
          {errors.alamat && <p>{errors.alamat.message}</p>}
        </div>
        <div>
          <label>Jenis Kelamin</label>
          <select {...register('jenis_kelamin', { required: 'Jenis kelamin wajib diisi' })}>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          {errors.jenis_kelamin && <p>{errors.jenis_kelamin.message}</p>}
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  );
};

export default EditPegawai;
