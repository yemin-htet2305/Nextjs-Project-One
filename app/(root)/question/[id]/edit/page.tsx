import { GetQuestion } from "@/lib/action/GetQuestion.action";
import QuestionForm from "../../components/QuestionForm";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const {success, data} = await GetQuestion({questionId: id});
    console.log(success, data);
  return (
    <>
      <div>{id}</div>
      <QuestionForm isEdit={true} questionData={data} />
    </>
  )
}
