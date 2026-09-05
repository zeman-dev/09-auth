import { FetchNotesResponse } from "./clientApi";
import { Note } from "@/types/note";
import { api } from "@/app/api/api";
import { User } from "@/types/user";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "@/app/api/_utils/utils";
import { NextResponse } from "next/server";


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

export async function getMe(){
   const cookieStore = await cookies();
  try {
      const cookieStore = await cookies();
  
      const res = await api.get('/users/me', {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logErrorResponse(error.response?.data);
        return NextResponse.json(
          { error: error.message, response: error.response?.data },
          { status: error.status }
        );
      }
    }
}