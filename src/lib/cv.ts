export const applyFrequencySeparation = async (originalSrc: string, generatedSrc: string, blendOpacity: number = 0.35): Promise<string> => {
  return new Promise((resolve, reject) => {
    const origImg = new Image();
    const genImg = new Image();
    origImg.crossOrigin = 'Anonymous';
    genImg.crossOrigin = 'Anonymous';
    
    let loaded = 0;
    const onload = () => {
      loaded++;
      if (loaded === 2) {
         try {
           const canvas = document.createElement('canvas');
           canvas.width = genImg.width;
           canvas.height = genImg.height;
           const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
           
           // Desenha Original
           ctx.drawImage(origImg, 0, 0, canvas.width, canvas.height);
           const origData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
           
           // Desenha Low Freq (Blur)
           ctx.filter = 'blur(10px)';
           ctx.drawImage(origImg, 0, 0, canvas.width, canvas.height);
           const lowData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
           
           // Desenha Gerada (VTON)
           ctx.filter = 'none';
           ctx.drawImage(genImg, 0, 0, canvas.width, canvas.height);
           const genData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
           
           const finalData = new ImageData(canvas.width, canvas.height);
           
           // Heurística rápida para detecção de tom de pele em RGB
           const isSkin = (r: number, g: number, b: number) => {
             const max = Math.max(r, g, b);
             const min = Math.min(r, g, b);
             return (r > 95 && g > 40 && b > 20 && (max - min) > 15 && Math.abs(r - g) > 15 && r > g && r > b);
           };

           for (let i = 0; i < origData.length; i += 4) {
             const oR = origData[i];
             const oG = origData[i+1];
             const oB = origData[i+2];
             
             // Identifica se a região na imagem original era pele
             const skin = isSkin(oR, oG, oB);
             
             // Se não for pele, copia o pixel gerado (roupa, fundo) sem textura
             if (!skin) {
               finalData.data[i] = genData[i];
               finalData.data[i+1] = genData[i+1];
               finalData.data[i+2] = genData[i+2];
               finalData.data[i+3] = 255;
               continue;
             }

             // Processamento da Textura (Frequency Separation)
             for(let c = 0; c < 3; c++) {
               const orig = origData[i+c];
               const low = lowData[i+c];
               const gen = genData[i+c];
               
               // High freq detail (Textura pura)
               const high = orig - low;
               
               // Linear Light Blend (Gerada + Textura)
               let blended = gen + (high * (blendOpacity * 2.5));
               
               if (blended > 255) blended = 255;
               if (blended < 0) blended = 0;
               
               finalData.data[i+c] = blended;
             }
             finalData.data[i+3] = 255;
           }
           
           ctx.putImageData(finalData, 0, 0);
           resolve(canvas.toDataURL('image/jpeg', 0.95));
         } catch (e) {
           reject(e);
         }
      }
    };
    origImg.onload = onload;
    genImg.onload = onload;
    origImg.onerror = reject;
    genImg.onerror = reject;
    origImg.src = originalSrc;
    genImg.src = generatedSrc;
  });
};
