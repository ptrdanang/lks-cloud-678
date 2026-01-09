const supabaseUrl = 'https://csxcdjlkptanafjdrcvp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzeGNkamxrcHRhbmFmamRyY3ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4OTc5MTEsImV4cCI6MjA4MzQ3MzkxMX0.FYqfmVEINxrBuU9_v1wsF1ZcktYokZ5Qde3Ar_ZPkaI';
const clientSupabase = supabase.createClient(supabaseUrl, supabaseKey);

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
    if(apiDiv) {
        apiDiv.innerHTML = `
        <h4>Contoh Data Yang Diambil Secara Acak ID: ${data.id}</h4>
        <strong>Judul:</strong> ${data.title} <br>
        <strong>Isi:</strong> ${data.body.substring (0, 100)}...
        `;
    }
})
.catch(error =>{
    console.error("Terjadi Masalah saat mengambil data API", error);
    const apiDiv = document.getElementById('data-api');
    if(apiDiv) apiDiv.textContent = 'Gagal memuat data API.';
});

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

document.addEventListener('DOMContentLoaded', tampilkanPesan);

async function simpanKeCloud() {
    const namaUser = document.getElementById('input-nama').value;
    const pesanUser = document.getElementById('input-pesan').value;

    if (!namaUser || !pesanUser) {
        alert("Nama dan pesan tidak boleh kosong!");
        return;
    }

    const { data, error } = await supabase
        .from('Pesan')
        .insert([{ nama: namaUser, isi_pesan: pesanUser }]);

    if (error) {
        console.error("Gagal menyimpan data:", error.message);
        alert("Error: " + error.message);
    } else {
        console.log("Data berhasil masuk ke Cloud!");
        alert("Pesan berhasil dikirim!");
        tampilkanPesan();
        document.getElementById('input-nama').value = '';
        document.getElementById('input-pesan').value = '';
    }
}