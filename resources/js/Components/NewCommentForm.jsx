import TextAreaInput from "@/Components/TextAreaInput";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { usePage } from "@inertiajs/react";
import { can, hasRole } from '@/helper';

export default function NewCommentForm({ feature }) {
  const user = usePage().props.auth.user;
  const { data, setData, post, processing } = useForm({
    comment: '',
  });

  const createComment = (ev) => {
    ev.preventDefault();
    post(route('comment.store', feature.id), {
      data,
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => setData('comment', '')
    });
  };

  if(!can(user, 'manage_comments')){
    return(
      <div>
        <p className="text-red-500 dark:text-grey-400">You do not have permission to comment.</p>
      </div>
    )
  }
  return (
    <form
      onSubmit={createComment}
      className="p-4 space-y-4 bg-white dark:bg-gray-800 rounded-lg shadow"
    >
      <div className="flex flex-col gap-2">
        <TextAreaInput
          name="comment"
          rows={3}
          value={data.comment}
          handleChange={(e) => setData('comment', e.target.value)}
          className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:border-blue-500 focus:ring-blue-500"
          placeholder="Write your comment here..."
        />
        <div className="flex justify-end">
          <PrimaryButton disabled={processing} className="px-4 py-2">
            Post Comment
          </PrimaryButton>
        </div>
      </div>
    </form>
  );
}