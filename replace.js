const fs = require('fs');

const path = 'd:/laragon/www/E-Portofolio_PPG/e-portfolio-1.html';
let content = fs.readFileSync(path, 'utf8');

const startMarker = '        <!-- 2. Analisis Artefak Pembelajaran -->';
const endMarker = '        <!-- 4. Model Guru -->';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const before = content.substring(0, startIndex);
    const after = content.substring(endIndex);
    
    const newSection = `        <!-- 2. Analisis Artefak & Penilaian -->
        <section id="artefak-penilaian">
            <div class="section-header">
                <span class="section-subtitle">Bagian 2 & 3</span>
                <h2 class="section-title">Analisis Artefak & Penilaian GP</h2>
            </div>

            <div class="glass-card" style="text-align: center; padding: 3rem 2rem; max-width: 800px; margin: 0 auto; margin-bottom: 4rem;">
                <i class="fa-solid fa-folder-open" style="font-size: 4rem; color: var(--primary-light); margin-bottom: 1.5rem;"></i>
                <h3 style="font-size: 1.8rem; margin-bottom: 1rem;">Hasil Modul Ajar dan Instrumen Penilaian</h3>
                <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 1.05rem; line-height: 1.6;">
                    Untuk melihat secara detail Modul Ajar Analisis Data dan Hasil Evaluasi Instrumen Penilaian dari Guru Pamong selama PPL Terbimbing, silakan kunjungi halaman khusus pratinjau dokumen.
                </p>
                <a href="hasil-modul-penilaian.html" class="btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 1.1rem; box-shadow: 0 10px 20px rgba(79,70,229,0.3);">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Lihat Hasil Modul & Penilaian
                </a>
            </div>
        </section>

`;
    
    content = before + newSection + after;
    
    // Also remove the JS part
    const jsStartMarker = '        // ============================================\n        //  LAMPIRAN 7 - Instrumen Penilaian GP (Static PDF)\n        // ============================================';
    const jsEndMarker = '    </script>';
    
    const jsStartIndex = content.indexOf(jsStartMarker);
    const jsEndIndex = content.lastIndexOf(jsEndMarker);
    
    if (jsStartIndex !== -1 && jsEndIndex !== -1) {
        const jsBefore = content.substring(0, jsStartIndex);
        const jsAfter = content.substring(jsEndIndex);
        content = jsBefore + jsAfter;
    }
    
    fs.writeFileSync(path, content, 'utf8');
    console.log("Successfully replaced sections.");
} else {
    console.log("Could not find markers.");
}
