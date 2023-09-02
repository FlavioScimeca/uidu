import db from '@/lib/mongoDB-connect';
import managerSchema from '@/schema/manager-schema';
import { IManager } from '@/model/manager';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';

const getOffers = async (name: string) => {
  await db.dbConnect();

  const manager: IManager = await managerSchema
    .findOne({
      name: name,
    })
    .populate({ path: 'offers', model: 'Offer' })
    .exec();

  if (!manager) {
    return null;
  }
  return manager;
};

const OffersPage = async () => {
  const session = await getServerSession();

  if (!session?.user?.name) {
    return <></>;
  }

  const manager = await getOffers(session.user.name);

  return (
    <div className="bg-zinc-100 h-screen">
      {' '}
      {manager?.offers && manager?.offers.length > 0 ? (
        <table className="w-full border-2 border-black p-2">
          <thead>
            <tr>
              <th>Company</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Bonus</th>
              <th>Total</th>
              <th>Ealthcare</th>
            </tr>
          </thead>
          <tbody>
            {manager?.offers.map((offer) => (
              <tr key={offer._id} className="py-2 border-b border-black">
                <td>{manager.own_company.name}</td>
                <td>
                  <Link
                    prefetch={false}
                    className="underline"
                    href={`/${offer._id}`}
                  >
                    {offer.name}
                  </Link>
                </td>
                <td>{offer.salary}</td>
                <td>{offer.bonus}</td>
                <td>{Number(offer.salary + offer.bonus)}</td>
                <td>{offer.healthcare}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-xl font-semibold pt-10">
          empty offers{' '}
          <Link className="underline" href={'/create'}>
            Create a new Offer
          </Link>
        </div>
      )}
    </div>
  );
};

export default OffersPage;
