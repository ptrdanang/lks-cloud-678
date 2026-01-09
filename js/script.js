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

async function kirimDataKeSupabase() {
    const { data, error } = await supabase
        .from('Pesan')
        .insert([
            { 
                nama: 'Walidi Danang', 
                isi_pesan: 'Tes koneksi database cloud' 
            }
        ]);

    if (error) {
        console.error("Gagal mengirim:", error.message);
    } else {
        console.log("Data berhasil masuk ke Cloud!");
    }
}