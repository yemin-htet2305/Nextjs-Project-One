import Preview from '@/Components/Preview';
import TagCard from '@/Components/TagCard';
import { GetQuestion } from '@/lib/action/GetQuestion.action';
import { IncrementView } from '@/lib/action/IncrementView.action';
import { notFound } from 'next/navigation';
import { after } from 'next/server';
import AnswerForm from '../components/AnswerForm';
import AnswerList from '../components/AnswerList';
import { GetAnswers } from '@/lib/action/GetAnswers.acton';
import VoteButtons from '@/Components/VoteButtons';
import ToggleBookmarkButton from '@/Components/ToggleBookmarkButton';
import { AnswerFilters, DefaultFilters } from '@/constant/filter';
import CommonFilter from '@/Components/CommonFilter';
import Pagination from '@/Components/Pagination';
import ROUTES from '@/route';
import { ItagDoc } from '@/database/tag.model';

export default async function page({ params,searchParams }: 
  { params: Promise<{ id: string }>;
      searchParams:Promise<{
        [key: string]: string;
      }>; }) {
    const {id} = await params;
    const { page = 1, pageSize = 1, search, filter } = await searchParams;
    
    const {success: qsuccess,data} = await GetQuestion({questionId: id});
    const {question,saved = false} = data || {};
    
    after(async ()=> {
      await IncrementView({questionId: id});
    });

    const{success : asuccess,
      data: answerData,
      message: aerrorMessage,
      detail} = await GetAnswers({
        page:Number(page) || 1,
        pageSize:Number(pageSize) || 1,
        filter:filter || "",
        questionId:id});
    const {answers = [],totalAnswers = 0, isNext = false}  = answerData || {};

    if(!question) notFound();
  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{question.title}</h1>
        <div className="flex justify-center items-center gap-3 text-xs text-gray-200">
          <VoteButtons type='question' 
          typeId={id} 
          initialUpvote={question.upvotes}
          initialDownvote={question.downvotes}
          />
          <div>{question.answers} Answers</div>
          <div>{question.views} Views</div>
          <ToggleBookmarkButton questionId={id} save={saved}/>
        </div>
      </div>
      <div className="my-3">
        <Preview content={question.content}/>
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {(question.tags as unknown as ItagDoc[]).map((tag) => (
          <TagCard key={tag._id.toString()} href={ROUTES.TAG(tag._id.toString())}> {tag.name}</TagCard>
        ))}
      </div>
      <div className='my-3'>
        <CommonFilter filters={AnswerFilters} dvalue={DefaultFilters.AnswerFilters}/>
        <AnswerList 
        answers={answers} 
        totalAnswers={totalAnswers} 
        success={asuccess}
        answerError={aerrorMessage}
        />
      </div>
      <Pagination isNext={isNext} currentPage={Number(page)}/>
      <div className='my-3'>
        <AnswerForm questionId={id} questionTitle={question.title} questionContent={question.content}/>
      </div>
    </div>
  );
}
