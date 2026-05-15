import Preview from '@/Components/Preview';
import TagCard from '@/Components/TagCard';
import { GetQuestion } from '@/lib/action/GetQuestion.action';
import { IncrementView } from '@/lib/action/IncrementView.action';
import { notFound } from 'next/navigation';
import { after } from 'next/server';
import AnswerForm from '../components/AnswerForm';
import AnswerList from '../components/AnswerList';
import VoteButtons from '@/Components/VoteButtons';
import ToggleBookmarkButton from '@/Components/ToggleBookmarkButton';
import { AnswerFilters, DefaultFilters } from '@/constant/filter';
import CommonFilter from '@/Components/CommonFilter';
import ROUTES from '@/route';
import { ItagDoc } from '@/database/tag.model';
import { GetUserVote } from '@/lib/action/GetUserVote.action';
import { Suspense } from 'react';
import VoteButtonsSkeleton from '@/Components/VoteButtonsSkeleton';
import AnswerListSkeleton from '@/Components/AnswerListSkeleton';
import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: Promise<{ id: string }>
}
 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).id
  const {success: qsuccess,data} = await GetQuestion(id);
    const {question,saved = false} = data || {};
 
 
  return {
    title: question?.title,
    description: question?.content,
  }
}
 
export default async function page({ params,searchParams }: 
  { params: Promise<{ id: string }>;
      searchParams:Promise<{
        [key: string]: string;
      }>; }) {
    const {id} = await params;
    const { page = 1, pageSize = 3, search, filter } = await searchParams;
    
    const {success: qsuccess,data} = await GetQuestion(id);
    const {question,saved = false} = data || {};
    
    after(async ()=> {
      await IncrementView({questionId: id});
    });

    if(!question) notFound();
  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{question.title}</h1>
        <div className="flex justify-center items-center gap-3 text-xs text-gray-200">
          <Suspense fallback={<VoteButtonsSkeleton/>}>
            <VoteButtons
            promiseGetVote={GetUserVote({
              type:"question",
              typeId: id
            })}
            type='question'
            typeId={id}
            initialUpvote={question.upvotes}
            initialDownvote={question.downvotes}
            />
          </Suspense>
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
        <Suspense fallback={<AnswerListSkeleton />}>
          <AnswerList
          page={page as Number}
          pageSize={pageSize as Number}
          filter={filter}
          id={id}
          />
        </Suspense>
      </div>
      <div className='my-3'>
        <AnswerForm questionId={id} questionTitle={question.title} questionContent={question.content}/>
      </div>
    </div>
  );
}
