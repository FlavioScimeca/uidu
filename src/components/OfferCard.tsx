import { IOffer } from '@/model/offer';
import QuestionBox from './QuestionBox';

const OfferCard = ({ offer }: { offer: IOffer }) => {
  return (
    <>
      <div className="p-3 max-w-lg mx-auto bg-sky-100 shadow-md rounded-md space-y-4">
        <div>
          <p className="text-xl font-semibold">{offer.name}</p>
          <hr className="h-1 bg-black" />
          <div className="flex justify-between m-2">
            <p className="my-4 text-lg">Job Description</p>
            <div className="bg-sky-200 rounded-md p-1">
              <p>Company:{offer.company.name}</p>
              <p>Role:{offer.company.role}</p>
              <p>Organization:{offer.company.organization}</p>
            </div>
          </div>
          <div>
            <p className="font-semibold">
              <span className="font-semibold">Salary</span>: {offer.salary}{' '}
              &euro;
            </p>
            <p className="font-semibold">
              <span className="font-semibold">Bonus</span> {offer.bonus} &euro;
            </p>
            <p className="font-semibold">
              <span className="font-semibold">Equity</span> {offer.equity}{' '}
              &euro;
            </p>
          </div>
          <p className="my-4 text-xl">About us</p>
          <p className="">
            {' '}
            <span className="font-semibold">Culture</span> {offer.culture}
          </p>
          <p className="">
            <span className="font-semibold">Healthcare</span>
            {offer.healthcare}
          </p>
          <p className="">
            <span className="font-semibold">Learning</span> {offer.learning}
          </p>
          <p className="">
            <span className="font-semibold">Opportunities</span>{' '}
            {offer.opportunities}
          </p>
        </div>
        <div className="bg-zinc-100 rounded-md">
          {offer.questions?.map((question) => (
            <div key={question._id} className="border-b border-black p-1">
              <p className="font-semibold"> {question.name} </p>
              <p> {question.doubt} </p>
            </div>
          ))}
        </div>
        {/* Question box */}
        <div>
          <p className="text-xl font-semibold">Questions?</p>
          <QuestionBox offerId={offer._id} />
        </div>
      </div>
    </>
  );
};

export default OfferCard;
