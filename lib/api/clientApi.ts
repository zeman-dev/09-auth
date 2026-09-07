import { Note } from '@/types/note';
import type { RegisterRequest, User } from '@/types/user';
import { api } from './api';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
export async function fetchNotes(
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
  const response = await api.post<Note>(
    '/notes',
    newNote,
  );
  return response.data;
}

export async function deleteNote(taskId: string):Promise<Note> {
  const response = await api.delete<Note>(
    `/notes/${taskId}`,

  );
  return response.data;
}

export async function fetchNoteById(taskId: string): Promise<Note>{
  const response = await api.get<Note>(
    `/notes/${taskId}`,
  );
  return response.data;
}

export async function register(data: RegisterRequest) {
  const response = await api.post<User>('/auth/register', data);
  return response.data;
}

export async function login(user : RegisterRequest){
 const response = await api.post<User>('/auth/login', user);
 return response.data;
}

export async function logout(){
 await api.post('/auth/logout');
 return;
}


export async function checkSession(){
  const response = await api.get('/auth/session');
  return response.data;
}

export async function getMe(){
  const response = await api.get<User>("/users/me");
  return response.data;
}

export async function updateMe(user : {username : string}){
  const response = await api.patch<User>("/users/me", user);
  return response.data;
}