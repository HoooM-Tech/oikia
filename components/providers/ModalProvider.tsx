'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import StoryDialog from '../dialogs/StoryDialog';
import ContactDialog from '../dialogs/ContactDialog';
import InfoDialog from '../dialogs/InfoDialog';
import CommunityDialog from '../dialogs/CommunityDialog';
import MotionControl from '../ui/MotionControl';
import ScrollProgress from '../ui/ScrollProgress';

interface ModalContextType {
  openStory: (index: number) => void;
  closeStory: () => void;
  openContact: (interest?: string, isBooking?: boolean) => void;
  closeContact: () => void;
  openInfo: (key: string, isLegal?: boolean) => void;
  closeInfo: () => void;
  openCommunity: () => void;
  closeCommunity: () => void;
  motionPaused: boolean;
  toggleMotion: () => void;
  activeStoryIndex: number;
  contactState: { isOpen: boolean; interest: string; isBooking: boolean };
  infoState: { isOpen: boolean; key: string; isLegal: boolean };
  communityOpen: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(-1);
  const [contactState, setContactState] = useState<{ isOpen: boolean; interest: string; isBooking: boolean }>({
    isOpen: false,
    interest: '',
    isBooking: false
  });
  const [infoState, setInfoState] = useState<{ isOpen: boolean; key: string; isLegal: boolean }>({
    isOpen: false,
    key: '',
    isLegal: true
  });
  const [communityOpen, setCommunityOpen] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReduced.matches) {
      setMotionPaused(true);
      document.documentElement.classList.add('motion-paused');
    }

    const handler = (e: MediaQueryListEvent) => {
      setMotionPaused(e.matches);
      document.documentElement.classList.toggle('motion-paused', e.matches);
    };

    prefersReduced.addEventListener('change', handler);
    return () => prefersReduced.removeEventListener('change', handler);
  }, []);

  const toggleMotion = useCallback(() => {
    setMotionPaused(prev => {
      const next = !prev;
      document.documentElement.classList.toggle('motion-paused', next);
      return next;
    });
  }, []);

  const openStory = useCallback((index: number) => {
    setActiveStoryIndex(index);
    document.body.classList.add('modal-open');
  }, []);

  const closeStory = useCallback(() => {
    setActiveStoryIndex(-1);
    document.body.classList.remove('modal-open');
  }, []);

  const openContact = useCallback((interest: string = '', isBooking: boolean = false) => {
    setContactState({ isOpen: true, interest, isBooking });
    document.body.classList.add('modal-open');
  }, []);

  const closeContact = useCallback(() => {
    setContactState({ isOpen: false, interest: '', isBooking: false });
    document.body.classList.remove('modal-open');
  }, []);

  const openInfo = useCallback((key: string, isLegal: boolean = true) => {
    setInfoState({ isOpen: true, key, isLegal });
    document.body.classList.add('modal-open');
  }, []);

  const closeInfo = useCallback(() => {
    setInfoState({ isOpen: false, key: '', isLegal: true });
    document.body.classList.remove('modal-open');
  }, []);

  const openCommunity = useCallback(() => {
    setCommunityOpen(true);
    document.body.classList.add('modal-open');
  }, []);

  const closeCommunity = useCallback(() => {
    setCommunityOpen(false);
    document.body.classList.remove('modal-open');
  }, []);

  // Sync scroll lock with any active dialog
  useEffect(() => {
    const isAnyOpen = activeStoryIndex >= 0 || contactState.isOpen || infoState.isOpen || communityOpen;
    document.body.classList.toggle('modal-open', isAnyOpen);
  }, [activeStoryIndex, contactState.isOpen, infoState.isOpen, communityOpen]);

  return (
    <ModalContext.Provider
      value={{
        openStory,
        closeStory,
        openContact,
        closeContact,
        openInfo,
        closeInfo,
        openCommunity,
        closeCommunity,
        motionPaused,
        toggleMotion,
        activeStoryIndex,
        contactState,
        infoState,
        communityOpen
      }}
    >
      <ScrollProgress />
      {children}
      <StoryDialog />
      <ContactDialog />
      <InfoDialog />
      <CommunityDialog />
      <MotionControl />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
