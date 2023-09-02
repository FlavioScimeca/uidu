'use client';

import Input from '@/components/Input';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useSession } from 'next-auth/react';

const Page = () => {
  const router = useRouter();
  const session = useSession();

  const { register, handleSubmit } = useForm<FieldValues>();
  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    fetch('/api/offer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        managerName: session.data?.user?.name,
      }),
    }).then(() => router.push('/'));
  };

  return (
    <div className="m-2">
      <h1 className="text-center text-2xl font-semibold">Add an offer</h1>
      <div className="max-w-sm md:max-w-xl mx-auto bg-sky-100 p-5 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input id="name" register={register} label="Name" type="text" />

          <Input id="salary" register={register} label="Salary" type="number" />
          <Input id="equity" register={register} label="Equity" type="number" />
          <Input id="bonus" register={register} label="Bonus" type="number" />
          <hr className="my-3 border-black" />
          <Input id="culture" register={register} label="Culture" type="text" />
          <Input
            id="learning"
            register={register}
            label="Learning"
            type="text"
          />
          <Input
            id="healthcare"
            register={register}
            label="Healthcare"
            type="text"
          />
          <Input
            id="opportunities"
            register={register}
            label="Opportunities"
            type="text"
          />
          <button
            className="w-full py-2 bg-emerald-400 mt-10 rounded-md"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
