import re

with open('App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# I want to add a state inside VideosView to hold the shuffled array.
# Let's find: `const [favorites, setFavorites] = useState<string[]>([]);` or similar.
# Actually, the easiest is to find `const videoData = (() => { ... })();`
# And we can just shuffle inside `videoData` calculation if `videoFilter === 'all'`.
# But wait, if we shuffle during render, it will shuffle on every re-render (e.g. when hovering, if there's hover state).
# It's better to shuffle ONCE per mount.

# Let's see the start of VideosView
# const VideosView: React.FC = () => {
#   const [videoFilter, setVideoFilter] = useState<'all' | 'revenue' | 'sales' | 'favorites'>('all');

# I'll replace the allVideoData and videoData blocks.

old_logic = """  const allVideoData: VideoViral[] = Array.from({ length: 40 }, (_, i) => ({
    ...baseVideos[i % baseVideos.length],
    id: `v${i + 1}`,
    rank: i + 1
  }));

  const parseRevenue = (rev: string) => {
    if (!rev) return 0;
    const cleaned = rev.replace('R$ ', '').replace(/\\./g, '').replace(',', '.');
    return parseFloat(cleaned) || 0;
  };
  const parseSales = (sales: string) => {
    if (!sales) return 0;
    const match = sales.match(/[\\d]+/);
    return match ? parseInt(match[0]) : 0;
  };

  const videoData = (() => {
    let data = [...allVideoData];
    if (videoFilter === 'revenue') {
      data = [...data].sort((a, b) => parseRevenue(b.revenue6h) - parseRevenue(a.revenue6h));
    } else if (videoFilter === 'sales') {
      data = [...data].sort((a, b) => parseSales(b.sales6h) - parseSales(a.sales6h));
    } else if (videoFilter === 'favorites') {
      data = data.filter(v => favorites.includes(v.id));
    }
    return data;
  })();"""


new_logic = """  // Initial base data
  const parseRevenue = (rev: string) => {
    if (!rev) return 0;
    const cleaned = rev.replace('R$ ', '').replace(/\\./g, '').replace(',', '.');
    return parseFloat(cleaned) || 0;
  };
  const parseSales = (sales: string) => {
    if (!sales) return 0;
    const match = sales.match(/[\\d]+/);
    return match ? parseInt(match[0]) : 0;
  };

  const [shuffledVideos, setShuffledVideos] = useState<VideoViral[]>([]);

  useEffect(() => {
    // Generate and shuffle on mount
    const initialData: VideoViral[] = Array.from({ length: 40 }, (_, i) => ({
      ...baseVideos[i % baseVideos.length],
      id: `v${i + 1}`,
      rank: i + 1
    }));
    
    // Shuffle the array
    const shuffled = [...initialData].sort(() => Math.random() - 0.5);
    
    // Re-assign ranks based on new position to maintain the top list appearance
    const reRanked = shuffled.map((v, i) => ({
      ...v,
      rank: i + 1
    }));
    
    setShuffledVideos(reRanked);
  }, []);

  const videoData = (() => {
    let data = [...shuffledVideos];
    if (videoFilter === 'revenue') {
      data = [...data].sort((a, b) => parseRevenue(b.revenue6h) - parseRevenue(a.revenue6h));
    } else if (videoFilter === 'sales') {
      data = [...data].sort((a, b) => parseSales(b.sales6h) - parseSales(a.sales6h));
    } else if (videoFilter === 'favorites') {
      data = data.filter(v => favorites.includes(v.id));
    }
    return data;
  })();"""

if old_logic in text:
    text = text.replace(old_logic, new_logic)
    with open('App.tsx', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Replaced logic successfully!")
else:
    print("Could not find the exact old_logic. Please review.")

