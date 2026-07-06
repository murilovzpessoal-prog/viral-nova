import React from 'react';
import { Film, Play, Clock, Edit2 } from 'lucide-react';

export interface MediaFile {
  id: string;
  file: File;
  url: string;
  name: string;
  duration: number;
}

export interface TimelineVideo {
  id: string;
  mediaId: string;
  url: string;
  name: string;
  start: number;
  duration: number;
  sourceStart: number;
  maxDuration: number;
}

export interface TimelineText {
  id: string;
  text: string;
  start: number;
  duration: number;
  top: number;
  left: number;
  width: number;
  scale: number;
}

export interface EditorDraft {
  id: string;
  name: string;
  updatedAt: number;
  media: MediaFile[];
  timelineVideos: TimelineVideo[];
  timelineTexts: TimelineText[];
}

interface RascunhosViewProps {
  drafts: EditorDraft[];
  onOpenDraft: (draft: EditorDraft) => void;
  onNewVideo: () => void;
}

export const RascunhosView: React.FC<RascunhosViewProps> = ({ drafts, onOpenDraft, onNewVideo }) => {
  return (
    <div className="pt-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white mb-2">Meus <span className="text-[#00F0FF]">Rascunhos</span></h1>
          <p className="text-[#8d8d99]">Continue de onde parou. Seus rascunhos de vídeo salvos na sessão.</p>
        </div>
        <button 
          onClick={onNewVideo}
          className="px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest bg-white text-black hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          Novo Projeto
        </button>
      </div>

      {drafts.length === 0 ? (
        <div className="bg-[#14141A] border border-white/5 rounded-3xl p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-[#00F0FF]/10 rounded-full flex items-center justify-center mb-6">
            <Film className="w-10 h-10 text-[#00F0FF]" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Nenhum rascunho salvo</h2>
          <p className="text-[#8d8d99] mb-8 max-w-md">Você ainda não salvou nenhum projeto no Editor. Crie um novo vídeo e salve como rascunho para vê-lo aqui.</p>
          <button 
            onClick={onNewVideo}
            className="px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest bg-[#00F0FF] text-black hover:scale-105 transition-transform"
          >
            Abrir Editor
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {drafts.map(draft => {
            const totalDuration = draft.timelineVideos.reduce((acc, curr) => Math.max(acc, curr.start + curr.duration), 0);
            return (
              <div 
                key={draft.id} 
                className="bg-[#14141A] border border-white/5 rounded-2xl overflow-hidden group hover:border-[#00F0FF]/30 transition-all hover:-translate-y-1 cursor-pointer"
                onClick={() => onOpenDraft(draft)}
              >
                <div className="aspect-[9/16] bg-black relative flex items-center justify-center overflow-hidden">
                  {draft.timelineVideos.length > 0 ? (
                    <video src={draft.timelineVideos[0].url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <Film className="w-10 h-10 text-white/20" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14141A] via-transparent to-transparent"></div>
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-[#00F0FF] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                      <Play className="w-5 h-5 text-black ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/80 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                    <Clock className="w-3 h-3 text-[#00F0FF]" />
                    <span className="text-[10px] font-black tabular-nums text-white">{totalDuration.toFixed(1)}s</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-white text-lg mb-1">{draft.name}</h3>
                  <div className="flex items-center gap-4 text-xs text-[#8d8d99]">
                    <span className="flex items-center gap-1"><Film className="w-3 h-3" /> {draft.timelineVideos.length} clipes</span>
                    <span>Atualizado às {new Date(draft.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
