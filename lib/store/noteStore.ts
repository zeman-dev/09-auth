'use client'
import { create } from 'zustand';
import { CreatedNote } from '../api';
import { persist } from 'zustand/middleware';


type useNoteDraft ={
    draft: CreatedNote
    setDraft: (note: CreatedNote) => void,
    clearDraft: () => void,
}

const initialDraft : CreatedNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<useNoteDraft>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft',
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);

