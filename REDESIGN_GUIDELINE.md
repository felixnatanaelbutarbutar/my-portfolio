# Panduan Redesign Total — Portfolio Felix Natanael Butarbutar

Dokumen ini adalah arahan desain dan implementasi untuk menyegarkan portfolio secara menyeluruh. Gunakan sebagai spesifikasi ketika mulai mengubah UI; dokumen ini sendiri tidak mengubah aplikasi.

**Catatan audit:** panduan ini dicocokkan dengan codebase lokal karena halaman live tidak memberikan konten teks yang bisa dibaca saat pemeriksaan. Lakukan pemeriksaan visual di browser ketika implementasi dimulai.

## 1. Prompt yang sudah diperbaiki

Salin prompt ini ketika meminta redesign website sekaligus implementasinya:

> **Audit website https://felixnatanael.my.id dan codebase portfolio yang sudah ada, lalu redesign total UI dan terapkan langsung pada aplikasi React/Vite ini. Arah visualnya editorial premium: profesional, elegan, hangat, presisi, dan punya karakter personal. Gunakan tipografi yang khas tetapi mudah dibaca, palet warna matang, komposisi asimetris yang rapi, serta animasi halus yang terasa disengaja. Hindari tampilan template AI: gradien mencolok, glassmorphism, glow, kartu membulat berlebihan, dekorasi tanpa fungsi, dan font yang terasa pasaran. Pertahankan informasi, proyek, foto, aset, tautan, dan fungsi yang masih valid; jangan mengarang fakta. Periksa tanggal, angka, statistik, tautan placeholder, dan semua klaim sebelum dipertahankan. Jika ada konflik data, jangan menebak: tandai agar dikonfirmasi dan lanjutkan bagian lain. Pastikan mobile, aksesibilitas, performa, SEO dasar, reduced motion, dan navigasi berfungsi baik. Gunakan stack yang ada dan hindari dependency baru tanpa kebutuhan nyata. Buat atau perbarui file REDESIGN_GUIDELINE.md di root project agar token visual dan keputusan desain terdokumentasi. Setelah implementasi, cek tampilan di mobile, tablet, desktop, keyboard, dan reduced motion; jalankan build serta lint, lalu ringkas perubahan dan hal yang perlu konfirmasi.**

## 2. Arah desain

### Tujuan
- Buat portfolio terasa seperti karya personal seorang engineer yang matang: terkurasi, percaya diri, dan teliti.
- Beri ruang paling besar pada identitas Felix, bukti kerja, dan cerita hasil proyek.
- Gunakan bahasa visual editorial kontemporer, dengan detail teknis yang rapi.
- Buat pengalaman terasa eksklusif lewat kualitas tipografi, grid, ritme, foto, dan interaksi. Jangan bergantung pada efek dekoratif untuk terlihat mahal.

### Karakter yang dicari
**Tenang · hangat · presisi · percaya diri · editorial · manusiawi.**

Hasil harus tetap terasa seperti portfolio personal, bukan website agensi, dashboard SaaS, landing page produk AI, atau template developer portfolio yang bisa dipakai siapa saja.

## 3. Konteks portfolio dan batasan konten

Workspace ini menggunakan React 19, Vite, dan CSS biasa per komponen. Struktur yang ada mencakup Hero, About, Skills, Experience dan Projects, Education, Certificates, Contact, Navbar, serta Footer. Aset proyek dan foto tersedia di folder public/assets/image; CV berada di public/assets/pdf.

### Fakta dan fungsi yang harus dijaga
- Pertahankan nama, peran, riwayat, deskripsi proyek, kredensial, kontak, sosial, dan tautan yang masih valid.
- Gunakan foto dan screenshot proyek yang sudah ada sebagai bukti visual utama. Periksa isi serta kualitas aset sebelum menentukan crop.
- Jangan membuat statistik, hasil bisnis, testimoni, logo klien, kutipan, atau klaim kompetensi baru.
- CV terbaru yang diberikan pengguna menjadi sumber utama untuk tanggal, status, IPK, dan pendidikan: posisi saat ini di PT Bintang Aplikasi Perkasa, IPK IT Del 3.50/4.00, kelulusan IT Del Agustus 2026, serta studi BINUS yang diperkirakan selesai September 2028. Sesuaikan data portfolio lama yang berbeda dengan sumber ini.
- Pertahankan seluruh proyek lama yang masih valid, lalu tambahkan RuangRPP dan GlitchRun dari CV. Portfolio memuat sepuluh proyek terpilih setelah keduanya digabungkan dengan delapan proyek lama.
- Tambahkan Finalist DEL AI Hackathon 2026 dan 3rd Place Coding Day Competition 2025 sebagai kompetisi. Pertahankan pelatihan Dicoding, dan sebut AWS Machine Learning Specialty sebagai pelatihan Udemy sesuai CV, bukan sertifikasi AWS kecuali ada bukti kredensial resmi.
- Validasi klaim hasil yang sudah tertulis (misalnya jumlah pengguna, persentase peningkatan, jumlah modul, dan statistik proyek) terhadap sumber yang dapat dipercaya; jangan menganggap teks lama otomatis benar.
- Pertahankan tautan CV, email, WhatsApp, LinkedIn, GitHub, dan tautan proyek yang benar. Betulkan tautan placeholder atau data yang jelas tidak valid, jangan mengarang tujuan baru.
- Bahasa isi website saat ini dominan Inggris. Pertahankan bahasa Inggris secara konsisten selama redesign; jangan mencampur Inggris dan Indonesia di antarmuka tanpa alasan.
- Pertahankan fungsi slider/lightbox screenshot jika masih digunakan. Tingkatkan akses keyboard, label, dan kontrolnya.
- Jangan menghapus section atau konten penting hanya untuk membuat halaman lebih pendek. Boleh mengubah urutan dan cara presentasinya.

### Perhatian untuk navigasi
Navbar saat ini menunjuk Projects ke #projects, sedangkan Credentials ke #credentials. Proyek berada di dalam Experience, dan ID credentials tidak tampak pada struktur section saat ini. Saat implementasi, cocokkan semua tautan navigasi dengan ID yang benar-benar ada. Satukan Education dan Certificates di bawah label Credentials bila itu membuat navigasi lebih jelas, tetapi jangan biarkan anchor mengarah ke elemen yang tidak ada.

## 4. Sistem visual

### Palet dasar yang disarankan
Gunakan palet terbatas dengan permukaan matte. Nilai ini adalah titik awal dan boleh disetel sedikit setelah melihat aset foto; pertahankan kontras dan karakter hangatnya.

| Token | Nilai awal | Pemakaian |
|---|---|---|
| paper | #F3F0E8 | Latar utama hangat |
| paper-light | #FAF8F3 | Permukaan terang untuk variasi section |
| ink | #23231F | Teks utama dan area gelap |
| ink-soft | #4D4B45 | Teks sekunder yang tetap terbaca |
| muted | #6B675F | Metadata, caption, tanggal di atas latar terang |
| line | #D8D2C7 | Garis pemisah tipis |
| accent | #8B4637 | Aksen terracotta/oksida, gunakan hemat |
| accent-soft | #E8D9D0 | Latar aksen sesekali |
| dark-surface | #292B26 | Satu bidang gelap untuk kontras, bila perlu |
| dark-muted | #C2BCAF | Metadata di atas dark-surface |
| accent-on-dark | #D3A08E | Aksen teks/tautan di atas dark-surface |

Aturan warna:
- Sekitar 75–85% halaman tetap netral. Aksen hanya menandai tautan, nomor, status, dan detail kecil.
- Hindari gradient sebagai latar utama, neon, ungu-biru generik, emas metalik, efek glow, serta warna aksen berbeda di setiap section.
- Jangan gunakan teks muted untuk paragraf penting. Jaga kontras untuk semua ukuran teks.
- Variasi visual antar-section datang dari komposisi, foto, skala tipografi, dan pergantian bidang terang/gelap yang jarang—bukan pergantian warna ramai.
- Pastikan teks biasa mencapai rasio kontras minimal 4.5:1 dan teks besar serta indikator kontrol minimal 3:1. Gunakan dark-muted dan accent-on-dark hanya di atas dark-surface; jangan gunakan muted di atas dark-surface atau accent-soft.
- Garis line boleh berkontras rendah jika hanya dekoratif. Untuk batas input, tombol, atau kontrol yang dibutuhkan agar berfungsi, gunakan batas yang cukup terlihat.

### Garis, sudut, dan permukaan
- Gunakan garis 1px yang lembut hanya untuk memisahkan informasi atau membangun grid editorial.
- Jangan membungkus setiap item dalam card. Pilih daftar editorial, kolom terbuka, garis horizontal, dan bidang foto.
- Sudut elemen umumnya tegas atau sedikit lembut (0–8px). Hindari pill besar dan radius seragam di semua komponen.
- Hindari glassmorphism, blur panel, drop shadow tebal, border dekoratif ganda, dan ornamen yang tidak membantu pemahaman.
- Gunakan bayangan hanya saat elemen memang melayang atau butuh pemisahan; bayangannya harus nyaris tak terlihat.

### Tipografi
Arah utama: serif editorial dengan bentuk khas untuk headline, dipasangkan dengan sans yang presisi dan mudah dibaca untuk isi.

- Pasangan awal yang disarankan: **Newsreader** untuk display/heading dan **IBM Plex Sans** untuk body, navigasi, serta UI.
- Jika pemeriksaan visual menunjukkan Newsreader terlalu klasik, uji **Instrument Serif** sebagai alternatif display. Jangan memakai kedua serif display sekaligus.
- Batasi sistem ke dua keluarga font utama. Utamakan font WOFF2 yang di-host sendiri bila lisensinya mengizinkan; jika memuat font eksternal, gunakan font-display: swap, muat hanya bobot yang dipakai, dan sediakan fallback lokal yang layak (Georgia, system-ui, sans-serif).
- Pilih bobot regular/medium; hindari bobot ekstra tebal di semua judul. Gunakan italic sebagai aksen editorial yang jarang.
- Pakai uppercase dan tracking lebar hanya untuk label kecil, bukan paragraf atau judul panjang.
- Pastikan panjang baris isi nyaman dibaca, sekitar 55–75 karakter pada desktop.

Skala awal responsif:

| Peran | Ukuran desktop | Catatan |
|---|---:|---|
| Hero name | clamp(3.5rem, 9vw, 8rem) | Besar, rapat, line-height sekitar 0.9–1.0 |
| Section heading | clamp(2.5rem, 5vw, 5rem) | Serif, ritme konsisten |
| Project heading | clamp(1.6rem, 3vw, 2.7rem) | Hindari headline terlalu panjang |
| Body | 1rem–1.125rem | Line-height 1.55–1.75 |
| Metadata | 0.75rem–0.875rem | Kontras tetap memadai |

### Grid, ruang, dan ritme
- Batasi lebar konten utama sekitar 1180–1320px, dengan gutter responsif sekitar 24–64px.
- Bangun grid 12 kolom di desktop dengan kolom asimetris; jangan membuat semua section berupa tumpukan tengah yang identik.
- Gunakan ruang kosong besar secara terencana, terutama di hero dan transisi antarbab.
- Pakai skala jarak berbasis 4/8px. Jaga jarak section desktop sekitar 112–176px dan kurangi bertahap pada layar lebih kecil.
- Sejajarkan label, judul, foto, dan metadata pada garis grid yang konsisten.

## 5. Struktur halaman dan arahan tiap bagian

Urutan di bawah adalah rekomendasi editorial. Sesuaikan urutan komponen di aplikasi bila perlu; semua fakta dan kemampuan yang berguna harus tetap bisa ditemukan.

### A. Navbar
- Buat navbar ringan dan ringkas, dengan wordmark/monogram FN yang sederhana.
- Pada desktop, tampilkan About, Work/Projects, Credentials, dan Contact. Jangan membuat menu terlalu panjang.
- Gunakan latar transparan atau paper yang solid dengan garis halus saat halaman digulir; hindari pill mengambang ala dashboard.
- Status aktif harus mudah diketahui tanpa warna neon.
- Pada mobile, menu harus mudah dibuka/ditutup, fokus keyboard terkelola, dan tidak mengunci scroll setelah ditutup.

### B. Hero
- Hero langsung mengenalkan Felix: nama, fokus kerja, lokasi, dan satu kalimat value proposition yang spesifik.
- Pertahankan komposisi dua sisi: identitas tipografis di satu sisi dan potret asli dengan crop editorial di sisi lain. Pada layar kecil, susun ulang tanpa membuat potret atau CTA hilang jauh di bawah.
- Tampilkan satu CTA utama (View selected work) dan satu CTA sekunder untuk CV atau kontak.
- Gunakan foto profil yang tersedia, bukan avatar ilustrasi atau gambar stok. Hindari filter berat; sesuaikan crop dan latar seperlunya.
- Letakkan lokasi, availability, atau caption foto sebagai detail kecil jika faktanya masih benar.
- Jangan gunakan custom cursor, headline typing effect, ticker tak berujung, partikel, atau animasi hero yang menghambat membaca nama.

### C. Selected work / Projects
- Bawa bukti kerja naik mendekati hero. Tampilkan dua proyek unggulan sebagai studi kasus visual editorial: **IELTS Speaking Evaluation System** dan **IT Del Student Information System**, sesuai data yang sudah ada.
- Gunakan screenshot proyek yang tepat, bukan mockup generik. Buat satu gambar dominan per proyek; detail tambahan bisa tersedia lewat slider/lightbox yang terkontrol.
- Setiap proyek menyebut peran, waktu, masalah/tujuan, kontribusi, teknologi, dan tautan yang benar-benar tersedia. Sorot hasil hanya jika ada bukti pada konten sekarang.
- Variasikan layout dua proyek unggulan secara halus (misalnya gambar kiri lalu kanan), bukan kartu duplikat.
- Proyek lain bisa disajikan sebagai daftar grid terbuka yang ringkas dengan judul, tahun, peran, dan teknologi inti.
- Beri ruang gambar yang konsisten dan crop yang tidak memotong informasi penting pada screenshot.

### D. About
- Ceritakan posisi Felix lintas full-stack development dan applied AI/ML dengan nada lugas, bukan slogan.
- Pertahankan klaim pengalaman dengan INaAI, PT Teknologi Cerdas Berdaulat Indonesia, PT AOKI MORI INDONESIA, Mayora Indah, serta proyek relevan sesuai isi asli.
- Hindari daftar kata sifat seperti “passionate, innovative, results-driven” tanpa bukti.
- Gunakan angka dari CV terbaru setelah diverifikasi: IPK 3.50/4.00, sepuluh proyek terpilih, dan tiga pengalaman profesional. Jangan mengembalikan statistik portfolio lama yang sudah digantikan.

### E. Skills / capabilities
- Kelompokkan skill sesuai kategori yang benar-benar ada di data (misalnya AI/ML, development, tools/platforms).
- Tampilkan sebagai tipografi dan daftar, bukan kumpulan chip berwarna-warni.
- Hindari bar persentase kemampuan, rating bintang, dan klaim tingkat keahlian yang dibuat-buat.
- Gunakan ikon hanya bila membantu pengenalan; samakan gaya dan ukuran ikon.

### F. Experience
- Sajikan riwayat kerja dengan struktur kronologis yang mudah dipindai: peran dan organisasi jelas, tanggal serta lokasi menjadi metadata.
- Pisahkan ringkasan dari 2–4 butir kontribusi yang konkret. Utamakan kalimat aktif dan istilah yang dapat dipahami pembaca nonteknis.
- Gunakan garis/timeline tipis jika membantu, bukan node besar dan dekoratif.
- Jangan menggandakan deskripsi proyek yang sudah ditampilkan di Selected Work; referensikan detail proyek dari kartu unggulan.

### G. Education & Certificates
- Gabungkan di bawah satu kelompok navigasi Credentials bila alur lebih jelas, tetapi bedakan pendidikan formal dan sertifikasi secara visual.
- Pertahankan nama institusi, gelar, periode, nilai, penerbit sertifikat, dan tautan bukti yang benar.
- Tinjau status pendidikan dan semua tanggal sebelum publikasi. Jangan mengganti “Expected” menjadi “Graduated” tanpa verifikasi.
- Sertifikat tidak perlu logo besar berulang atau panel terpisah untuk setiap item; gunakan daftar ringkas dan tautan verifikasi.

### H. Competitions & recognition
- Tampilkan dua capaian kompetisi dari CV: Finalist DEL AI Hackathon 2026 dan 3rd Place Coding Day Competition 2025.
- Gunakan daftar terbuka dengan peringkat, nama kompetisi, penyelenggara/cakupan, dan tahun. Jangan membuat tautan bukti jika CV tidak menyediakannya.

### I. Contact
- Akhiri halaman dengan CTA yang jelas dan personal, misalnya undangan membicarakan proyek atau kolaborasi.
- Tampilkan email sebagai jalur utama. WhatsApp dan profil sosial adalah opsi sekunder.
- Gunakan tautan semantik (mailto:, tel:, URL tujuan) dan indikator hover/focus yang jelas.
- Jangan menampilkan form kontak seolah berfungsi jika belum ada pengiriman di baliknya.

### J. Footer
- Pertahankan footer sederhana: nama/monogram, beberapa tautan, sosial relevan, dan tahun otomatis.
- Hapus kutipan motivasi rotasi dan tautan placeholder. Jangan gunakan atribusi kutipan yang tidak diverifikasi.
- Pastikan semua link footer menuju ID atau URL yang benar.

## 6. Motion dan interaksi

Gerakan harus memberi respons atau membantu orientasi. Ritme default tenang dan singkat.

- Hero boleh masuk bertahap dalam 400–800ms secara total; hindari jeda panjang sebelum teks utama muncul.
- Reveal saat scroll: opacity dan gerak vertikal kecil (sekitar 8–18px), durasi kira-kira 350–600ms. Jalankan sekali per elemen, dengan stagger pendek untuk kelompok.
- Hover link: perubahan warna, garis bawah yang tumbuh, atau pergeseran panah 2–4px. Jaga feedback sekitar 150–250ms.
- Hover gambar: zoom sangat kecil (maksimum sekitar 1.02) bila crop tetap aman. Jangan menambahkan glow atau parallax yang kuat.
- Slider/lightbox harus dapat dikontrol dengan keyboard, tombol yang berlabel, dan close yang jelas. Jangan autoplay screenshot.
- Hormati prefers-reduced-motion; nonaktifkan gerak dekoratif dan pertahankan transisi yang hanya membantu status.
- Jangan menganimasikan banyak properti layout secara terus menerus. Hindari scroll hijacking, canvas background, cursor khusus, efek teks berkedip, dan elemen yang bergerak tanpa input.

## 7. Responsivitas

- Rancang mulai dari desktop editorial, lalu sederhanakan grid untuk tablet dan mobile; jangan hanya mengecilkan layout desktop.
- Pada tablet, pertahankan hirarki heading dan rasio gambar, kurangi kolom sebelum teks terlalu sempit.
- Pada mobile, gunakan satu kolom, gutter 20–24px, urutan baca alami, dan tombol dengan target sentuh setidaknya 44×44px.
- Hindari overflow horizontal, teks hero terpotong, gambar besar yang mendorong CTA jauh ke bawah, atau navbar yang menutupi anchor.
- Pastikan screenshot proyek tetap bisa dibaca atau dibuka penuh pada layar kecil.

## 8. Aksesibilitas dan performa

- Gunakan landmark semantik, satu h1, hierarki heading berurutan, label link yang bermakna, dan alt text deskriptif.
- Semua navigasi, menu, kontrol slider/lightbox, dan tombol harus bisa dijangkau serta digunakan dengan keyboard. Sediakan focus ring yang terlihat.
- Jaga kontras teks dan kontrol yang memadai di atas seluruh variasi latar.
- Jangan menyampaikan status hanya lewat warna atau gerak.
- Hormati reduced motion dan zoom teks browser.
- Gunakan gambar lokal yang sesuai, tetapkan rasio/aspek agar layout stabil, lazy-load konten di bawah fold, dan kompres aset besar bila aman.
- Audit screenshot berukuran besar; buat ukuran/resolusi yang sesuai untuk tampilan web tanpa menimpa file sumber. Prioritaskan format modern jika kompatibel dan pertahankan versi fallback.
- Hindari pustaka animasi tambahan jika CSS dan API browser yang tersedia sudah cukup.
- Jangan menambahkan JavaScript pihak ketiga yang tidak diperlukan ke dalam render tree React.

## 9. SEO, metadata, dan script eksternal

- Ganti judul dokumen generik dengan judul portfolio yang menyebut nama Felix dan fokus profesionalnya. Tulis meta description yang ringkas dan faktual.
- Tambahkan Open Graph dan Twitter/X card metadata dengan gambar preview yang berasal dari aset portfolio yang sah. Pastikan crop dan teks preview terbaca.
- Tetapkan canonical URL hanya setelah memastikan domain produksi yang dipilih; situs saat ini mengalihkan ke versi www.
- Perbaiki deklarasi favicon: index.html saat ini menyatakan tipe SVG untuk file mylogo.png. Gunakan tipe dan path yang sesuai dengan file sebenarnya.
- Pertahankan bahasa dokumen Inggris selama isi antarmuka berbahasa Inggris, serta pastikan title, description, dan metadata sosial konsisten.
- Audit script Google AdSense yang saat ini dimuat di index.html dan App.jsx. Pastikan monetisasi memang disengaja; jika tetap dipakai, muat satu kali dengan mekanisme yang sesuai dan periksa dampaknya ke performa. Hapus hanya bila sudah dipastikan tidak dibutuhkan.
- Tambahkan structured data hanya untuk fakta yang terverifikasi dan cocok dengan isi halaman.

## 10. Hal yang harus dihindari

- Template AI developer: latar navy/ungu dengan aurora gradient, terminal dekoratif, grid bercahaya, atau banyak angka floating.
- Glass card, blur, glow, chrome 3D, noise/grain yang mengganggu, dan efek paralaks berlapis.
- Semua bagian memakai judul, kartu, ikon, dan grid yang persis sama.
- Border di setiap sisi setiap kartu, radius besar seragam, shadow gelap, serta kumpulan badge/pill yang memenuhi layar.
- Font Inter/Roboto sebagai satu-satunya identitas tipografi, atau terlalu banyak keluarga font display.
- Emoji sebagai ikon antarmuka, ikon campuran, placeholder foto, dan mockup produk yang tidak ada.
- Angka animasi, progress bar skill, testimonial rekaan, klaim dampak tanpa bukti, teks filler, atau label available yang tidak dikonfirmasi.
- Animasi yang terus berulang dan mengambil perhatian dari isi.

## 11. Aturan implementasi dan kriteria selesai

Saat panduan ini diterapkan ke aplikasi:

1. Audit konten, tautan, aset, anchor, dan data yang sensitif terhadap waktu sebelum mengubah layout.
2. Bangun token warna, tipografi, spacing, ukuran container, garis, dan motion sebagai sistem bersama; hindari nilai acak per komponen.
3. Pertahankan stack React/Vite/CSS yang ada kecuali ada alasan teknis konkret untuk mengubahnya.
4. Reuse komponen dan aset yang sesuai. Jaga struktur data konten tetap terpisah dari markup presentasi bila itu membantu perawatan.
5. Perbaiki navigasi dan ketidaksesuaian anchor; jangan tinggalkan tautan mati atau placeholder.
6. Periksa tampilan setidaknya pada lebar mobile, tablet, dan desktop, termasuk menu terbuka dan lightbox.
7. Periksa reduced motion, keyboard focus, loading gambar, kontras, line wrapping, serta konsistensi semua section.

### Checklist visual akhir

- [ ] Nama dan fokus kerja terlihat jelas saat halaman pertama dibuka.
- [ ] Portfolio terasa hangat, editorial, terkurasi, dan khas Felix.
- [ ] Proyek unggulan mudah ditemukan dan memakai bukti visual asli.
- [ ] Warna, font, garis, radius, jarak, dan gerak mengikuti satu sistem.
- [ ] Tidak ada gradient/glow/glass/dekorasi generik yang mengambil perhatian.
- [ ] Tidak ada fakta, angka, tautan, tanggal, atau testimoni yang dikarang.
- [ ] Semua bagian tetap mudah dipindai dan navigasinya berfungsi.
- [ ] Layout nyaman di mobile dan kontrol bisa digunakan dengan keyboard.
- [ ] Motion lembut dan tetap nyaman saat reduced motion aktif.
- [ ] Foto/screenshot tajam, crop tepat, dan tidak menyebabkan layout bergeser.

