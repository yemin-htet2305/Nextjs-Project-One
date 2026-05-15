import Preview from '@/Components/Preview';
import VoteButtons from '@/Components/VoteButtons';
import EditDeleteActions from '@/Components/EditDeleteActions';
import { IanswerDoc } from '@/database/answer.model'
import { ChevronUp, ChevronDown, Clock } from 'lucide-react'
import { GetUserVote } from '@/lib/action/GetUserVote.action';
import { Suspense } from 'react';
import VoteButtonsSkeleton from '@/Components/VoteButtonsSkeleton';



function AnswerCard({ answer, showActions = false }: { answer: IanswerDoc; showActions?: boolean }) {
  const authorName = ((answer as any)?.author?.name as string) || 'Anonymous';
  const upvotes = ((answer as any)?.upvotes as number) ?? 0
  const downvotes = ((answer as any)?.downvotes as number) ?? 0
  const initialLetter = authorName?.charAt(0)?.toUpperCase?.() || '?'
  const content = ((answer as any)?.content as string) || ''
  const createdAt = (answer as any)?.createdAt
    ? new Date((answer as any).createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : ''

  const score = upvotes - downvotes;

  console.log('Answer content:', JSON.stringify(content));

  return (
    <article className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      {/* Header: Author + Meta */}
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-semibold text-white shadow-sm">
            {initialLetter}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {authorName}
            </span>
            {createdAt && (
              <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                <Clock className="h-3 w-3" />
                {createdAt}
              </span>
            )}
          </div>
        </div>

        {/* Actions + Vote pill */}
        <div className="flex items-center gap-2">
        <EditDeleteActions type="answer" typeId={answer._id.toString()} showActions={showActions} />
        <div className="flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1.5 dark:bg-zinc-800">
          <button
            aria-label="Upvote"
            className="rounded-full p-1 text-zinc-500 transition hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-emerald-900/40"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <span className="min-w-[1.5rem] text-center text-sm font-semibold tabular-nums text-zinc-700 dark:text-zinc-200">
            {score}
          </span>
          <button
            aria-label="Downvote"
            className="rounded-full p-1 text-zinc-500 transition hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-900/40"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        </div>
      </header>

      {/* Body */}
      <div className="prose prose-sm max-w-none text-zinc-700 dark:prose-invert dark:text-zinc-300">
        <Preview content={content} />
      </div>

      {/* Footer stats */}
      <footer className="mt-5 flex items-center gap-4 border-t border-zinc-100 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <Suspense fallback={<VoteButtonsSkeleton/>}>
          <VoteButtons
          promiseGetVote={GetUserVote({
            type:'answer',
            typeId:answer._id.toString()
          })}
          type='answer'
          typeId={answer._id.toString()}
          initialUpvote={answer.upvotes}
          initialDownvote={answer.downvotes}/>
        </Suspense>
      </footer>
    </article>
  )
}

export default AnswerCard;