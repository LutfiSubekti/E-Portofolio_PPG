const fs = require('fs');

const files = [
    'd:/laragon/www/E-Portofolio_PPG1/course-ct.html',
    'd:/laragon/www/E-Portofolio_PPG1/course-filosofi.html',
    'd:/laragon/www/E-Portofolio_PPG1/course-growth.html',
    'd:/laragon/www/E-Portofolio_PPG1/course-pemahaman.html',
    'd:/laragon/www/E-Portofolio_PPG1/course-pembelajaran.html',
    'd:/laragon/www/E-Portofolio_PPG1/course-selektif.html'
];

const replacement = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; margin-top: 1rem;">
                    <div style="background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: 12px; padding: 1.5rem; text-align: center; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,0,0,0.05);" onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.transform='translateY(-5px)';" onmouseout="this.style.background='rgba(255,255,255,0.05)'; this.style.transform='translateY(0)';">
                        <i class="fa-solid fa-file-pdf" style="font-size: 3rem; color: #e2574c; margin-bottom: 1rem;"></i>
                        <h4 style="font-size: 1rem; margin-bottom: 0.5rem; color: var(--primary-light);">Dokumen Artefak.pdf</h4>
                        <p style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 1rem;">Format: PDF</p>
                        <a href="#" target="_blank" style="display: inline-block; padding: 0.5rem 1.5rem; background: var(--primary); color: white; border-radius: 50px; text-decoration: none; font-size: 0.85rem; font-weight: 500; transition: background 0.3s ease;" onmouseover="this.style.background='var(--primary-dark)'" onmouseout="this.style.background='var(--primary)'"><i class="fa-solid fa-eye" style="margin-right: 0.3rem;"></i> Lihat PDF</a>
                    </div>
                </div>`;

const regex = /<div\s+style="padding:\s*1\.5rem;\s*background:\s*rgba\(0,0,0,0\.1\);\s*border-radius:\s*8px;\s*border:\s*1px\s*dashed\s*var\(--glass-border\);\s*text-align:\s*center;">[\s\S]*?<p\s+style="color:\s*var\(--text-muted\);"><i\s+class="fa-solid\s+fa-file-circle-plus"[\s\S]*?Belum\s+ada\s+artefak\s+yang\s+diunggah\.<\/p>\s*<\/div>/g;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let count = 0;
        
        content = content.replace(regex, (match) => {
            count++;
            return replacement;
        });
        
        if (count > 0) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated ${file}: replaced ${count} occurrences.`);
        } else {
            console.log(`No matches found in ${file}.`);
        }
    } catch (e) {
        console.error(`Error processing ${file}: ${e.message}`);
    }
});
