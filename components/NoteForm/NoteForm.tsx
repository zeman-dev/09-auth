"use client"
// import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreatedNote, createNote } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';
// import * as Yup from 'yup';
// import { useEffect } from 'react';


export default function NoteForm() {


  const queryClient = useQueryClient();

  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

    const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };
  // interface FormValues {
  //   title: string;
  //   content: string;
  //   tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
  // }

  // const initialValues: FormValues = {
  //   title: 'New Task',
  //   content: '',
  //   tag: 'Todo',
  // };

  function handleClose(){
 router.push('/notes/filter/all');
  }

  //// MUTATION METOD(POST) CREATE TASK//////////
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      handleClose()
      clearDraft();
    },
  });
  /////////////////////////

  function handleSubmit(
    values: FormData,
    // formikHelpers: FormikHelpers<FormValues>
  ) {
    const FormData = Object.fromEntries(values) as CreatedNote;
    mutation.mutate({
      title: FormData.title,
      content: FormData.content,
      tag: FormData.tag,
    }
  );
    // formikHelpers.resetForm();
  }

  ////////////////VALIDATION//////////////

  // const ValidationSchema = Yup.object().shape({
  //   title: Yup.string().required().min(3).max(50),
  //   content: Yup.string().max(500),
  //   tag: Yup.string().required().oneOf(['Todo','Work', 'Personal', 'Meeting', 'Shopping']),
  // });
  ///////////////////////////////////////

  return (
    // <Formik
    //   initialValues={initialValues}
    //   onSubmit={handleSubmit}
    //   validationSchema={ValidationSchema}
    // >
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" defaultValue={draft?.title} name="title" className={css.input} onChange={handleChange}/>
          {/* <ErrorMessage component={'span'} name="title" className={css.error} /> */}
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            // as="textarea"
            defaultValue={draft?.content}
            onChange={handleChange}
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          {/* <ErrorMessage
            component={'span'}
            name="content"
            className={css.error}
          /> */}
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select defaultValue={draft?.tag} onChange={handleChange}id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
          {/* <ErrorMessage component={'span'} name="tag" className={css.error} /> */}
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={() => router.back()}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </form>
    // </Formik>
  );
}
