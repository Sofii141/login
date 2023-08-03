import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
//---------------------------------------------------------------------

function RegisterPage() {

    //registrar inputs
    //sirve para tener los valores escritores por el usuario en un estado
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, isAuthenticated, errors: RegistrerErrors } = useAuth();
    const navigate = useNavigate();

    /*
    parámetro una función que se ejecutará cada vez que nuestro componente se renderice, 
    ya sea por un cambio de estado, por recibir props nuevas o, 
    y esto es importante, porque es la primera vez que se monta.
    */
    useEffect(() => {
        if (isAuthenticated)
            navigate('/tasks');
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    });

    return (

        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>

            
            <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
                
                {
                    RegistrerErrors.map((error, i) => (
                        <div className='bg-red-500 p-2' key={i}>
                            {error}
                        </div>
                    ))
                }

                <h1 className='text-3xl font-bold my-2'>Register</h1>
                <form onSubmit={onSubmit}>

                    <input type="text" {...register('username', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Username' />
                    {
                        errors.username && (
                            <p className='text-red-500'>Username is required</p>
                        )
                    }
                    <input type="email" {...register('email', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Email' />

                    {
                        errors.email && (
                            <p className='text-red-500'>email is required</p>
                        )
                    }
                    <input type="password" {...register('password', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Password' />
                    {
                        errors.password && (
                            <p className='text-red-500'>password is required</p>
                        )
                    }

                    <button type='submit' className="bg-indigo-500 px-4 py-1 rounded-md my-3">Register</button>
                </form>

                <p className='flex gap-x-2 justify-between'>
                    Already have an account?
                    <Link to="/login" className='text-sky-500'>Login</Link>
                </p>
            </div>

        </div>
    );
}

export default RegisterPage;