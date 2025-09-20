// DOM Elements
const generatorTab = document.getElementById('generatorTab');
const readerTab = document.getElementById('readerTab');
const generatorSection = document.getElementById('generatorSection');
const readerSection = document.getElementById('readerSection');
const qrType = document.getElementById('qrType');
const dynamicFields = document.getElementById('dynamicFields');
const generateBtn = document.getElementById('generateBtn');
const qrResult = document.getElementById('qrResult');
const downloadBtn = document.getElementById('downloadBtn');
const cameraBtn = document.getElementById('cameraBtn');
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const scanResult = document.getElementById('scanResult');
const resultText = document.getElementById('resultText');
const copyBtn = document.getElementById('copyBtn');

// QR Code Scanner Instance
let html5QrcodeScanner = null;

// Tab Switching Logic
generatorTab.addEventListener('click', () => {
    generatorTab.classList.add('active');
    readerTab.classList.remove('active');
    generatorSection.classList.remove('hidden');
    readerSection.classList.add('hidden');
    if (html5QrcodeScanner) {
        html5QrcodeScanner.clear();
    }
});

readerTab.addEventListener('click', () => {
    readerTab.classList.add('active');
    generatorTab.classList.remove('active');
    readerSection.classList.remove('hidden');
    generatorSection.classList.add('hidden');
});

// Dynamic Input Fields Configuration
const inputConfigs = {
    url: [
        { label: 'URL', type: 'url', id: 'urlInput', placeholder: 'https://example.com' }
    ],
    text: [
        { label: 'Teks', type: 'text', id: 'textInput', placeholder: 'Masukkan teks...' }
    ],
    wifi: [
        { label: 'Nama Jaringan (SSID)', type: 'text', id: 'ssidInput', placeholder: 'Nama WiFi' },
        { label: 'Password', type: 'password', id: 'passwordInput', placeholder: 'Password WiFi' },
        { label: 'Tipe Keamanan', type: 'select', id: 'securityInput', options: [
            { value: 'WPA', label: 'WPA/WPA2' },
            { value: 'WEP', label: 'WEP' },
            { value: 'nopass', label: 'Tanpa Password' }
        ]}
    ],
    contact: [
        { label: 'Nama', type: 'text', id: 'nameInput', placeholder: 'Nama Lengkap' },
        { label: 'Telepon', type: 'tel', id: 'phoneInput', placeholder: 'Nomor Telepon' },
        { label: 'Email', type: 'email', id: 'emailInput', placeholder: 'Email' },
        { label: 'Alamat', type: 'text', id: 'addressInput', placeholder: 'Alamat' }
    ],
    email: [
        { label: 'Alamat Email', type: 'email', id: 'emailInput', placeholder: 'email@example.com' },
        { label: 'Subjek', type: 'text', id: 'subjectInput', placeholder: 'Subjek Email' },
        { label: 'Isi Pesan', type: 'textarea', id: 'bodyInput', placeholder: 'Isi pesan email...' }
    ],
    phone: [
        { label: 'Nomor Telepon', type: 'tel', id: 'phoneInput', placeholder: '+62xxx' }
    ]
};

// Generate Dynamic Input Fields
function updateDynamicFields(type) {
    dynamicFields.innerHTML = '';
    const fields = inputConfigs[type];
    
    fields.forEach(field => {
        const div = document.createElement('div');
        div.className = 'mb-4';
        
        const label = document.createElement('label');
        label.className = 'block text-sm font-medium mb-2';
        label.textContent = field.label;
        
        let input;
        if (field.type === 'select') {
            input = document.createElement('select');
            field.options.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option.value;
                opt.textContent = option.label;
                input.appendChild(opt);
            });
        } else if (field.type === 'textarea') {
            input = document.createElement('textarea');
            input.rows = 3;
        } else {
            input = document.createElement('input');
            input.type = field.type;
        }
        
        input.id = field.id;
        input.className = 'w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500';
        input.placeholder = field.placeholder;
        
        div.appendChild(label);
        div.appendChild(input);
        dynamicFields.appendChild(div);
    });
}

// Initialize with URL type
qrType.addEventListener('change', () => {
    updateDynamicFields(qrType.value);
    qrResult.classList.add('hidden');
});
updateDynamicFields('url');

// Generate QR Code
function generateQRData() {
    const type = qrType.value;
    let data = '';
    
    switch(type) {
        case 'url':
            data = document.getElementById('urlInput').value;
            break;
        case 'text':
            data = document.getElementById('textInput').value;
            break;
        case 'wifi':
            const ssid = document.getElementById('ssidInput').value;
            const password = document.getElementById('passwordInput').value;
            const security = document.getElementById('securityInput').value;
            data = `WIFI:S:${ssid};T:${security};P:${password};;`;
            break;
        case 'contact':
            const name = document.getElementById('nameInput').value;
            const phone = document.getElementById('phoneInput').value;
            const email = document.getElementById('emailInput').value;
            const address = document.getElementById('addressInput').value;
            data = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${phone}\nEMAIL:${email}\nADR:${address}\nEND:VCARD`;
            break;
        case 'email':
            const emailAddr = document.getElementById('emailInput').value;
            const subject = document.getElementById('subjectInput').value;
            const body = document.getElementById('bodyInput').value;
            data = `mailto:${emailAddr}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            break;
        case 'phone':
            data = `tel:${document.getElementById('phoneInput').value}`;
            break;
    }
    return data;
}

generateBtn.addEventListener('click', () => {
    const data = generateQRData();
    if (!data) {
        alert('Mohon isi semua field yang diperlukan');
        return;
    }
    
    const qrcodeDiv = document.getElementById('qrcode');
    qrcodeDiv.innerHTML = '';
    
    qrcodeDiv.innerHTML = '';
    new QRCode(qrcodeDiv, {
        text: data,
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    qrResult.classList.remove('hidden');
    qrResult.classList.add('fade-in');
});

// Download QR Code
downloadBtn.addEventListener('click', () => {
    const canvas = document.querySelector('#qrcode canvas');
    if (canvas) {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL();
        link.click();
    } else {
        const qrImage = document.querySelector('#qrcode img');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = qrImage.width;
        canvas.height = qrImage.height;
        ctx.drawImage(qrImage, 0, 0);
        
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL();
        link.click();
    }
});

// Reset form untuk membuat QR baru
document.getElementById('newQRBtn').addEventListener('click', () => {
    qrResult.classList.add('hidden');
    const inputs = dynamicFields.querySelectorAll('input, select, textarea');
    inputs.forEach(input => input.value = '');
    document.getElementById('qrcode').innerHTML = '';
});

// QR Code Reader
let html5QrCode;

cameraBtn.addEventListener('click', async () => {
    if (html5QrCode && html5QrCode.isScanning) {
        await html5QrCode.stop();
        cameraBtn.textContent = 'Buka Kamera';
        document.getElementById('reader').innerHTML = '';
        return;
    }

    try {
        html5QrCode = new Html5Qrcode("reader");
        const cameras = await Html5Qrcode.getCameras();
        
        if (cameras && cameras.length) {
            let selectedCamera = cameras[0].id;
            
            const backCamera = cameras.find(camera => 
                camera.label.toLowerCase().includes('back') || 
                camera.label.toLowerCase().includes('belakang') ||
                camera.label.toLowerCase().includes('rear') ||
                camera.label.includes('0')
            );
            
            if (backCamera) {
                selectedCamera = backCamera.id;
            }

            if (cameras.length > 1) {
                const readerElement = document.getElementById('reader');
                const switchButton = document.createElement('button');
                switchButton.className = 'absolute top-4 right-4 p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10';
                switchButton.innerHTML = `
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                `;
                
                let currentCameraIndex = cameras.findIndex(camera => camera.id === selectedCamera);
                
                switchButton.onclick = async () => {
                    await html5QrCode.stop();
                    currentCameraIndex = (currentCameraIndex + 1) % cameras.length;
                    startScanning(cameras[currentCameraIndex].id);
                };
                
                readerElement.style.position = 'relative';
                readerElement.appendChild(switchButton);
            }

            cameraBtn.textContent = 'Tutup Kamera';
            await startScanning(selectedCamera);
        }
    } catch (err) {
        alert('Error saat mengakses kamera: ' + err);
    }
});

async function startScanning(cameraId) {
    try {
        await html5QrCode.start(
            cameraId,
            {
                fps: 10,
                qrbox: { width: 250, height: 250 }
            },
            (decodedText) => {
                html5QrCode.stop();
                showResult(decodedText);
                cameraBtn.textContent = 'Buka Kamera';
            },
            (error) => {
                // console.error(error);
            }
        );
    } catch (err) {
        console.error('Error starting camera:', err);
    }
}

// File Upload dan Drag & Drop
const dropZone = document.getElementById('dropZone');
const desktopUploadBtn = document.getElementById('desktopUploadBtn');
const mobileUploadBtn = document.getElementById('mobileUploadBtn');

// Fungsi untuk memproses file
function processQRFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Mohon upload file gambar yang valid');
        return;
    }

    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop();
    }

    // Tampilkan loading state
    const loadingHtml = `
        <div class="flex items-center justify-center p-6">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
    `;
    document.getElementById('reader').innerHTML = loadingHtml;

    html5QrCode = new Html5Qrcode("reader");
    html5QrCode.scanFile(file, true)
        .then(decodedText => {
            showResult(decodedText);
            resetDropZoneState();
        })
        .catch(err => {
            alert('Gagal membaca QR Code dari gambar');
            console.error(err);
            resetDropZoneState();
            document.getElementById('reader').innerHTML = '';
        });
}

function resetDropZoneState() {
    dropZone.classList.remove('border-blue-500/80', 'bg-dark-800/50');
    dropZone.classList.add('border-dark-600/60', 'bg-dark-900/50');
}

// Event untuk klik tombol upload (Desktop)
desktopUploadBtn.addEventListener('click', () => fileInput.click());

// Event untuk klik tombol upload (Mobile)
mobileUploadBtn.addEventListener('click', () => fileInput.click());

// Event untuk file yang dipilih melalui dialog
fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
        processQRFile(e.target.files[0]);
    }
});

// Events untuk drag & drop (Desktop only)
if (window.matchMedia("(min-width: 768px)").matches) {
    dropZone.addEventListener('dragenter', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('border-dark-600/60', 'bg-dark-900/50');
        dropZone.classList.add('border-blue-500/80', 'bg-dark-800/50');
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        resetDropZoneState();
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files && files[0]) {
            processQRFile(files[0]);
        }
    });
}

// Show Result
function detectQRType(text) {
    const urlRegex = /^(https?:\/\/[^\s]+)/i;
    if (urlRegex.test(text)) {
        return { type: 'url', value: text };
    }

    const wifiRegex = /^WIFI:S:(.*?);T:(.*?);P:(.*?);H:(?:true|false);?$/i;
    const wifiMatch = text.match(wifiRegex);
    if (wifiMatch) {
        return {
            type: 'wifi',
            value: {
                ssid: wifiMatch[1],
                security: wifiMatch[2],
                password: wifiMatch[3]
            }
        };
    }

    const phoneRegex = /^(?:tel:|whatsapp:)?([+\d\s-()]{10,})/i;
    const phoneMatch = text.match(phoneRegex);
    if (phoneMatch) {
        const cleanNumber = phoneMatch[1].replace(/[\s()-]/g, '');
        return { type: 'phone', value: cleanNumber };
    }

    const emailRegex = /^(?:mailto:)?([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i;
    const emailMatch = text.match(emailRegex);
    if (emailMatch) {
        return { type: 'email', value: emailMatch[1] };
    }

    return { type: 'text', value: text };
}

function createActionButton(type, value) {
    switch (type) {
        case 'url':
            return `<a href="${value}" target="_blank" class="text-blue-500 hover:underline">Buka Link</a>`;
        case 'wifi':
            return `<button onclick="navigator.clipboard.writeText('${value.ssid}')" class="text-green-500 hover:underline">Salin SSID WiFi</button>`;
        case 'phone':
            return `<a href="tel:${value}" class="text-blue-500 hover:underline">Hubungi Nomor</a>`;
        case 'email':
            return `<a href="mailto:${value}" class="text-blue-500 hover:underline">Kirim Email</a>`;
        default:
            return `<button onclick="navigator.clipboard.writeText('${value}')" class="text-gray-500 hover:underline">Salin Teks</button>`;
    }
}

function showResult(decodedText) {
    const qrData = detectQRType(decodedText);
    scanResult.classList.remove('hidden');
    scanResult.classList.add('fade-in');
    resultText.textContent = qrData.value.ssid || qrData.value;
    
    const actionContainer = document.createElement('div');
    actionContainer.className = 'mt-4';
    actionContainer.innerHTML = createActionButton(qrData.type, qrData.value);
    scanResult.appendChild(actionContainer);

    if (qrData.type === 'url') {
        window.open(qrData.value, '_blank');
    }
}

// Copy Result
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(resultText.textContent)
        .then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Tersalin!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        })
        .catch(err => console.error('Gagal menyalin teks:', err));
});

// Save to localStorage
function saveToHistory(data) {
    try {
        let history = JSON.parse(localStorage.getItem('qrHistory')) || [];
        history.unshift({
            data,
            timestamp: new Date().toISOString()
        });
        history = history.slice(0, 10); // Keep only last 10 items
        localStorage.setItem('qrHistory', JSON.stringify(history));
    } catch (error) {
        console.error('Error saving to history:', error);
    }
}