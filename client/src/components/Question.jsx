import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Record() {
  const [form, setForm] = useState({
    qdesc: "",
    answer: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/question/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const question = await response.json();
      if (!question) {
        console.warn(`Question with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(question);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    try {
      let response;
      if (isNew) {
        // if we are adding a new record we will POST to /record.
        response = await fetch("http://localhost:5050/question", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } else {
        // if we are updating a question we will PATCH to /question/:id.
        response = await fetch(`http://localhost:5050/question/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({ qdesc: "", answer: "" });
      navigate("/");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create/Update Question Record</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Question Info
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This is a placeholder for info I want users to know about questions
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="qdesc"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Question Description
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="qdesc"
                    id="qdesc"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Who is my favorite child?"
                    value={form.qdesc}
                    onChange={(e) => updateForm({ qdesc: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="answer"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Answer
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="answer"
                    id="answer"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Jane Doe"
                    value={form.answer}
                    onChange={(e) => updateForm({ answer: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div>
              <fieldset className="mt-4">
                <legend className="sr-only">Answer Options</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  <div className="flex items-center">
                    <input
                        id="answerMicah"
                        name="answerOptions"
                        type="radio"
                        value="Micah"
                        className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                        checked={form.level === "Micah"}
                        onChange={(e) => updateForm({ level: e.target.value })}
                      />
                      <label
                        htmlFor="answerMicah"
                        className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                      >
                        Micah
                      </label>
                      <input
                        id="answerRemy"
                        name="answerOptions"
                        type="radio"
                        value="Remy"
                        className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                        checked={form.level === "Remy"}
                        onChange={(e) => updateForm({ level: e.target.value })}
                      />
                      <label
                        htmlFor="answerRemy"
                        className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                      >
                        Remy
                      </label>
                      <input
                        id="answerVeda"
                        name="answerOptions"
                        type="radio"
                        value="Veda"
                        className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                        checked={form.level === "Veda"}
                        onChange={(e) => updateForm({ level: e.target.value })}
                      />
                      <label
                        htmlFor="answerVeda"
                        className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                      >
                        Veda
                      </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Save Question Record"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}