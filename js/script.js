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