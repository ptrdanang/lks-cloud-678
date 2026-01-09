// 1. Inisialisasi Supabase (HANYA SEKALI DI ATAS)
const supabaseUrl = 'https://link-proyek-anda.supabase.co'; // Ganti dengan URL Anda
const supabaseKey = 'masukkan-anon-key-anda'; // Ganti dengan Anon Key Anda
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 2. Logging Bawaan LKS
console.log("Aplikasi Beranda LKS Cloud Dimuat (index.html)");
console.log("Memulai Proses fetch data untuk fitur dinamis");

// 3. Fitur Fetch API JSONPlaceholder (Kode Asli Anda)
const randomId = Math.floor(Math.random() * 100) + 1;

fetch(`https://jsonplaceholder.typicode.com/posts/${randomId}`)
.then(Response =>{
    console.log(`Data API ID ${randomId} Berhasil Diterima. Status:`, Response.status)
    return Response.json()
})
.then(data =>{
    const apiDiv = document.getElementById('data-api')
    apiDiv.innerHTML = `
    <h4>Contoh Data Yang Diambil Secara Acak ID: ${data.id}</h4>
    <strong>Judul:</strong> ${data.title} <br>
    <strong>Isi:</strong> ${data.body.substring (0, 100)}...
    `
})
.catch(error =>{
    console.error("Terjadi Masalah saat mengambil data API", error);
    const apiDiv = document.getElementById('data-api');
    if(apiDiv) apiDiv.textContent = 'Gagal memuat data API.';
});

// 4. Fitur Baru: Menampilkan Pesan dari Cloud Database
async function tampilkanPesan() {
    const { data, error } = await supabase
        .from('Pesan')
        .select('*')
        .order('id', { ascending: false });

    const pesanDiv = document.getElementById('daftar-pesan');
    if (!pesanDiv) return;

    if (error) {
        console.error("Gagal mengambil data:", error.message);
        return;
    }

    pesanDiv.innerHTML = ''; 
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.borderLeft = '5px solid #3498db';
        card.innerHTML = `
            <h4>${item.nama}</h4>
            <p>${item.isi_pesan}</p>
        `;
        pesanDiv.appendChild(card);
    });
}

// Jalankan saat halaman siap
document.addEventListener('DOMContentLoaded', tampilkanPesan);