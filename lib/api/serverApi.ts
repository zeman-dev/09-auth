import { User } from '@/types/user';
import type { FetchNotesResponse } from './clientApi';
import { Note } from '@/types/note';
import { api } from '@/lib/api/api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/app/api/_utils/utils';
import { NextResponse } from 'next/server';
import { parseSetCookie } from 'cookie';

export async function FetchNotes(
  query: string = '',
  currentPage: number,
  tag?: string
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();
  if (tag === 'all' || tag === 'All') {
    tag = undefined;
  }
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: {
      search: query,
      page: currentPage,
      perPage: 12,
      tag,
    },
    headers: {
       Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function fetchNoteById(Id: string): Promise<Note> {
  const cookieStore = await cookies();
  const response = await api.get<Note>(`/notes/${Id}`, {
    headers: {
       Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function getMe():Promise<User | null> {
  try {
    const cookieStore = await cookies();

    const res = await api.get<User>('/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
    }
    return null;
  }
}

export async function checkSession() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (accessToken) {
    // якщо accessToken вже валідний, все одно варто повернути
    // узгоджений тип — або реальний виклик /auth/session, або
    // явно задокументований "короткий шлях" без Axios-відповіді
    return null; // немає потреби йти в бекенд — обробіть цей case окремо в handler'і
  }

  if (!refreshToken) {
    return null;
  }

  try {
    const apiRes = await api.get('auth/session', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const setCookie = apiRes.headers['set-cookie'];
    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parseSetCookie(cookieStr);
        if (parsed.value) {
          cookieStore.set(parsed.name, parsed.value, parsed);
        }
      }
    }

    return apiRes; // <-- повний Axios response, без обгортки NextResponse
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
    } else {
      logErrorResponse({ message: (error as Error).message });
    }
    throw error; // або: return error.response, якщо хочете обробляти без throw
  }
}
