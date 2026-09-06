import { Note } from '@/types/note';
import type { registerRequest, User } from '@/types/user';
import axios from 'axios';


const nextServer = axios.create({baseURL: process.env.NEXT_PUBLIC_API_URL + '/api'});


export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
export async function FetchNotes(
  query: string = '',
  currentPage: number,
  tag?: string,
): Promise<FetchNotesResponse> {
  if(tag === 'all' || tag === 'All'){
    tag = undefined;
  }
  const response = await nextServer.get<FetchNotesResponse>(
    '/notes',
    {
      params: {
        search: query,
        page: currentPage,
        perPage: 12,
        tag,
      },
    }
  );
  return response.data;
}

export type  CreatedNote = {
  title: string;
  content: string;
  tag: string;
}

export async function createNote(newNote: CreatedNote):Promise<Note> {
  const response = await nextServer.post<Note>(
    '/notes',
    newNote,
  );
  return response.data;
}

export async function deleteNote(taskId: string):Promise<Note> {
  const response = await nextServer.delete<Note>(
    `/notes/${taskId}`,

  );
  return response.data;
}

export async function fetchNoteById(taskId: string): Promise<Note>{
  const response = await nextServer.get<Note>(
    `/api/notes/${taskId}`,
  );
  return response.data;
}

export async function register(data: registerRequest) {
  const response = await nextServer.post<User>('/auth/register', data);
  return response.data;
}

export async function login(user : registerRequest){
 const response = await nextServer.post<User>('/auth/login', user);
 return response.data;
}

export async function logout(){
 await nextServer.post<User>('/auth/logout');
}


export async function checkSession(){
  const response = await nextServer.get('/auth/session');
  return response.data.succsess;
}

export async function getMe(){
  const response = await nextServer.get<User>("/users/me");
  return response.data;
}