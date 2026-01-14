// Inisialisasi elemen DOM
document.addEventListener('DOMContentLoaded', function() {
    // Elemen input dan tombol
    const angleInput = document.getElementById('angle');
    const calcSinBtn = document.getElementById('calcSin');
    const calcCosBtn = document.getElementById('calcCos');
    const calcTanBtn = document.getElementById('calcTan');
    const calcAllBtn = document.getElementById('calcAll');
    
    // Elemen hasil
    const sinResult = document.getElementById('sinResult');
    const cosResult = document.getElementById('cosResult');
    const tanResult = document.getElementById('tanResult');
    const angleValue = document.getElementById('angleValue');
    const angleValue2 = document.getElementById('angleValue2');
    const angleValue3 = document.getElementById('angleValue3');
    const angleLabel = document.getElementById('angleLabel');
    
    // Canvas untuk visualisasi segitiga
    const canvas = document.getElementById('triangleCanvas');
    const ctx = canvas.getContext('2d');
    
    // Fungsi untuk mengonversi derajat ke radian
    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    }
    
    // Fungsi untuk menghitung nilai trigonometri
    function calculateTrigonometry(angleDeg) {
        const angleRad = toRadians(angleDeg);
        
        return {
            sin: Math.sin(angleRad),
            cos: Math.cos(angleRad),
            tan: Math.tan(angleRad)
        };
    }
    
    // Fungsi untuk memperbarui hasil
    function updateResults(angleDeg) {
        const results = calculateTrigonometry(angleDeg);
        
        // Perbarui nilai sudut di semua tempat
        angleValue.textContent = angleDeg;
        angleValue2.textContent = angleDeg;
        angleValue3.textContent = angleDeg;
        angleLabel.textContent = angleDeg;
        
        // Perbarui hasil dengan format 4 angka desimal
        sinResult.textContent = results.sin.toFixed(4);
        cosResult.textContent = results.cos.toFixed(4);
        
        // Tangani kasus khusus untuk tan (tak terhingga)
        if (Math.abs(results.tan) > 10000) {
            tanResult.textContent = "∞ (tak terhingga)";
        } else {
            tanResult.textContent = results.tan.toFixed(4);
        }
        
        // Gambar ulang segitiga
        drawTriangle(angleDeg, results);
    }
    
    // Fungsi untuk menggambar segitiga
    function drawTriangle(angleDeg, results) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Parameter untuk segitiga
        const triangleSize = 120;
        const baseX = 50;
        const baseY = canvas.height - 50;
        const angleRad = toRadians(angleDeg);
        
        // Hitung titik-titik segitiga
        // Titik A (sudut siku-siku)
        const ax = baseX;
        const ay = baseY;
        
        // Titik B (sudut di sumbu X)
        const bx = baseX + triangleSize * results.cos;
        const by = baseY;
        
        // Titik C (sudut di sumbu Y)
        const cx = baseX;
        const cy = baseY - triangleSize * results.sin;
        
        // Gambar segitiga
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.lineTo(cx, cy);
        ctx.closePath();
        
        // Warna isian segitiga
        ctx.fillStyle = 'rgba(58, 123, 213, 0.2)';
        ctx.fill();
        
        // Garis luar segitiga
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#3a7bd5';
        ctx.stroke();
        
        // Gambar sudut siku-siku
        ctx.beginPath();
        ctx.moveTo(ax, ay - 10);
        ctx.lineTo(ax + 10, ay - 10);
        ctx.lineTo(ax + 10, ay);
        ctx.closePath();
        ctx.strokeStyle = '#ff7c00';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Gambar busur sudut
        ctx.beginPath();
        ctx.arc(ax, ay, 25, 0, -angleRad, true);
        ctx.strokeStyle = '#ff7c00';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Gambar label sudut
        ctx.fillStyle = '#ff7c00';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(`θ = ${angleDeg}°`, ax + 15, ay - 15);
        
        // Gambar label sisi
        ctx.fillStyle = '#1a2980';
        ctx.font = 'bold 14px Arial';
        
        // Sisi miring (hipotenusa)
        const hypX = (bx + cx) / 2 + 10;
        const hypY = (by + cy) / 2 - 10;
        ctx.fillText('Miring', hypX, hypY);
        
        // Sisi depan (opposite)
        const oppX = (ax + cx) / 2 - 25;
        const oppY = (ay + cy) / 2;
        ctx.fillText('Depan', oppX, oppY);
        
        // Sisi samping (adjacent)
        const adjX = (ax + bx) / 2;
        const adjY = ay + 20;
        ctx.fillText('Samping', adjX, adjY);
    }
    
    
    // Animasi untuk anggota tim
    const members = document.querySelectorAll('.member');
    members.forEach((member, index) => {
        // Tambah delay berbeda untuk setiap anggota
        member.style.animationDelay = `${index * 0.2}s`;
        member.classList.add('animate-member');
    });
    
    // Tambah CSS untuk animasi
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-member {
            animation: fadeInUp 0.5s ease forwards;
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
});