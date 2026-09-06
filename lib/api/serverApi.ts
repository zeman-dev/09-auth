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

export async function fetchNoteById(taskId: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${taskId}`, {
    headers: {
       Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function getMe() {
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
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (accessToken) {
      return NextResponse.json({ success: true });
    }

    if (refreshToken) {
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
        return NextResponse.json({ success: true }, { status: 200 });
      }
    }
    return NextResponse.json({ success: false }, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json({ success: false }, { status: 200 });
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
