'use client';
import css from '@/app/notes/[id]/NoteDetails.module.css';
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
export default function NoteDetailsClient() {

    const {id} = useParams<{id: string}>()
    const {data, isLoading, isError} = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    })
   

  return (
    <>
      <main className={css.main}>
        <div className={css.container}>
          {isLoading && <p>Loading, please wait...</p>}
          {isError && <p>Something went wrong.</p>}
          {data && <div className={css.item}>
            <div className={css.header}>
              <h2>{data?.title}</h2>
            </div>
            <p className={css.tag}>{data?.tag}</p>
            <p className={css.content}>{data?.content}</p>
            <p className={css.date}>{data?.createdAt}</p>
          </div>}
        </div>
      </main>
    </>
  );
}
