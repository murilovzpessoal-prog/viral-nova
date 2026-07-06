import React, { useState, useRef, useEffect } from 'react';
import { Scissors, Type, Play, Pause, Plus, Trash2, Video as VideoIcon, Download, SlidersHorizontal, Image as ImageIcon, X, Maximize2, FolderOpen } from 'lucide-react';

interface MediaFile {
  id: string;
  file: File;
  url: string;
  name: string;
  duration: number;
}

interface TimelineVideo {
  id: string;
  mediaId: string;
  url: string;
  name: string;
  start: number;
  duration: number;
  sourceStart: number;
  maxDuration: number;
}

interface TimelineText {
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

export interface EditorViewProps {
  initialDraft?: EditorDraft;
  onSaveDraft?: (draft: EditorDraft) => void;
  onOpenDrafts?: () => void;
}

export const EditorView: React.FC<EditorViewProps> = ({ initialDraft, onSaveDraft, onOpenDrafts }) => {
  const [media, setMedia] = useState<MediaFile[]>(initialDraft?.media || []);
  const [timelineVideos, setTimelineVideos] = useState<TimelineVideo[]>(initialDraft?.timelineVideos || []);
  const [timelineTexts, setTimelineTexts] = useState<TimelineText[]>(initialDraft?.timelineTexts || []);
  const [currentTime, setCurrentTime] = useState(0);
  const currentTimeRef = useRef(0);
  useEffect(() => { currentTimeRef.current = currentTime; }, [currentTime]);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'media' | 'text'>('media');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  
  // Interactive State
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [draggingTextId, setDraggingTextId] = useState<string | null>(null);
  const [resizingTextInfo, setResizingTextInfo] = useState<{ id: string, type: 'scale' | 'width', startX: number, startY: number, startWidth: number, startScale: number } | null>(null);
  
  const [trimmingVideoId, setTrimmingVideoId] = useState<{ id: string; edge: 'left' | 'right' } | null>(null);
  const [trimmingTextId, setTrimmingTextId] = useState<{ id: string; edge: 'left' | 'right' } | null>(null);
  
  const [movingClipInfo, setMovingClipInfo] = useState<{ id: string, startX: number, startClipTime: number } | null>(null);
  const [movingTextInfo, setMovingTextInfo] = useState<{ id: string, startX: number, startClipTime: number } | null>(null);
  const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const playerVideoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const totalDuration = Math.max(
    10, 
    ...timelineVideos.map(v => v.start + v.duration),
    ...timelineTexts.map(t => t.start + t.duration)
  );

  // Upload handler
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      const video = document.createElement('video');
      video.src = url;
      video.onloadedmetadata = () => {
        setMedia(prev => [...prev, {
          id: Math.random().toString(36).substring(7),
          file,
          url,
          name: file.name,
          duration: video.duration
        }]);
      };
    }
  };

  const addToTimeline = (m: MediaFile) => {
    const lastVideo = timelineVideos[timelineVideos.length - 1];
    const startTime = lastVideo ? lastVideo.start + lastVideo.duration : 0;
    
    setTimelineVideos(prev => [...prev, {
      id: Math.random().toString(36).substring(7),
      mediaId: m.id,
      url: m.url,
      name: m.name,
      start: startTime,
      duration: m.duration,
      sourceStart: 0,
      maxDuration: m.duration
    }]);
  };

  const addTextToTimeline = () => {
    setTimelineTexts(prev => [...prev, {
      id: Math.random().toString(36).substring(7),
      text: 'POV: Nova Headline',
      start: currentTime,
      duration: 3,
      top: 50,
      left: 50,
      width: 250,
      scale: 1
    }]);
  };

  const splitActiveVideo = () => {
    const activeVideoIndex = timelineVideos.findIndex(v => currentTime > v.start && currentTime < v.start + v.duration);
    if (activeVideoIndex === -1) return;

    const activeVideo = timelineVideos[activeVideoIndex];
    const cutPoint = currentTime - activeVideo.start;
    
    const v1 = { ...activeVideo, duration: cutPoint };
    const v2 = { ...activeVideo, id: Math.random().toString(36).substring(7), start: currentTime, sourceStart: activeVideo.sourceStart + cutPoint, duration: activeVideo.duration - cutPoint };
    
    const newVideos = [...timelineVideos];
    newVideos.splice(activeVideoIndex, 1, v1, v2);
    setTimelineVideos(newVideos);
  };

  const deleteSelected = (idToForce?: string) => {
    const id = idToForce || selectedElementId;
    if (!id) return;
    setTimelineVideos(prev => prev.filter(v => v.id !== id));
    setTimelineTexts(prev => prev.filter(t => t.id !== id));
    if (selectedElementId === id) setSelectedElementId(null);
  };

  const handleSaveDraft = () => {
    if (onSaveDraft) {
      onSaveDraft({
        id: initialDraft?.id || Math.random().toString(36).substring(7),
        name: initialDraft?.name || `Vídeo_${new Date().toLocaleDateString().replace(/\//g, '')}`,
        updatedAt: Date.now(),
        media,
        timelineVideos,
        timelineTexts
      });
    }
  };

  const [isExporting, setIsExporting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isExportingRef = useRef(false);

  const handleExport = async () => {
    if (!playerVideoRef.current || !canvasRef.current || timelineVideos.length === 0) return;
    setIsExporting(true);
    isExportingRef.current = true;
    setCurrentTime(0);
    setIsPlaying(false);

    // Wait a brief moment to ensure video is seeked to 0 before we start
    await new Promise(r => setTimeout(r, 200));

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsExporting(false);
      return;
    }

    // Standard TikTok/Reels resolution
    canvas.width = 1080;
    canvas.height = 1920;

    const stream = canvas.captureStream(60); // 60 fps for ultra smoothness
    
    const mimeTypes = [
      'video/mp4;codecs=avc1',
      'video/mp4',
      'video/webm;codecs=vp9',
      'video/webm;codecs=vp8',
      'video/webm'
    ];
    let selectedMimeType = '';
    for (const type of mimeTypes) {
      if (MediaRecorder.isTypeSupported(type)) {
        selectedMimeType = type;
        break;
      }
    }
    if (!selectedMimeType) selectedMimeType = 'video/mp4';

    const recorder = new MediaRecorder(stream, { 
      mimeType: selectedMimeType,
      videoBitsPerSecond: 15000000 // 15 Mbps for ultra high quality
    });
    
    const chunks: Blob[] = [];

    recorder.ondataavailable = e => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: selectedMimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      // Force MP4 extension for maximum compatibility
      a.download = `Viralpulse_Export_${Date.now()}.mp4`;
      a.click();
      URL.revokeObjectURL(url);
      setIsExporting(false);
      isExportingRef.current = false;
    };

    recorder.start();

    // Start drawing loop via requestAnimationFrame following real-time playback
    const processFrame = () => {
      const currentExportTime = currentTimeRef.current;
      
      if (currentExportTime >= totalDuration - 0.1 || !isExportingRef.current) {
        if (recorder.state !== 'inactive') recorder.stop();
        setIsPlaying(false);
        setCurrentTime(0);
        return;
      }

      // Draw background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Video if exists
      const currentVid = timelineVideos.find(v => currentExportTime >= v.start && currentExportTime < v.start + v.duration);
      if (currentVid && playerVideoRef.current) {
         ctx.drawImage(playerVideoRef.current, 0, 0, canvas.width, canvas.height);
      }

      // Draw Texts
      const currentTexts = timelineTexts.filter(t => currentExportTime >= t.start && currentExportTime < t.start + t.duration);
      currentTexts.forEach(t => {
        ctx.save();
        ctx.font = `900 ${40 * t.scale}px sans-serif`; // Base font size * scale
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const x = (t.left / 100) * canvas.width;
        const y = (t.top / 100) * canvas.height;

        ctx.translate(x, y);

        // TikTok stroke style
        ctx.lineWidth = 12 * t.scale;
        ctx.strokeStyle = '#000000';
        ctx.lineJoin = 'round';
        ctx.miterLimit = 2;
        
        ctx.fillStyle = '#FFFFFF';

        const lines = t.text.split('\n');
        const lineHeight = 48 * t.scale;
        const totalHeight = lines.length * lineHeight;
        const startY = -(totalHeight / 2) + (lineHeight / 2);

        lines.forEach((line, index) => {
          ctx.strokeText(line, 0, startY + (index * lineHeight));
          ctx.fillText(line, 0, startY + (index * lineHeight));
        });

        ctx.restore();
      });

      requestAnimationFrame(processFrame);
    };

    setIsPlaying(true);
    processFrame();
  };

  // MAGNETIC TIMELINE: Re-sort and snap videos to remove gaps if user prefers, but standard NLEs allow gaps. 
  // We will allow gaps, but drive playback continuously via requestAnimationFrame so black screens pass.

  const activeVideo = timelineVideos.find(v => currentTime >= v.start && currentTime < v.start + v.duration);
  const activeTexts = timelineTexts.filter(t => currentTime >= t.start && currentTime < t.start + t.duration);

  // DRIVER FOR PLAYBACK
  useEffect(() => {
    let lastTime = performance.now();
    const update = (time: number) => {
      if (isPlaying) {
        const delta = (time - lastTime) / 1000;
        setCurrentTime(prev => {
          const next = prev + delta;
          if (next > totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          return next;
        });
      }
      lastTime = time;
      animationRef.current = requestAnimationFrame(update);
    };
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(update);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, totalDuration]);

  // SYNC VIDEO ELEMENT
  useEffect(() => {
    if (playerVideoRef.current) {
      if (isPlaying && activeVideo) {
        // Native playback for smooth video
        playerVideoRef.current.play().catch(() => setIsPlaying(false));
      } else {
        playerVideoRef.current.pause();
      }
    }
  }, [isPlaying, activeVideo?.id]);

  useEffect(() => {
    if (playerVideoRef.current && activeVideo) {
      const targetSourceTime = activeVideo.sourceStart + (currentTime - activeVideo.start);
      // Only force sync if paused, OR if drift is large (e.g. just seeked/jumped)
      const drift = Math.abs(playerVideoRef.current.currentTime - targetSourceTime);
      if (!isPlaying || drift > 0.3) {
        playerVideoRef.current.currentTime = targetSourceTime;
      }
    }
  }, [currentTime, activeVideo, isPlaying]);


  // DRAG & RESIZE LOGIC FOR TEXT OVERLAYS
  const handlePlayerPointerMove = (e: React.PointerEvent) => {
    if (!playerContainerRef.current) return;
    
    if (resizingTextInfo) {
      const deltaX = e.clientX - resizingTextInfo.startX;
      setTimelineTexts(prev => prev.map(t => {
        if (t.id !== resizingTextInfo.id) return t;
        if (resizingTextInfo.type === 'width') {
          return { ...t, width: Math.max(100, resizingTextInfo.startWidth + (deltaX * 2)) };
        }
        if (resizingTextInfo.type === 'scale') {
          const scaleDelta = deltaX * 0.005;
          return { ...t, scale: Math.max(0.3, resizingTextInfo.startScale + scaleDelta) };
        }
        return t;
      }));
      return;
    }

    if (draggingTextId) {
      const rect = playerContainerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
      const left = (x / rect.width) * 100;
      const top = (y / rect.height) * 100;

      setTimelineTexts(prev => prev.map(t => t.id === draggingTextId ? { ...t, left, top } : t));
    }
  };

  // DRAG LOGIC FOR TIMELINE
  const handleTimelinePointerMove = (e: React.PointerEvent) => {
    if (!timelineTrackRef.current) return;
    const rect = timelineTrackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newTime = (x / rect.width) * Math.max(10, totalDuration);

    if (isDraggingPlayhead) {
      setCurrentTime(newTime);
      return;
    }

    if (trimmingVideoId) {
      setTimelineVideos(prev => prev.map(v => {
        if (v.id !== trimmingVideoId.id) return v;

        if (trimmingVideoId.edge === 'left') {
          const maxStart = v.start + v.duration - 0.5;
          const minStart = Math.max(0, v.start - v.sourceStart);
          const validTime = Math.max(minStart, Math.min(newTime, maxStart));
          
          const delta = validTime - v.start;
          return {
            ...v,
            start: validTime,
            sourceStart: v.sourceStart + delta,
            duration: v.duration - delta
          };
        } else {
          const minEnd = v.start + 0.5;
          const maxEnd = v.start + (v.maxDuration - v.sourceStart);
          const validTime = Math.max(minEnd, Math.min(newTime, maxEnd));
          return {
            ...v,
            duration: validTime - v.start
          };
        }
      }));
      return;
    }

    if (trimmingTextId) {
      setTimelineTexts(prev => prev.map(t => {
        if (t.id !== trimmingTextId.id) return t;

        if (trimmingTextId.edge === 'left') {
          const maxStart = t.start + t.duration - 0.5;
          const validTime = Math.max(0, Math.min(newTime, maxStart));
          const delta = validTime - t.start;
          return { ...t, start: validTime, duration: t.duration - delta };
        } else {
          const minEnd = t.start + 0.5;
          const validTime = Math.max(minEnd, newTime);
          return { ...t, duration: validTime - t.start };
        }
      }));
      return;
    }

    if (movingClipInfo) {
      const deltaX = e.clientX - movingClipInfo.startX;
      const deltaTime = (deltaX / rect.width) * Math.max(10, totalDuration);

      setTimelineVideos(prev => prev.map(v => {
        if (v.id !== movingClipInfo.id) return v;
        return { ...v, start: Math.max(0, movingClipInfo.startClipTime + deltaTime) };
      }));
    }

    if (movingTextInfo) {
      const deltaX = e.clientX - movingTextInfo.startX;
      const deltaTime = (deltaX / rect.width) * Math.max(10, totalDuration);

      setTimelineTexts(prev => prev.map(t => {
        if (t.id !== movingTextInfo.id) return t;
        return { ...t, start: Math.max(0, movingTextInfo.startClipTime + deltaTime) };
      }));
    }
  };

  const handleGlobalPointerUp = () => {
    setDraggingTextId(null);
    setResizingTextInfo(null);
    setTrimmingVideoId(null);
    setTrimmingTextId(null);
    setMovingClipInfo(null);
    setMovingTextInfo(null);
    setIsDraggingPlayhead(false);
  };

  return (
    <main 
      className="flex-1 h-full flex flex-col bg-[#0B0B0E] overflow-hidden text-white font-sans"
      onPointerUp={handleGlobalPointerUp}
      onPointerLeave={handleGlobalPointerUp}
      onPointerMove={(e) => {
        handlePlayerPointerMove(e);
        handleTimelinePointerMove(e);
      }}
    >
      {/* TOP HEADER */}
      <header className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-black/40 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-4">
          <Scissors className="w-5 h-5 text-[#00F0FF]" />
          <h1 className="text-lg font-black tracking-tighter">
            VIRAL<span className="text-[#00F0FF]">EDITOR</span>
          </h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSaveDraft}
            className="px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-colors"
          >
            Salvar Rascunho
          </button>
          <button 
            onClick={handleExport}
            disabled={isExporting || timelineVideos.length === 0}
            className="px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest bg-gradient-to-r from-[#00F0FF] to-[#FF007F] hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,0,127,0.3)] flex items-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
          >
            <Download className="w-3 h-3" />
            {isExporting ? 'Exportando...' : 'Exportar'}
          </button>
        </div>
      </header>

      {/* WORKSPACE */}
      <div className="flex flex-1 min-h-0">
        {/* LEFT TOOLBAR */}
        <div className="w-16 border-r border-white/10 bg-black/20 flex flex-col items-center py-4 gap-6 shrink-0">
          <button onClick={() => setActiveTab('media')} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${activeTab === 'media' ? 'bg-[#00F0FF]/20 text-[#00F0FF]' : 'text-[#8d8d99] hover:bg-white/5'}`}>
            <VideoIcon className="w-5 h-5" />
          </button>
          <button onClick={() => setActiveTab('text')} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${activeTab === 'text' ? 'bg-[#FF007F]/20 text-[#FF007F]' : 'text-[#8d8d99] hover:bg-white/5'}`}>
            <Type className="w-5 h-5" />
          </button>
          {onOpenDrafts && (
            <button onClick={onOpenDrafts} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all text-[#8d8d99] hover:bg-white/5 hover:text-white mt-auto mb-2`} title="Rascunhos">
              <FolderOpen className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* SIDEBAR CONTENT */}
        <div className="w-72 border-r border-white/10 bg-[#0B0B0E]/80 backdrop-blur-lg flex flex-col shrink-0">
          <div className="p-4 border-b border-white/5">
            <h2 className="text-sm font-black uppercase tracking-widest">{activeTab === 'media' ? 'Mídia' : 'Textos'}</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {activeTab === 'media' && (
              <div className="flex flex-col gap-4">
                <input type="file" ref={fileInputRef} className="hidden" accept="video/*" multiple onChange={handleUpload} />
                <button onClick={() => fileInputRef.current?.click()} className="w-full py-6 border-2 border-dashed border-white/10 hover:border-[#00F0FF]/50 rounded-2xl flex flex-col items-center gap-2 hover:bg-white/5 transition-all">
                  <Plus className="w-6 h-6 text-[#5b5b7b]" />
                  <span className="text-xs font-medium text-[#8d8d99]">Importar Vídeos</span>
                </button>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  {media.map(m => (
                    <div key={m.id} className="relative aspect-[9/16] bg-black/40 rounded-xl overflow-hidden group border border-white/5 hover:border-[#00F0FF]/50 transition-colors">
                      <video src={m.url} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <button onClick={() => addToTimeline(m)} className="w-8 h-8 rounded-full bg-[#00F0FF] text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="absolute bottom-1 right-2 text-[9px] font-black bg-black/80 px-1.5 rounded text-white/80">{m.duration.toFixed(1)}s</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'text' && (
              <div className="flex flex-col gap-4">
                <button onClick={addTextToTimeline} className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/5 hover:border-[#FF007F]/30">
                  <Type className="w-4 h-4 text-[#FF007F]" />
                  <span className="text-xs font-black uppercase tracking-widest">Adicionar Headline</span>
                </button>
                <div className="p-4 bg-[#00F0FF]/5 border border-[#00F0FF]/20 rounded-xl mt-4">
                  <p className="text-[10px] text-[#00F0FF] uppercase font-black tracking-widest mb-2">Dica PRO</p>
                  <p className="text-xs text-[#8d8d99]">Dê <b>dois cliques</b> no texto dentro do vídeo para editar a frase. Use as alças laterais para esticar a largura e a alça no canto para aumentar o tamanho!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PLAYER PREVIEW */}
        <div className="flex-1 bg-black/90 flex flex-col relative overflow-hidden">
          <div className="flex-1 relative flex items-center justify-center p-8">
            <div 
              ref={playerContainerRef}
              className="relative aspect-[9/16] h-full max-h-[60vh] bg-black rounded-2xl shadow-2xl border border-white/10 ring-1 ring-white/5 overflow-hidden"
              onPointerDown={() => setSelectedElementId(null)}
            >
              {activeVideo ? (
                <video 
                  ref={playerVideoRef}
                  src={activeVideo.url} 
                  className="w-full h-full object-cover" 
                  playsInline
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#5b5b7b]">
                  <ImageIcon className="w-12 h-12 opacity-20" />
                </div>
              )}

              {/* Hidden Canvas for Exporting */}
              <canvas ref={canvasRef} className="hidden" />

              {/* OVERLAYS */}
              {activeTexts.map(t => (
                <div 
                  key={t.id} 
                  className={`absolute p-1 cursor-move transition-colors ${selectedElementId === t.id ? 'ring-1 ring-dashed ring-white/80 rounded' : ''}`}
                  style={{ 
                    top: `${t.top}%`, 
                    left: `${t.left}%`, 
                    transform: `translate(-50%, -50%) scale(${t.scale})`, 
                    width: `${t.width}px`, 
                    touchAction: 'none',
                    textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 4px 10px rgba(0,0,0,0.8)' // TikTok style thick black outline
                  }}
                  onPointerDown={(e) => { e.stopPropagation(); setDraggingTextId(t.id); setSelectedElementId(t.id); }}
                  onDoubleClick={(e) => { e.stopPropagation(); setEditingTextId(t.id); }}
                >
                  {/* Handle for Scaling (Bottom Right) */}
                  {selectedElementId === t.id && (
                    <div 
                      className="absolute -bottom-3 -right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-black cursor-nwse-resize z-50 hover:scale-110 hover:bg-[#00F0FF] transition-colors"
                      onPointerDown={(e) => { e.stopPropagation(); setResizingTextInfo({ id: t.id, type: 'scale', startX: e.clientX, startY: e.clientY, startWidth: t.width, startScale: t.scale }); }}
                    >
                      <Maximize2 className="w-3 h-3 text-black" />
                    </div>
                  )}

                  {/* Handle for Width (Right edge) */}
                  {selectedElementId === t.id && (
                    <div 
                      className="absolute top-1/2 -right-2 -translate-y-1/2 w-3 h-6 bg-white rounded-sm shadow-lg border-2 border-black cursor-ew-resize z-50 hover:bg-[#00F0FF] transition-colors"
                      onPointerDown={(e) => { e.stopPropagation(); setResizingTextInfo({ id: t.id, type: 'width', startX: e.clientX, startY: e.clientY, startWidth: t.width, startScale: t.scale }); }}
                    />
                  )}
                  {/* Handle for Width (Left edge - for symmetry but modifies overall width) */}
                  {selectedElementId === t.id && (
                    <div 
                      className="absolute top-1/2 -left-2 -translate-y-1/2 w-3 h-6 bg-white rounded-sm shadow-lg border-2 border-black cursor-ew-resize z-50 hover:bg-[#00F0FF] transition-colors"
                      onPointerDown={(e) => { e.stopPropagation(); setResizingTextInfo({ id: t.id, type: 'width', startX: e.clientX, startY: e.clientY, startWidth: t.width, startScale: t.scale }); }}
                    />
                  )}

                  {/* Delete Button attached to selected text */}
                  {selectedElementId === t.id && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteSelected(t.id); }}
                      className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 hover:bg-red-600 z-50 cursor-pointer border-2 border-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}

                  {editingTextId === t.id ? (
                    <textarea 
                      autoFocus
                      className="bg-transparent border-none outline-none text-center text-xl text-white font-black w-full resize-none overflow-hidden"
                      style={{ textShadow: 'inherit' }}
                      value={t.text}
                      rows={t.text.split('\n').length}
                      onChange={(e) => setTimelineTexts(prev => prev.map(text => text.id === t.id ? { ...text, text: e.target.value } : text))}
                      onBlur={() => setEditingTextId(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) { // Allow shift+enter for lines if wanted
                          e.preventDefault();
                          setEditingTextId(null);
                        }
                      }}
                    />
                  ) : (
                    <div className="text-xl leading-tight text-white font-black select-none pointer-events-none whitespace-pre-wrap text-center flex flex-col justify-center min-h-[30px]">
                      {t.text}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* PLAYER CONTROLS */}
          <div className="h-16 pb-2 flex items-center justify-center gap-6 border-t border-white/5 bg-black/40 backdrop-blur-md">
            <span className="text-xs font-black tabular-nums text-[#8d8d99] w-12 text-right">{currentTime.toFixed(1)}s</span>
            <button 
              onClick={() => { 
                if (!isPlaying) {
                  if (currentTime >= totalDuration - 0.1 || !activeVideo) {
                    setCurrentTime(0);
                  }
                  setIsPlaying(true);
                  setSelectedElementId(null);
                } else {
                  setIsPlaying(false);
                }
              }} 
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
            </button>
            <span className="text-xs font-black tabular-nums text-[#5b5b7b] w-12">{totalDuration.toFixed(1)}s</span>
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="h-[280px] bg-[#0B0B0E] border-t border-white/10 flex flex-col shrink-0 relative">
        <div className="h-10 bg-[#14141A] border-b border-white/5 flex items-center justify-between px-4">
          <div className="flex gap-2">
            <button onClick={splitActiveVideo} className="p-1.5 rounded hover:bg-white/10 text-[#8d8d99] hover:text-white transition-colors" title="Cortar (Split) na Agulha">
              <Scissors className="w-4 h-4" />
            </button>
            <button onClick={() => deleteSelected()} disabled={!selectedElementId} className="p-1.5 rounded hover:bg-red-500/20 text-[#8d8d99] hover:text-red-500 transition-colors disabled:opacity-30 disabled:hover:bg-transparent" title="Excluir">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-[#5b5b7b]">
            <SlidersHorizontal className="w-3 h-3" />
            <span className="text-[10px] uppercase font-black tracking-widest">Timeline</span>
          </div>
        </div>

        <div className="flex-1 relative overflow-x-auto overflow-y-hidden custom-scrollbar group/timeline">
          {/* RULER */}
          <div 
            className="h-6 border-b border-white/5 relative min-w-full cursor-pointer bg-white/[0.01]" 
            style={{ width: `${Math.max(100, totalDuration * 5)}%` }}
            onPointerDown={(e) => { 
              setIsDraggingPlayhead(true); 
              if (timelineTrackRef.current) {
                const rect = timelineTrackRef.current.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                setCurrentTime((x / rect.width) * Math.max(10, totalDuration));
              }
            }}
          >
            {Array.from({ length: Math.ceil(totalDuration) + 10 }).map((_, i) => (
              <div key={i} className="absolute top-0 bottom-0 border-l border-white/10 flex flex-col justify-end pointer-events-none" style={{ left: `${(i / Math.max(10, totalDuration)) * 100}%` }}>
                <span className="text-[8px] text-[#5b5b7b] ml-1 mb-0.5">{i}s</span>
              </div>
            ))}
          </div>

          {/* TRACKS AREA */}
          <div 
            ref={timelineTrackRef}
            className="relative h-full pt-4 min-w-full" 
            style={{ width: `${Math.max(100, totalDuration * 5)}%` }}
          >
            {/* TEXT TRACK */}
            <div className="h-10 mb-2 relative bg-white/[0.01] rounded-r-lg border-y border-r border-transparent hover:border-white/5 transition-colors">
              <div className="absolute -left-20 w-20 h-full flex items-center px-2">
                <span className="text-[9px] font-black uppercase text-[#FF007F]">Textos</span>
              </div>
              {timelineTexts.map(t => (
                <div 
                  key={t.id}
                  onPointerDown={(e) => { 
                    e.stopPropagation(); 
                    setSelectedElementId(t.id); 
                    setMovingTextInfo({ id: t.id, startX: e.clientX, startClipTime: t.start });
                  }}
                  className={`absolute h-full rounded-md border flex cursor-move transition-all ${selectedElementId === t.id ? 'bg-[#FF007F]/40 border-[#FF007F] z-10 shadow-[0_0_10px_rgba(255,0,127,0.5)]' : 'bg-[#FF007F]/20 border-[#FF007F]/40 hover:bg-[#FF007F]/30 z-0'}`}
                  style={{ 
                    left: `${(t.start / Math.max(10, totalDuration)) * 100}%`, 
                    width: `${(t.duration / Math.max(10, totalDuration)) * 100}%` 
                  }}
                >
                  {/* Left Trim Handle for Text */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-2 hover:bg-white cursor-ew-resize flex items-center justify-center rounded-l-sm z-20"
                    onPointerDown={(e) => { e.stopPropagation(); setTrimmingTextId({ id: t.id, edge: 'left' }); setSelectedElementId(t.id); setMovingTextInfo(null); }}
                  >
                    <div className="w-[1px] h-3 bg-white/50"></div>
                  </div>

                  <div className="flex-1 flex items-center px-3 overflow-hidden pointer-events-none">
                    <Type className="w-3 h-3 text-white mr-1 shrink-0" />
                    <span className="text-[10px] font-bold text-white truncate">{t.text}</span>
                  </div>

                  {/* Right Trim Handle for Text */}
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-2 hover:bg-white cursor-ew-resize flex items-center justify-center rounded-r-sm z-20"
                    onPointerDown={(e) => { e.stopPropagation(); setTrimmingTextId({ id: t.id, edge: 'right' }); setSelectedElementId(t.id); setMovingTextInfo(null); }}
                  >
                    <div className="w-[1px] h-3 bg-white/50"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* VIDEO TRACK */}
            <div className="h-20 relative bg-white/[0.02] rounded-r-lg border-y border-r border-transparent hover:border-white/5 transition-colors">
              <div className="absolute -left-20 w-20 h-full flex items-center px-2">
                <span className="text-[9px] font-black uppercase text-[#00F0FF]">Vídeos</span>
              </div>
              {timelineVideos.map(v => (
                <div 
                  key={v.id}
                  onPointerDown={(e) => { 
                    e.stopPropagation(); 
                    setSelectedElementId(v.id); 
                    setMovingClipInfo({ id: v.id, startX: e.clientX, startClipTime: v.start }); 
                  }}
                  className={`absolute h-full rounded-md border flex flex-col cursor-move transition-all ${selectedElementId === v.id ? 'border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] z-10' : 'border-[#00F0FF]/40 hover:border-[#00F0FF] opacity-90 hover:opacity-100 z-0'}`}
                  style={{ 
                    left: `${(v.start / Math.max(10, totalDuration)) * 100}%`, 
                    width: `${(v.duration / Math.max(10, totalDuration)) * 100}%` 
                  }}
                >
                  {/* Left Trim Handle */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-3 bg-white/20 hover:bg-white cursor-ew-resize flex items-center justify-center rounded-l-sm z-20"
                    onPointerDown={(e) => { e.stopPropagation(); setTrimmingVideoId({ id: v.id, edge: 'left' }); setSelectedElementId(v.id); setMovingClipInfo(null); }}
                  >
                    <div className="w-[1px] h-4 bg-black/50"></div>
                  </div>

                  <div className="h-4 bg-[#00F0FF]/20 w-full shrink-0 flex items-center px-4 pointer-events-none">
                    <span className="text-[8px] font-black text-white truncate">{v.name}</span>
                  </div>
                  <div className="flex-1 bg-[#0B0B0E]/80 relative flex items-center justify-center overflow-hidden pointer-events-none">
                    <div className="text-[10px] font-black text-[#5b5b7b]">VIDEO CLIP</div>
                  </div>

                  {/* Right Trim Handle */}
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-3 bg-white/20 hover:bg-white cursor-ew-resize flex items-center justify-center rounded-r-sm z-20"
                    onPointerDown={(e) => { e.stopPropagation(); setTrimmingVideoId({ id: v.id, edge: 'right' }); setSelectedElementId(v.id); setMovingClipInfo(null); }}
                  >
                    <div className="w-[1px] h-4 bg-black/50"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* PLAYHEAD */}
            <div 
              className="absolute top-0 bottom-0 w-[1px] bg-red-500 z-20 shadow-[0_0_10px_rgba(239,68,68,1)] pointer-events-none"
              style={{ left: `${(currentTime / Math.max(10, totalDuration)) * 100}%` }}
            >
              <div className="w-3 h-3 bg-red-500 rounded-full absolute -top-1.5 -left-1.5"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
