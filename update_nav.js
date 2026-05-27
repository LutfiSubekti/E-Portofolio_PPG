const fs = require('fs');

const files = [
    'd:/laragon/www/E-Portofolio_PPG/index.html',
    'd:/laragon/www/E-Portofolio_PPG/e-portfolio-1.html',
    'd:/laragon/www/E-Portofolio_PPG/e-portfolio-2.html',
    'd:/laragon/www/E-Portofolio_PPG/modul-ajar.html',
    'd:/laragon/www/E-Portofolio_PPG/hasil-modul-penilaian.html'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Update desktop dropdown links
        content = content.replace(
            /<li><a href="e-portfolio-1\.html#artefak">Analisis Artefak Pembelajaran<\/a><\/li>\s*<li><a href="e-portfolio-1\.html#penilaian">Instrumen Penilaian \(Lampiran 7 &amp; 8\)<\/a><\/li>/g,
            '<li><a href="hasil-modul-penilaian.html">Hasil Modul & Penilaian</a></li>'
        );
        
        // Update mobile links
        content = content.replace(
            /<a href="e-portfolio-1\.html#artefak">Analisis Artefak<\/a>\s*<a href="e-portfolio-1\.html#penilaian">Instrumen Penilaian<\/a>/g,
            '<a href="hasil-modul-penilaian.html">Hasil Modul & Penilaian</a>'
        );
        
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated nav in ${file}`);
    }
});
