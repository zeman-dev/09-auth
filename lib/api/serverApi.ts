import axios from "axios";
import { FetchNotesResponse } from "./clientApi";
import { Note } from "@/types/note";
import { api } from "@/app/api/api";


 export async function FetchNotes(
  query: string = '',
  currentPage: number,
  tag?: string,
): Promise<FetchNotesResponse> {
  if(tag === 'all' || tag === 'All'){
    tag = undefined;
  }
  const response = await api.get<FetchNotesResponse>(
    '/notes',
    {
      params: {
        search: query,
        page: currentPage,
        perPage: 12,
        tag,
      },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function fetchNoteById(taskId: string): Promise<Note>{
  const response = await api.get<Note>(
    `/notes/${taskId}`,
        {headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function getMe (){
    const response = await api.get(``,
        {
            headers:{}
        }
    )
}