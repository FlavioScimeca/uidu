'use client';
import { useState } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

type Variant = 'LOGIN' | 'REGISTER';

const Page = () => {
  const router = useRouter();

  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleVariant = () => {
    if (variant == 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // console.log(data);

    if (variant == 'REGISTER') {
      fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          name: data.name,
          company: {
            name: data.company_name,
            role: data.company_role,
            organization: data.organization,
            number_employers: data.number_employers,
          },
        }),
      }).then(() => router.push('/'));
    }

    if (variant == 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      }).then((callback) => {
        if (callback?.error) {
          console.error('Invalid credentials');
        }

        if (callback?.ok && !callback?.error) {
          router.push('/');
        }
      });
    }
  };

  return (
    <div className="mt-5 px-5 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-slate-300 px-4 py-8 shadow rounded-lg sm:px-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-600"
          >
            Name
          </label>
          <div className="mt-2">
            <input
              disabled={isLoading}
              {...register('name', { required: true })}
              className={`
            form-input
            block
            w-full
            rounded-md 
            border-0 
            py-1.5 
            text-gray-900 
            
            shadow-sm 
            ${isLoading && 'opacity-50 cursor-default'}
          `}
            />
          </div>
          {variant === 'REGISTER' && (
            <>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-600"
              >
                Company Name
              </label>
              <div className="mt-2">
                <input
                  disabled={isLoading}
                  {...register('company_name', { required: true })}
                  className={`
            form-input
            block
            w-full
            rounded-md 
            border-0 
            py-1.5 
            text-gray-900 
            
            shadow-sm 
            ${isLoading && 'opacity-50 cursor-default'}
          `}
                />
              </div>
              <label className="block text-sm font-medium leading-6 text-gray-600">
                Company Role
              </label>
              <div className="mt-2">
                <input
                  disabled={isLoading}
                  {...register('company_role', { required: true })}
                  className={`
            form-input
            block
            w-full
            rounded-md 
            border-0 
            py-1.5 
            text-gray-900 
            
            shadow-sm 
            ${isLoading && 'opacity-50 cursor-default'}
          `}
                />
              </div>
              <label className="block text-sm font-medium leading-6 text-gray-600">
                Organization
              </label>
              <div className="mt-2">
                <input
                  disabled={isLoading}
                  {...register('organization', { required: true })}
                  className={`
            form-input
            block
            w-full
            rounded-md 
            border-0 
            py-1.5 
            text-gray-900 
            
            shadow-sm 
            ${isLoading && 'opacity-50 cursor-default'}
          `}
                />
              </div>
              <label className="block text-sm font-medium leading-6 text-gray-600">
                Number_employers
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  disabled={isLoading}
                  {...register('number_employers', { required: true })}
                  className={`
            form-input
            block
            w-full
            rounded-md 
            border-0 
            py-1.5 
            text-gray-900 
            
            shadow-sm 
            ${isLoading && 'opacity-50 cursor-default'}
          `}
                />
              </div>
            </>
          )}

          <button
            className="bg-emerald-500 rounded-md w-full mt-10 py-2"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>

      <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
        <div onClick={toggleVariant} className="underline cursor-pointer">
          {variant == 'LOGIN' ? 'Register' : 'Login'}
        </div>
      </div>
    </div>
  );
};

export default Page;
