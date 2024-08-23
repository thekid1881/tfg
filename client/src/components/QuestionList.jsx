import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Question = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.question.qdesc}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.question.answer}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`/edit/${props.question._id}`}
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          color="red"
          type="button"
          onClick={() => {
            props.deleteQuestion(props.question._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getQuestions() {
      const response = await fetch(`http://localhost:5050/question/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const questions = await response.json();
      setQuestions(questions);
    }
    getQuestions();
    return;
  }, [questions.length]);

  // This method will delete a question
  async function deleteQuestion(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE",
    });
    const newQuestions = questions.filter((el) => el._id !== id);
    setQuestions(newQuestions);
  }

  // This method will map out the questions on the table
  function questionList() {
    return questions.map((question) => {
      return (
        <Question
          question={question}
          deleteQuestion={() => deleteQuestion(question._id)}
          key={question._id}
        />
      );
    });
  }

  // This following section will display the table with the questions of individuals.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">All Questions</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Question
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Answer
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {questionList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}