'use client';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import Input from './Input';
import { useRouter } from 'next/navigation';

interface QuestionProps {
  offerId: string;
}

const QuestionBox: React.FC<QuestionProps> = ({ offerId }: QuestionProps) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    fetch('/api/question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        offerId: offerId,
      }),
    }).then(() => router.push('/'));
  };

  return (
    <div className="w-full p-2 bg-zinc-100 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input id="name" label="Name" register={register} required />
        <Input id="doubt" label="Doubt" register={register} required />

        <button type="submit" className="p-2 mt-4 bg-emerald-400 rounded-md">
          Add
        </button>
      </form>
    </div>
  );
};

export default QuestionBox;
