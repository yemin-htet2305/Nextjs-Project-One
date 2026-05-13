import { GetUser } from "@/lib/action/GetUser.action";
import { IuserDoc } from "@/database/user.model";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ROUTES from "@/route";
import {
  MapPin,
  Globe,
  Calendar,
  MessageSquare,
  Star,
  Edit3,
  Award,
  TrendingUp,
} from "lucide-react";
import { GetUserQuestions } from "@/lib/action/GetUserQuestions.action";
import ThreadCard from "@/Components/ThreadCard";
import DataRenderer from "@/Components/DataRenderer";
import { GetUserAnswers } from "@/lib/action/GetUsetAnswers.action";
import AnswerCard from "../../question/components/AnswerCard";
import Pagination from "@/Components/Pagination";

// ─── helpers ─────────────────────────────────────────────────────────────────

function getColorFromId(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${Math.abs(hash) % 360}, 65%, 55%)`;
}

// ─── small primitives ─────────────────────────────────────────────────────────

function Avatar({
  image,
  name,
  id,
  size = 100,
}: {
  image?: string;
  name: string;
  id: string;
  size?: number;
}) {
  const style = { width: size, height: size };
  if (image) {
    if (image.startsWith("/")) {
      return (
        <Image
          src={image}
          alt={name}
          width={size}
          height={size}
          className="rounded-full object-cover ring-4 ring-main/40"
          style={style}
        />
      );
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover ring-4 ring-main/40"
        style={style}
        referrerPolicy="no-referrer"
      />
    );
  }
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold ring-4 ring-main/40"
      style={{ ...style, backgroundColor: getColorFromId(id), fontSize: size * 0.4 }}
    >
      {name[0]?.toUpperCase()}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color = "text-main",
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 bg-card rounded-2xl px-6 py-4 border border-white/5">
      <Icon className={`w-5 h-5 ${color}`} strokeWidth={2} />
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs text-gray-400 uppercase tracking-wide">{label}</span>
    </div>
  );
}

// ─── profile sections ─────────────────────────────────────────────────────────

function ProfileBanner({ user }: { user: IuserDoc }) {
  return (
    <div className="relative">
      <div className="relative h-40 rounded-b-3xl overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-main via-blue-700 to-tertiary opacity-90" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <div className="absolute bottom-0 left-6 translate-y-1/2 z-10">
        <div className="rounded-full ring-4 ring-secondary">
          <Avatar image={user.image} name={user.name} id={user._id.toString()} size={110} />
        </div>
      </div>
    </div>
  );
}

function ProfileHeader({
  user,
  isOwner,
  profileId,
}: {
  user: IuserDoc;
  isOwner: boolean;
  profileId: string;
}) {
  return (
    <>
      <div className="flex justify-end mb-4">
        {isOwner && (
          <Link
            href={ROUTES.PROFILE_EDIT(profileId)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-white/10 text-sm font-medium hover:border-main/60 hover:text-main transition-all"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </Link>
        )}
      </div>
      <div className="mb-3">
        <h1 className="text-3xl font-bold leading-tight">{user.name}</h1>
        <p className="text-gray-400 text-sm mt-0.5">@{user.username}</p>
      </div>
    </>
  );
}

function ProfileBio({ bio }: { bio?: string }) {
  if (!bio) return null;
  return (
    <p className="text-gray-300 text-sm leading-relaxed max-w-xl mb-4">{bio}</p>
  );
}

function ProfileMeta({
  location,
  portfolio,
  joinDate,
}: {
  location?: string;
  portfolio?: string;
  joinDate: string | null;
}) {
  if (!location && !portfolio && !joinDate) return null;
  return (
    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
      {location && (
        <span className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-main" />
          {location}
        </span>
      )}
      {portfolio && (
        <a
          href={portfolio.startsWith("http") ? portfolio : `https://${portfolio}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-main hover:underline"
        >
          <Globe className="w-4 h-4" />
          {portfolio.replace(/^https?:\/\//, "")}
        </a>
      )}
      {joinDate && (
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          Joined {joinDate}
        </span>
      )}
    </div>
  );
}

function ProfileStats({
  questionCount,
  answerCount,
  reputation,
}: {
  questionCount: number;
  answerCount: number;
  reputation: number;
}) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-8">
      <StatCard icon={MessageSquare} label="Questions" value={questionCount} color="text-main" />
      <StatCard icon={TrendingUp} label="Answers" value={answerCount} color="text-emerald-400" />
      <StatCard icon={Star} label="Reputation" value={reputation} color="text-yellow-400" />
    </div>
  );
}

function ProfileReputation({ reputation }: { reputation: number }) {
  const label =
    reputation < 50
      ? "Newcomer — keep engaging to earn more reputation!"
      : reputation < 200
      ? "Rising contributor — great progress!"
      : reputation < 500
      ? "Established member — well done!"
      : "Community leader — outstanding!";

  return (
    <div className="bg-card border border-white/5 rounded-2xl p-5 mb-7">
      <div className="flex items-center gap-3 mb-3">
        <Award className="w-5 h-5 text-yellow-400" />
        <h2 className="font-semibold text-lg">Reputation</h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-primary rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-main to-blue-400 rounded-full transition-all"
            style={{ width: `${Math.min((reputation / 1000) * 100, 100)}%` }}
          />
        </div>
        <span className="text-sm text-gray-400">{reputation} / 1000</span>
      </div>
      <p className="mt-3 text-xs text-gray-500">{label}</p>
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default async function ProfilePage({
  params,searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{page:number,tab:"questions" | "answers"}>
}) {
  const { id } = await params;
  const {page, tab} = await searchParams;
  const session = await auth();
  const isOwner = session?.user?.id === id;

  const activeTab = tab || "questions";
  const currentPage = Number(page) || 1;

  const { success, data, message } = await GetUser({ userId: id });
  let loopSuccess;
  let loopData;
  let loopErrorMsg;
  let loopNext;
  
  if(activeTab === "questions"){
      const {success: qsuc , data: qdata, message: qErrorMsg} = await GetUserQuestions({
        page: currentPage,
        pageSize: 3,
        filter: "",
        search: "",
        sort: ""
      });
      const {questions = [], isNext= false} = qdata || {};
      loopSuccess = qsuc;
      loopData = questions;
      loopErrorMsg = qErrorMsg;
      loopNext = isNext;

}else{
  const {success: asuc , data: adata, message: aErrorMsg} = await GetUserAnswers({
    page: currentPage,
    pageSize: 3,
    filter: "",
    search: "",
    sort: ""
  })

  const {answers = [], isNext = false} = adata || {};
      loopSuccess = asuc;
      loopData = answers;
      loopErrorMsg = aErrorMsg;
      loopNext = isNext;
}
  if (!success || !data) {
    if (message === "user not found!") return notFound();
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-400">{message ?? "Something went wrong."}</p>
      </div>
    );
  }

  const { user, questionCount, answerCount } = data;

  const joinDate = (user as any).createdAt
    ? new Date((user as any).createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen">
      <ProfileBanner user={user} />

      <div className="px-6 pb-10 pt-16">
        <ProfileHeader user={user} isOwner={isOwner} profileId={id} />
        <ProfileBio bio={user.bio} />
        <ProfileMeta location={user.location} portfolio={user.portfolio} joinDate={joinDate} />
        <ProfileStats questionCount={questionCount} answerCount={answerCount} reputation={user.reputation} />
        <ProfileReputation reputation={user.reputation} />

        {/* add your new sections below here */}
        <div className="flex mb-7 space-x-5">
          <Link 
          className={`px-5 py-2 rounded-2xl ${activeTab === "questions"? 
            "bg-main" : "bg-primary border-[1px] border-main"
          }`}
          href={`/profile/${id}?tab=questions`}>
           Top Questions
          </Link>
          <Link 
          className={`px-5 py-2 rounded-2xl ${activeTab === "answers"? 
            "bg-main" : "bg-primary border-[1px] border-main"
          }`}
          href={`/profile/${id}?tab=answers`}>
           Top Answers
          </Link>
        </div>
        {activeTab === "questions" && <> 
                                        <DataRenderer success={loopSuccess} data={loopData} errorMessage={loopErrorMsg} emptyState="question" render={(loopData) => (
                                                                                  <div className="flex flex-col space-y-7">
                                                                                    {loopData.map((q, i) => (
                                                                                      <ThreadCard
                                                                                      showActions={isOwner}
                                                                                      key={q._id} question={q} />
                                                                                    ))}
                                                                                  </div>
                                                                                )}/> 
                                        <Pagination isNext={loopNext} currentPage={currentPage}/>
                                                                                </>}
        {activeTab === "answers" && <>
                                        <DataRenderer success={loopSuccess} data={loopData} errorMessage={loopErrorMsg} emptyState="answer" render={(loopData) => (
                                                                                  <div className='flex flex-col space-y-5'>
                                                                                    {loopData.map((a, i) => 
                                                                                    <AnswerCard
                                                                                      showActions={isOwner}
                                                                                    key={i} answer={a} />)}
                                                                                  </div>
                                                                                )}/>
                                        <Pagination isNext={loopNext} currentPage={currentPage}/>
                                                                                </> }
        
      </div>
    </div>
  );
}
