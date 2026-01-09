
const supabaseUrl = 'https://csxcdjlkptanafjdrcvp.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzeGNkamxrcHRhbmFmamRyY3ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4OTc5MTEsImV4cCI6MjA4MzQ3MzkxMX0.FYqfmVEINxrBuU9_v1wsF1ZcktYokZ5Qde3Ar_ZPkaI'; 
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

console.log("Aplikasi Beranda LKS Cloud Dimuat (index.html)");
console.log("Memulai Proses fetch data untuk fitur dinamis");

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
    document.getElementById('data-api').textContent = 'Gagal memuat data API.';
})

async function tampilkanPesan() {
    const { data, error } = await supabase
        .from('Pesan')
        .select('*')
        .order('id', { ascending: false });

    const pesanDiv = document.getElementById('daftar-pesan');
    if (!pesanDiv) return;

    if (error) {
        console.error("Gagal mengambil data database:", error.message);
        pesanDiv.innerHTML = "<p>Gagal memuat data dari Cloud.</p>";
        return;
    }

    if (data.length === 0) {
        pesanDiv.innerHTML = "<p>Belum ada data di database.</p>";
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

document.addEventListener('DOMContentLoaded', tampilkanPesan);