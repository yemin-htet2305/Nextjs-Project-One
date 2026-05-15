import DataRenderer from '@/Components/DataRenderer';
import AnswerCard from './AnswerCard';
import { GetAnswers } from '@/lib/action/GetAnswers.acton';
import Pagination from '@/Components/Pagination';

async function AnswerList(params: {
    page:Number;
    pageSize: Number;
    filter:string;
    id:string;
}) {
  const{success : asuccess,
      data: answerData,
      message: aerrorMessage,
      detail} = await GetAnswers({
        page:Number(params.page) || 1,
        pageSize:Number(params.pageSize) || 1,
        filter:params.filter || "",
        questionId:params.id});
    const {answers = [],totalAnswers = 0, isNext = false}  = answerData || {};
  return (
    <>
      <div className="mt-8 space-y-5">
          <h3 className='text-2xl text-gray-400'>Answer List - {answers.length}</h3>
          <DataRenderer
          success={asuccess}
          errorMessage={aerrorMessage}
          data={answers}
          emptyState="answer"
          render={(data) => (
                              <div className='flex flex-col space-y-5'>
                                  {data.map((a, i) => <AnswerCard key={i} answer={a} />)}
                              </div>
                              )}
          />
      </div>
      <Pagination isNext={isNext} currentPage={Number(params.page)}/>
    </>
  )
}

export default AnswerList