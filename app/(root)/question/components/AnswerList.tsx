import DataRenderer from '@/Components/DataRenderer';
import { IanswerDoc } from '@/database/answer.model';
import AnswerCard from './AnswerCard';

function AnswerList(params: {
    answers: IanswerDoc[];
    totalAnswers: number;
    success: Boolean;
    answerError?: string;
}) {
  return (
    <div className="mt-8 space-y-5">
        <h3 className='text-2xl text-gray-400'>Answer List - {params.totalAnswers}</h3>
        <DataRenderer 
        success={params.success}  
        errorMessage={params.answerError}
        data={params.answers}
        render={(data) => (
                            <div className='flex flex-col space-y-5'>
                                {data.map((a, i) => <AnswerCard key={i} answer={a} />)}
                            </div>
                            )}
        />
    </div>
  )
}

export default AnswerList