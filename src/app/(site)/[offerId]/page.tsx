import OfferCard from '@/components/OfferCard';
import { IOffer } from '@/model/offer';

const page = async ({
  params: { offerId },
}: {
  params: { offerId: string };
}) => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/offer?offerId=${offerId}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    return <div> offer not found </div>;
  }

  const offer: IOffer = await res.json();

  return (
    <div className="h-screen">
      <h1 className="text-2xl text-center mb-10"> Offer Details </h1>
      <OfferCard offer={offer} />
    </div>
  );
};

export default page;
