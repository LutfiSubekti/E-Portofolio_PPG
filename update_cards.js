const fs = require('fs');

const files = [
    'd:/laragon/www/E-Portofolio_PPG1/course-ct.html',
    'd:/laragon/www/E-Portofolio_PPG1/course-filosofi.html',
    'd:/laragon/www/E-Portofolio_PPG1/course-growth.html',
    'd:/laragon/www/E-Portofolio_PPG1/course-pemahaman.html',
    'd:/laragon/www/E-Portofolio_PPG1/course-pembelajaran.html',
    'd:/laragon/www/E-Portofolio_PPG1/course-selektif.html'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    let initialLength = content.length;

    // Change container wrapper to CSS Grid
    content = content.replace(/<div style="max-width: 800px; margin: 0 auto;">/, 
        '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; max-width: 1000px; margin: 0 auto;">');

    const cardRegex = /<div class="glass-card" style="margin-bottom: 2rem;">([\s\S]*?)Lihat PDF<\/a>\s*<\/div>\s*<\/div>\s*<\/div>/g;

    let matchCount = 0;
    content = content.replace(cardRegex, (match, inner) => {
        matchCount++;
        
        let colorMatch = inner.match(/color:\s*(#[0-9a-fA-F]+);/);
        let color = colorMatch ? colorMatch[1] : '#1a7b5d';
        
        let iconMatch = inner.match(/<i class="(fa-solid fa-[^"]+)"><\/i>/);
        let icon = iconMatch ? iconMatch[1] : 'fa-solid fa-file-contract';
        
        let titleMatch = inner.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
        let title = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : '';
        
        let descMatch = inner.match(/<p style="color:\s*var\(--text-muted\);\s*font-size:\s*0\.9rem;\s*margin:\s*0;">([\s\S]*?)<\/p>/);
        let desc = descMatch ? descMatch[1].replace(/\s+/g, ' ').trim() : '';

        return `
            <div class="glass-card" style="display: flex; flex-direction: column; justify-content: space-between; padding: 1.5rem; border-radius: 16px; transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.2)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                <div>
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="width: 48px; height: 48px; border-radius: 12px; background: ${color}22; display: flex; align-items: center; justify-content: center; color: ${color}; font-size: 1.25rem; flex-shrink: 0;">
                            <i class="${icon}"></i>
                        </div>
                        <h3 style="font-size: 1.1rem; margin: 0; color: var(--primary-light); line-height: 1.3;">${title}</h3>
                    </div>
                    <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.5rem; line-height: 1.5;">${desc}</p>
                </div>
                
                <div style="background: rgba(0,0,0,0.2); border-radius: 8px; padding: 1rem; display: flex; align-items: center; justify-content: space-between; border: 1px solid rgba(255,255,255,0.05);">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fa-solid fa-file-pdf" style="color: #e2574c; font-size: 1.2rem;"></i>
                        <div style="display: flex; flex-direction: column;">
                            <span style="font-size: 0.85rem; color: #fff; font-weight: 500;">Dokumen Artefak.pdf</span>
                            <span style="font-size: 0.7rem; color: var(--text-muted);">PDF Document</span>
                        </div>
                    </div>
                    <a href="#" target="_blank" style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: var(--primary); color: white; border-radius: 50%; text-decoration: none; font-size: 0.85rem; transition: background 0.3s ease;" onmouseover="this.style.background='var(--primary-dark)'" onmouseout="this.style.background='var(--primary)'" title="Lihat PDF"><i class="fa-solid fa-eye"></i></a>
                </div>
            </div>`.trim();
    });

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Processed ${file}: Replaced ${matchCount} cards.`);
});
