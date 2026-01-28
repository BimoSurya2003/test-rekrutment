- Frontend  = ReactJS
- Backend   = NestJS
- Database  = MySQL

## Penjelasan Konsep

### 1. Apa itu REST API?
REST API adalah cara bagi aplikasi untuk saling berkomunikasi lewat internet. Frontend bisa meminta data dari backend, atau mengirim data ke backend,
menggunakan metode HTTP seperti GET (ambil data), POST (kirim data), PUT (ubah data), dan DELETE (hapus data). Biasanya data yang dikirim/diterima berbentuk JSON.

### 2. Apa itu CORS dan bagaimana cara menanganinya di backend?
CORS (Cross-Origin Resource Sharing) adalah aturan di browser yang mencegah website mengambil data dari domain lain tanpa izin. Kalau backend sudah mengizinkan, browser akan membolehkan request.  
Di backend, kita bisa mengatur CORS dengan menambahkan header `Access-Control-Allow-Origin`.


### 3. Apa perbedaan SQL dan NoSQL?
SQL (Relational Database)
- Data disimpan dalam tabel dengan baris dan kolom.
- Skema harus jelas dulu sebelum data dimasukkan.
- Bagus untuk data yang terstruktur dan konsisten.
Contoh: MySQL, PostgreSQL, Oracle.

NoSQL (Non-Relational Database)
- Data lebih fleksibel, bisa berupa dokumen, key-value, atau graph.
- Skema bisa berubah-ubah sesuai kebutuhan.
- Cocok untuk data yang besar, dinamis, atau tidak terstruktur.
Contoh: MongoDB, Firebase, Cassandra.

Intinya: SQL itu rapi dan terstruktur, sedangkan NoSQL itu fleksibel dan scalable.

### 4. Apa itu Middleware?
Middleware itu fungsi yang jalan di antara request dan response di backend. Fungsinya macam-macam, misalnya:
- Ngecek apakah user sudah login.
- Mencatat aktivitas atau log.
- Nanganin error sebelum dikirim ke client.

Intinya, middleware itu semacam pos penjaga yang ngecek atau ngatur request sebelum sampai ke tujuan.
