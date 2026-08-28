(function () {
  const role = document.body.dataset.role;
  const root = document.getElementById("app");

  const ROLES = {
    mahasiswa: {
      label: "Mahasiswa / Peserta",
      person: "Kadek Ayu Lestari",
      meta: "MND-260145 · Housekeeping · Cabang Nusa Dua",
      menus: [
        ["dashboard", "Dashboard"],
        ["jadwal", "Jadwal"],
        ["krs", "Ajukan KRS"],
        ["nilai", "Nilai & Transkrip"],
        ["presensi", "Riwayat Presensi"],
        ["tagihan", "Tagihan & Bayar"],
        ["ganti-jurusan", "Ganti Jurusan"],
        ["kelulusan", "Kelulusan & Sertifikat"],
        ["notifikasi", "Notifikasi"],
        ["profil", "Profil"]
      ]
    },
    instruktur: {
      label: "Instruktur",
      person: "I Made Wirawan",
      meta: "Pengajar F&B Service · Cabang Nusa Dua",
      menus: [
        ["dashboard", "Dashboard"],
        ["jadwal", "Jadwal Mengajar"],
        ["presensi", "Input Presensi"],
        ["nilai", "Input Nilai"],
        ["notifikasi", "Notifikasi"]
      ]
    },
    "kepala-program": {
      label: "Kepala Program",
      person: "Ni Luh Putu Sari",
      meta: "Kaprodi Hospitality · Cabang Nusa Dua",
      menus: [
        ["dashboard", "Dashboard Jurusan"],
        ["approval-nilai", "Approval Nilai"],
        ["kelulusan", "Rekap Kelulusan"],
        ["notifikasi", "Notifikasi"]
      ]
    },
    "admin-cabang": {
      label: "Admin Cabang",
      person: "Putu Adi Pranata",
      meta: "Admin · Cabang Nusa Dua",
      menus: [
        ["dashboard", "Dashboard"],
        ["peserta", "Peserta"],
        ["krs", "Approval KRS"],
        ["ganti-jurusan", "Ganti Jurusan"],
        ["jurusan", "Jurusan & Mapel"],
        ["kelas", "Kelas & Jadwal"],
        ["notifikasi", "Notifikasi"]
      ]
    },
    "admin-keuangan": {
      label: "Admin Keuangan",
      person: "A.A. Sagung Dewi",
      meta: "Keuangan · Cabang Nusa Dua",
      menus: [
        ["dashboard", "Dashboard"],
        ["biaya", "Struktur Biaya"],
        ["tagihan", "Tagihan & Termin"],
        ["plan", "Payment Plan"],
        ["laporan", "Laporan Keuangan"],
        ["kwitansi", "Kwitansi"],
        ["notifikasi", "Notifikasi"]
      ]
    },
    "super-admin": {
      label: "Super Admin",
      person: "Direktur Yayasan",
      meta: "Yayasan Mandala Sastra Nusa Dewata",
      menus: [
        ["dashboard", "Dashboard Gabungan"],
        ["cabang", "Kelola Cabang"],
        ["users", "User & Role"],
        ["laporan", "Laporan Lintas Cabang"],
        ["notifikasi", "Notifikasi"]
      ]
    }
  };

  const cfg = ROLES[role];
  if (!cfg) {
    root.innerHTML = "<p style='padding:24px'>Peran tidak dikenali.</p>";
    return;
  }

  const notifs = [
    ["KRS gelombang 1 sudah dibuka", "2 jam lalu", "info"],
    ["Tagihan termin 2 jatuh tempo 5 Sep", "Kemarin", "warn"],
    ["Nilai Housekeeping 01 menunggu approval", "Kemarin", "ok"]
  ];

  function badge(text, type) {
    return `<span class="badge b-${type}">${text}</span>`;
  }
  function kpi(title, value, note) {
    return `<div class="card kpi"><span>${title}</span><b>${value}</b><span>${note || ""}</span></div>`;
  }
  function table(headers, rows) {
    return `<div class="card" style="overflow:auto"><table class="table"><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.join("")}</tbody></table></div>`;
  }
  function actions(items) {
    return `<div class="row-actions">${items}</div>`;
  }
  function btn(label, page, extra) {
    return `<button class="btn btn-sm ${extra || "btn-ghost"}" data-go="${page}">${label}</button>`;
  }

  const pages = {};

  pages.mahasiswa = {
    dashboard() {
      return `
        <div class="page-head"><div><h1>Halo, Kadek Ayu</h1><p>Program Housekeeping · Gelombang 1 · Status aktif</p></div>${btn("Ajukan KRS", "krs", "btn-primary")}</div>
        <div class="grid g-4">
          ${kpi("IPK sementara", "3.47", "4 mata pelajaran")}
          ${kpi("Kehadiran", "94%", "38 dari 40 sesi")}
          ${kpi("Tagihan", "Rp 1,5 jt", "1 termin menunggak")}
          ${kpi("Status", "Aktif", "Menuju kelulusan")}
        </div>
        <div class="grid g-2" style="margin-top:14px">
          <div class="card"><h3>Jadwal hari ini</h3>
            <p style="margin:10px 0">08.00–10.30 · Housekeeping Praktikum · Lab Linen</p>
            <p>13.00–15.00 · English for Hospitality · R. 2</p>
            ${btn("Lihat semua jadwal", "jadwal")}
          </div>
          <div class="card"><h3>Tugas portal</h3>
            <p style="margin:10px 0">• Lengkapi KRS sebelum 2 Sep</p>
            <p>• Bayar termin 2 via VA/QRIS</p>
            ${btn("Bayar sekarang", "tagihan", "btn-primary")}
          </div>
        </div>`;
    },
    jadwal() {
      return `
        <div class="page-head"><div><h1>Jadwal kelas</h1><p>Housekeeping · Gelombang 1</p></div></div>
        ${table(["Hari", "Waktu", "Mata pelajaran", "Instruktur", "Ruang"], [
          "<tr><td>Senin</td><td>08.00–10.30</td><td>Housekeeping Praktikum</td><td>I Made Wirawan</td><td>Lab Linen</td></tr>",
          "<tr><td>Senin</td><td>13.00–15.00</td><td>English for Hospitality</td><td>Sarah Collins</td><td>R. 2</td></tr>",
          "<tr><td>Rabu</td><td>08.00–11.00</td><td>Guest Room Standard</td><td>Ni Komang Rai</td><td>Lab Kamar</td></tr>"
        ])}`;
    },
    krs() {
      return `
        <div class="page-head"><div><h1>Ajukan KRS</h1><p>Pilih mata pelajaran gelombang berjalan. Admin cabang akan meninjau.</p></div></div>
        <div class="card">
          <label><input type="checkbox" checked /> Housekeeping Praktikum (4 SKK)</label><br />
          <label><input type="checkbox" checked /> English for Hospitality (2 SKK)</label><br />
          <label><input type="checkbox" /> Laundry & Linen Control (2 SKK)</label><br />
          <label><input type="checkbox" /> Public Area Cleaning (2 SKK)</label>
          <button class="btn btn-primary" style="width:auto;margin-top:16px" data-go="krs">Kirim pengajuan</button>
          <p class="note" style="margin-top:12px">Status saat ini: ${badge("Menunggu approval", "warn")} — Admin cabang dapat meninjau satu per satu.</p>
        </div>`;
    },
    nilai() {
      return `
        <div class="page-head"><div><h1>Nilai & transkrip</h1><p>Nilai tampil setelah disetujui Kepala Program.</p></div>${btn("Unduh PDF", "nilai")}</div>
        ${table(["Kode", "Mata pelajaran", "SKK", "Huruf", "Angka", "Status"], [
          `<tr><td>HK01</td><td>Housekeeping Praktikum</td><td>4</td><td>A</td><td>3.80</td><td>${badge("Disetujui", "ok")}</td></tr>`,
          `<tr><td>EN01</td><td>English for Hospitality</td><td>2</td><td>B+</td><td>3.40</td><td>${badge("Disetujui", "ok")}</td></tr>`,
          `<tr><td>HK02</td><td>Guest Room Standard</td><td>3</td><td>—</td><td>—</td><td>${badge("Menunggu approval", "warn")}</td></tr>`
        ])}
        <div class="card" style="margin-top:14px"><b>IPK sementara: 3.47</b> · Total SKK lulus: 6 dari 20</div>`;
    },
    presensi() {
      return `
        <div class="page-head"><div><h1>Riwayat presensi</h1><p>Rekap kehadiran per sesi.</p></div></div>
        ${table(["Tanggal", "Sesi", "Status", "Keterangan"], [
          `<tr><td>25 Agu 2026</td><td>Housekeeping Praktikum</td><td>${badge("Hadir", "ok")}</td><td>—</td></tr>`,
          `<tr><td>25 Agu 2026</td><td>English for Hospitality</td><td>${badge("Hadir", "ok")}</td><td>—</td></tr>`,
          `<tr><td>20 Agu 2026</td><td>Guest Room Standard</td><td>${badge("Izin", "warn")}</td><td>Sakit, surat dokter</td></tr>`
        ])}`;
    },
    tagihan() {
      return `
        <div class="page-head"><div><h1>Tagihan & pembayaran</h1><p>VA / QRIS · update otomatis via webhook gateway.</p></div></div>
        ${table(["Termin", "Jatuh tempo", "Nominal", "Status", "Aksi"], [
          `<tr><td>Pendaftaran</td><td>1 Agu 2026</td><td>Rp 500.000</td><td>${badge("Lunas", "ok")}</td><td>${btn("Kwitansi", "tagihan")}</td></tr>`,
          `<tr><td>SPP Termin 1</td><td>15 Agu 2026</td><td>Rp 1.500.000</td><td>${badge("Lunas", "ok")}</td><td>${btn("Kwitansi", "tagihan")}</td></tr>`,
          `<tr><td>SPP Termin 2</td><td>5 Sep 2026</td><td>Rp 1.500.000</td><td>${badge("Menunggu", "warn")}</td><td>${btn("Bayar VA/QRIS", "bayar", "btn-primary")}</td></tr>`
        ])}`;
    },
    bayar() {
      return `
        <div class="page-head"><div><h1>Bayar termin 2</h1><p>Pilih Virtual Account atau QRIS.</p></div>${btn("Kembali", "tagihan")}</div>
        <div class="grid g-2">
          <div class="card pay-box">
            <h3>Virtual Account BCA</h3>
            <p style="font-size:22px;font-weight:800;margin:12px 0">88012 260145 8821</p>
            <p>Nominal <b>Rp 1.500.000</b> · kedaluwarsa 23:59</p>
          </div>
          <div class="card pay-box">
            <h3>QRIS</h3>
            <div class="qr"></div>
            <p>Scan dari aplikasi bank / e-wallet</p>
          </div>
        </div>
        <p class="note" style="margin-top:14px">Status akan berubah menjadi Lunas setelah payment gateway mengirim webhook.</p>`;
    },
    "ganti-jurusan"() {
      return `
        <div class="page-head"><div><h1>Pengajuan ganti jurusan</h1><p>Admin cabang meninjau alasan dan ketersediaan kelas.</p></div></div>
        <div class="card form-grid">
          <div><label>Jurusan saat ini</label><input value="Housekeeping" disabled /></div>
          <div><label>Jurusan tujuan</label>
            <select><option>F&amp;B Service</option><option>Bar</option><option>Cook</option><option>Bahasa Inggris</option></select>
          </div>
          <div class="span-2"><label>Alasan</label><textarea rows="3" placeholder="Tuliskan alasan pindah jurusan"></textarea></div>
        </div>
        <button class="btn btn-primary" style="width:auto;margin-top:12px">Kirim pengajuan</button>
        <div class="card" style="margin-top:14px">Pengajuan terakhir: Housekeeping → F&amp;B Service · ${badge("Menunggu tinjauan", "warn")}</div>`;
    },
    kelulusan() {
      return `
        <div class="page-head"><div><h1>Status kelulusan & sertifikat</h1><p>Sertifikat terbit setelah nilai final disetujui dan administrasi lunas.</p></div></div>
        <div class="grid g-3">
          ${kpi("Akademik", "Memenuhi", "SKK 18/20")}
          ${kpi("Kehadiran", "94%", "Minimal 80%")}
          ${kpi("Keuangan", "Belum", "1 termin terbuka")}
        </div>
        <div class="card" style="margin-top:14px">
          <p>Status: ${badge("Belum dapat diunduh", "warn")} — lunasi termin 2 untuk membuka sertifikat.</p>
          ${btn("Lihat pratinjau sertifikat", "sertifikat")}
        </div>`;
    },
    sertifikat() {
      return `
        <div class="page-head"><div><h1>Sertifikat kelulusan</h1><p>Diterbitkan otomatis oleh sistem.</p></div>${btn("Kembali", "kelulusan")}</div>
        <div class="card" style="text-align:center;padding:40px;background:linear-gradient(180deg,#f7fbff,#fff)">
          <img src="../assets/logo.jpg" alt="" style="width:88px;height:88px;margin:0 auto 12px;border-radius:50%" />
          <p style="letter-spacing:.2em;font-size:12px;color:var(--royal);font-weight:800">CERTIFICATE OF COMPLETION</p>
          <h2 style="margin:12px 0">Kadek Ayu Lestari</h2>
          <p>telah menyelesaikan program <b>Housekeeping</b><br />Lembaga Kursus Maritim Nusa Dewata International</p>
          <p style="margin-top:16px;color:var(--muted)">No. sertifikat: MNDI/HK/2026/0145</p>
          <button class="btn btn-primary" style="width:auto;margin-top:18px">Unduh PDF</button>
        </div>`;
    },
    notifikasi() {
      return `
        <div class="page-head"><div><h1>Notifikasi</h1><p>Pemberitahuan akademik dan keuangan.</p></div></div>
        ${notifs.map(([t, d]) => `<div class="card notif"><b>${t}</b><div style="color:var(--muted);font-size:12px">${d}</div></div>`).join("")}`;
    },
    profil() {
      return `
        <div class="page-head"><div><h1>Profil peserta</h1><p>Biodata dan dokumen.</p></div></div>
        <div class="card form-grid">
          <div><label>Nama</label><input value="Kadek Ayu Lestari" /></div>
          <div><label>NIM</label><input value="MND-260145" disabled /></div>
          <div><label>Program</label><input value="Housekeeping" disabled /></div>
          <div><label>Status</label><input value="Aktif" disabled /></div>
          <div class="span-2"><label>Dokumen</label><p>KTP.pdf · Ijazah.pdf · Foto.jpg ${badge("Lengkap", "ok")}</p></div>
        </div>`;
    }
  };

  pages.instruktur = {
    dashboard() {
      return `
        <div class="page-head"><div><h1>Dashboard instruktur</h1><p>3 kelas aktif minggu ini</p></div></div>
        <div class="grid g-3">
          ${kpi("Sesi hari ini", "2", "F&B Service A & B")}
          ${kpi("Presensi pending", "1", "Perlu dikunci")}
          ${kpi("Nilai pending", "8", "Menunggu submit")}
        </div>`;
    },
    jadwal() {
      return `
        <div class="page-head"><div><h1>Jadwal mengajar</h1></div></div>
        ${table(["Hari", "Kelas", "Mapel", "Ruang"], [
          "<tr><td>Senin 08.00</td><td>F&B A</td><td>Table Service</td><td>Lab Restoran</td></tr>",
          "<tr><td>Rabu 13.00</td><td>F&B B</td><td>Guest Handling</td><td>R. 3</td></tr>"
        ])}`;
    },
    presensi() {
      return `
        <div class="page-head"><div><h1>Input presensi</h1><p>Sesi: Table Service · 28 Agu 2026</p></div><button class="btn btn-primary" style="width:auto">Kunci presensi</button></div>
        ${table(["NIM", "Nama", "Status"], [
          `<tr><td>MND-260145</td><td>Kadek Ayu Lestari</td><td><select><option>Hadir</option><option>Izin</option><option>Alpa</option></select></td></tr>`,
          `<tr><td>MND-260146</td><td>I Gede Putra</td><td><select><option>Hadir</option><option>Izin</option><option>Alpa</option></select></td></tr>`
        ])}`;
    },
    nilai() {
      return `
        <div class="page-head"><div><h1>Input nilai</h1><p>Nilai masuk antrean Kepala Program.</p></div><button class="btn btn-primary" style="width:auto">Kirim ke approval</button></div>
        ${table(["NIM", "Nama", "Angka", "Huruf"], [
          `<tr><td>MND-260145</td><td>Kadek Ayu Lestari</td><td><input value="86" /></td><td>A</td></tr>`,
          `<tr><td>MND-260146</td><td>I Gede Putra</td><td><input value="78" /></td><td>B</td></tr>`
        ])}`;
    },
    notifikasi() {
      return pages.mahasiswa.notifikasi();
    }
  };

  pages["kepala-program"] = {
    dashboard() {
      return `
        <div class="page-head"><div><h1>Dashboard jurusan Hospitality</h1><p>Rekap kelulusan, IP, dan antrean nilai.</p></div></div>
        <div class="grid g-4">
          ${kpi("Peserta aktif", "86", "5 program")}
          ${kpi("IP rata-rata", "3.31", "Gelombang 1")}
          ${kpi("Lulus", "24", "Periode ini")}
          ${kpi("Antrean nilai", "12", "Perlu diputuskan")}
        </div>
        <div class="card" style="margin-top:14px">${btn("Buka antrean approval nilai", "approval-nilai", "btn-primary")}</div>`;
    },
    "approval-nilai"() {
      return `
        <div class="page-head"><div><h1>Approval nilai</h1><p>Nilai belum masuk transkrip sebelum disetujui.</p></div></div>
        ${table(["Kelas", "Mapel", "Instruktur", "Peserta", "Aksi"], [
          `<tr><td>HK-A</td><td>Guest Room Standard</td><td>Ni Komang Rai</td><td>18</td><td>${actions(btn("Tinjau", "approval-detail", "btn-primary") + btn("Tolak", "approval-nilai", "btn-danger"))}</td></tr>`,
          `<tr><td>FB-A</td><td>Table Service</td><td>I Made Wirawan</td><td>16</td><td>${btn("Tinjau", "approval-detail")}</td></tr>`
        ])}`;
    },
    "approval-detail"() {
      return `
        <div class="page-head"><div><h1>Tinjau nilai Guest Room Standard</h1></div>${btn("Kembali", "approval-nilai")}</div>
        ${table(["NIM", "Nama", "Angka", "Huruf"], [
          "<tr><td>MND-260145</td><td>Kadek Ayu Lestari</td><td>88</td><td>A</td></tr>",
          "<tr><td>MND-260151</td><td>Made Ayu</td><td>74</td><td>B</td></tr>"
        ])}
        <div class="row-actions" style="margin-top:12px"><button class="btn btn-ok">Setujui semua</button><button class="btn btn-danger">Kembalikan ke instruktur</button></div>`;
    },
    kelulusan() {
      return `
        <div class="page-head"><div><h1>Rekap kelulusan</h1></div></div>
        ${table(["Program", "Peserta", "Lulus", "DO", "IP rata-rata"], [
          "<tr><td>Housekeeping</td><td>22</td><td>18</td><td>1</td><td>3.41</td></tr>",
          "<tr><td>F&B Service</td><td>20</td><td>16</td><td>0</td><td>3.28</td></tr>",
          "<tr><td>Cook</td><td>18</td><td>12</td><td>2</td><td>3.19</td></tr>"
        ])}`;
    },
    notifikasi() {
      return pages.mahasiswa.notifikasi();
    }
  };

  pages["admin-cabang"] = {
    dashboard() {
      return `
        <div class="page-head"><div><h1>Dashboard cabang Nusa Dua</h1></div></div>
        <div class="grid g-4">
          ${kpi("Calon peserta", "9", "Perlu ditinjau")}
          ${kpi("Aktif", "86", "Semua program")}
          ${kpi("KRS pending", "14", "Gelombang 1")}
          ${kpi("Ganti jurusan", "3", "Menunggu keputusan")}
        </div>`;
    },
    peserta() {
      return `
        <div class="page-head"><div><h1>Manajemen peserta</h1><p>Calon → aktif → lulus/DO</p></div>${btn("Input peserta", "peserta-detail")}</div>
        <div class="toolbar"><input class="search" placeholder="Cari nama / NIM" /></div>
        ${table(["NIM / daftar", "Nama", "Program", "Status", "Aksi"], [
          `<tr><td>—</td><td>Komang Dias</td><td>Cook</td><td>${badge("Calon", "warn")}</td><td>${btn("Tinjau", "peserta-detail", "btn-primary")}</td></tr>`,
          `<tr><td>MND-260145</td><td>Kadek Ayu Lestari</td><td>Housekeeping</td><td>${badge("Aktif", "ok")}</td><td>${btn("Tinjau", "peserta-detail")}</td></tr>`,
          `<tr><td>MND-260112</td><td>Wayan Suta</td><td>Bar</td><td>${badge("DO", "danger")}</td><td>${btn("Tinjau", "peserta-detail")}</td></tr>`
        ])}`;
    },
    "peserta-detail"() {
      return `
        <div class="page-head"><div><h1>Tinjau peserta: Komang Dias</h1><p>Calon peserta · dokumen lengkap</p></div>${btn("Kembali", "peserta")}</div>
        <div class="card form-grid">
          <div><label>Program</label><select><option>Cook</option><option>Bar</option></select></div>
          <div><label>Kelas / gelombang</label><select><option>Cook-A Gelombang 1</option></select></div>
          <div class="span-2"><label>Catatan</label><textarea rows="2">Dokumen KTP & ijazah valid.</textarea></div>
        </div>
        <div class="row-actions" style="margin-top:12px"><button class="btn btn-ok">Setujui & aktifkan</button><button class="btn btn-danger">Tolak</button></div>`;
    },
    krs() {
      return `
        <div class="page-head"><div><h1>Approval KRS</h1></div></div>
        ${table(["NIM", "Nama", "SKK", "Status", "Aksi"], [
          `<tr><td>MND-260145</td><td>Kadek Ayu Lestari</td><td>8</td><td>${badge("Pending", "warn")}</td><td>${btn("Tinjau", "krs-detail", "btn-primary")}</td></tr>`,
          `<tr><td>MND-260160</td><td>Putu Devi</td><td>10</td><td>${badge("Pending", "warn")}</td><td>${btn("Tinjau", "krs-detail")}</td></tr>`
        ])}`;
    },
    "krs-detail"() {
      return `
        <div class="page-head"><div><h1>Tinjau KRS Kadek Ayu Lestari</h1></div>${btn("Kembali", "krs")}</div>
        ${table(["Mapel", "SKK", "Kelas", "Keputusan"], [
          "<tr><td>Housekeeping Praktikum</td><td>4</td><td>HK-A</td><td>Setujui</td></tr>",
          "<tr><td>English for Hospitality</td><td>2</td><td>EN-1</td><td>Setujui</td></tr>",
          "<tr><td>Laundry & Linen Control</td><td>2</td><td>HK-B penuh</td><td>Tolak / pindah kelas</td></tr>"
        ])}
        <div class="row-actions" style="margin-top:12px"><button class="btn btn-ok">Setujui KRS</button><button class="btn btn-warn">Minta revisi</button></div>`;
    },
    "ganti-jurusan"() {
      return `
        <div class="page-head"><div><h1>Pengajuan ganti jurusan</h1></div></div>
        ${table(["Nama", "Dari", "Ke", "Status", "Aksi"], [
          `<tr><td>Kadek Ayu Lestari</td><td>Housekeeping</td><td>F&B Service</td><td>${badge("Pending", "warn")}</td><td>${btn("Tinjau", "ganti-detail", "btn-primary")}</td></tr>`
        ])}`;
    },
    "ganti-detail"() {
      return `
        <div class="page-head"><div><h1>Tinjau ganti jurusan</h1></div>${btn("Kembali", "ganti-jurusan")}</div>
        <div class="card">
          <p><b>Kadek Ayu Lestari</b> mengajukan pindah Housekeeping → F&amp;B Service.</p>
          <p style="margin:12px 0">Alasan: ingin fokus pelayanan restoran kapal pesiar.</p>
          <p>Kuota F&amp;B A: 2 kursi tersisa. Dampak keuangan: selisih SPP Rp 0.</p>
        </div>
        <div class="row-actions" style="margin-top:12px"><button class="btn btn-ok">Setujui pindah</button><button class="btn btn-danger">Tolak</button></div>`;
    },
    jurusan() {
      return `
        <div class="page-head"><div><h1>Jurusan & mata pelajaran</h1></div><button class="btn btn-primary" style="width:auto">Tambah jurusan</button></div>
        ${table(["Jurusan", "Mapel", "Durasi", "Aksi"], [
          `<tr><td>Bahasa Inggris</td><td>6</td><td>3 bulan</td><td>${btn("Kelola mapel", "mapel")}</td></tr>`,
          `<tr><td>Housekeeping</td><td>8</td><td>4 bulan</td><td>${btn("Kelola mapel", "mapel")}</td></tr>`,
          `<tr><td>F&B Service</td><td>7</td><td>4 bulan</td><td>${btn("Kelola mapel", "mapel")}</td></tr>`,
          `<tr><td>Bar</td><td>6</td><td>3 bulan</td><td>${btn("Kelola mapel", "mapel")}</td></tr>`,
          `<tr><td>Cook</td><td>8</td><td>4 bulan</td><td>${btn("Kelola mapel", "mapel")}</td></tr>`
        ])}`;
    },
    mapel() {
      return `
        <div class="page-head"><div><h1>Mata pelajaran Housekeeping</h1></div>${btn("Kembali", "jurusan")}</div>
        ${table(["Kode", "Nama", "SKK", "Aksi"], [
          `<tr><td>HK01</td><td>Housekeeping Praktikum</td><td>4</td><td>${btn("Edit", "mapel")}</td></tr>`,
          `<tr><td>HK02</td><td>Guest Room Standard</td><td>3</td><td>${btn("Edit", "mapel")}</td></tr>`
        ])}`;
    },
    kelas() {
      return `
        <div class="page-head"><div><h1>Kelas & jadwal</h1><p>Termasuk penugasan instruktur.</p></div><button class="btn btn-primary" style="width:auto">Buat kelas</button></div>
        ${table(["Kelas", "Program", "Instruktur", "Hari", "Kuota", "Aksi"], [
          `<tr><td>HK-A</td><td>Housekeeping</td><td>Ni Komang Rai</td><td>Sen/Rab 08.00</td><td>18/20</td><td>${btn("Edit jadwal", "kelas")}</td></tr>`,
          `<tr><td>FB-A</td><td>F&B Service</td><td>I Made Wirawan</td><td>Sen 08.00</td><td>16/20</td><td>${btn("Edit jadwal", "kelas")}</td></tr>`
        ])}`;
    },
    notifikasi() {
      return pages.mahasiswa.notifikasi();
    }
  };

  pages["admin-keuangan"] = {
    dashboard() {
      return `
        <div class="page-head"><div><h1>Keuangan cabang Nusa Dua</h1></div></div>
        <div class="grid g-3">
          ${kpi("Masuk bulan ini", "Rp 128 jt", "VA + QRIS + tunai")}
          ${kpi("Tunggakan", "Rp 21 jt", "17 peserta")}
          ${kpi("Lunas penuh", "64%", "gelombang berjalan")}
        </div>`;
    },
    biaya() {
      return `
        <div class="page-head"><div><h1>Struktur biaya per jurusan</h1></div><button class="btn btn-primary" style="width:auto">Tambah skema</button></div>
        ${table(["Jurusan", "Pendaftaran", "Total SPP", "Termin", "Aksi"], [
          `<tr><td>Housekeeping</td><td>Rp 500 rb</td><td>Rp 4,5 jt</td><td>3</td><td>${btn("Edit", "biaya")}</td></tr>`,
          `<tr><td>Cook</td><td>Rp 500 rb</td><td>Rp 5,0 jt</td><td>3</td><td>${btn("Edit", "biaya")}</td></tr>`,
          `<tr><td>Bahasa Inggris</td><td>Rp 350 rb</td><td>Rp 3,2 jt</td><td>2</td><td>${btn("Edit", "biaya")}</td></tr>`
        ])}`;
    },
    tagihan() {
      return `
        <div class="page-head"><div><h1>Tagihan & termin</h1></div></div>
        ${table(["Peserta", "Termin", "Nominal", "Status", "Aksi"], [
          `<tr><td>Kadek Ayu Lestari</td><td>SPP 2</td><td>Rp 1,5 jt</td><td>${badge("Menunggu", "warn")}</td><td>${btn("Payment plan", "plan", "btn-primary")}</td></tr>`,
          `<tr><td>I Gede Putra</td><td>SPP 1</td><td>Rp 1,5 jt</td><td>${badge("Lunas", "ok")}</td><td>${btn("Kwitansi", "kwitansi")}</td></tr>`
        ])}`;
    },
    plan() {
      return `
        <div class="page-head"><div><h1>Payment plan: Kadek Ayu Lestari</h1><p>Buat / ubah rincian termin.</p></div>${btn("Kembali", "tagihan")}</div>
        ${table(["Termin", "Jatuh tempo", "Nominal", "Status"], [
          `<tr><td>Pendaftaran</td><td>1 Agu</td><td><input value="500000" /></td><td>${badge("Lunas", "ok")}</td></tr>`,
          `<tr><td>SPP 1</td><td>15 Agu</td><td><input value="1500000" /></td><td>${badge("Lunas", "ok")}</td></tr>`,
          `<tr><td>SPP 2</td><td>5 Sep</td><td><input value="1500000" /></td><td>${badge("Open", "warn")}</td></tr>`,
          `<tr><td>SPP 3</td><td>5 Okt</td><td><input value="1500000" /></td><td>${badge("Draft", "muted")}</td></tr>`
        ])}
        <button class="btn btn-primary" style="width:auto;margin-top:12px">Simpan rencana</button>`;
    },
    laporan() {
      return `
        <div class="page-head"><div><h1>Laporan keuangan cabang</h1><p>Rekap, bukan hanya 3 angka ringkas.</p></div>${btn("Unduh Excel", "laporan")}</div>
        ${table(["Program", "Tagihan", "Terbayar", "Tunggakan", "Peserta nunggak"], [
          "<tr><td>Housekeeping</td><td>99 jt</td><td>82 jt</td><td>17 jt</td><td>6</td></tr>",
          "<tr><td>F&B Service</td><td>88 jt</td><td>80 jt</td><td>8 jt</td><td>4</td></tr>",
          "<tr><td>Cook</td><td>90 jt</td><td>78 jt</td><td>12 jt</td><td>5</td></tr>",
          "<tr><td>Bar</td><td>54 jt</td><td>50 jt</td><td>4 jt</td><td>2</td></tr>",
          "<tr><td>Bahasa Inggris</td><td>48 jt</td><td>46 jt</td><td>2 jt</td><td>1</td></tr>"
        ])}`;
    },
    kwitansi() {
      return `
        <div class="page-head"><div><h1>Kwitansi / invoice</h1></div></div>
        <div class="card">
          <p><b>No. INV/MNDI/ND/0826/0145</b></p>
          <p>Diterima dari Kadek Ayu Lestari · SPP Termin 1 · Rp 1.500.000</p>
          <p>Metode: Virtual Account BCA · Status webhook: PAID</p>
          <button class="btn btn-primary" style="width:auto;margin-top:12px">Cetak PDF</button>
        </div>`;
    },
    notifikasi() {
      return pages.mahasiswa.notifikasi();
    }
  };

  pages["super-admin"] = {
    dashboard() {
      return `
        <div class="page-head"><div><h1>Dashboard lintas cabang</h1><p>Yayasan Mandala Sastra Nusa Dewata</p></div></div>
        <div class="grid g-4">
          ${kpi("Cabang", "2", "Nusa Dua, Denpasar")}
          ${kpi("Peserta aktif", "124", "Semua program")}
          ${kpi("Pendapatan MTD", "Rp 186 jt", "Semua cabang")}
          ${kpi("User sistem", "38", "6 peran")}
        </div>`;
    },
    cabang() {
      return `
        <div class="page-head"><div><h1>Kelola cabang</h1></div><button class="btn btn-primary" style="width:auto">Tambah cabang</button></div>
        ${table(["Cabang", "Alamat", "Peserta", "Status", "Aksi"], [
          `<tr><td>Nusa Dua</td><td>Pertokoan Niaga Nusa Dua No.1</td><td>86</td><td>${badge("Aktif", "ok")}</td><td>${btn("Edit", "cabang")}</td></tr>`,
          `<tr><td>Denpasar</td><td>Rencana 2027</td><td>38</td><td>${badge("Persiapan", "warn")}</td><td>${btn("Edit", "cabang")}</td></tr>`
        ])}`;
    },
    users() {
      return `
        <div class="page-head"><div><h1>User & role</h1></div><button class="btn btn-primary" style="width:auto">Undang user</button></div>
        ${table(["Nama", "Email", "Peran", "Cabang", "Aksi"], [
          `<tr><td>Putu Adi Pranata</td><td>admin.nd@mndi.ac.id</td><td>Admin Cabang</td><td>Nusa Dua</td><td>${btn("Ubah peran", "users")}</td></tr>`,
          `<tr><td>I Made Wirawan</td><td>instruktur@mndi.ac.id</td><td>Instruktur</td><td>Nusa Dua</td><td>${btn("Ubah peran", "users")}</td></tr>`,
          `<tr><td>Ni Luh Putu Sari</td><td>kaprodi@mndi.ac.id</td><td>Kepala Program</td><td>Nusa Dua</td><td>${btn("Ubah peran", "users")}</td></tr>`
        ])}`;
    },
    laporan() {
      return `
        <div class="page-head"><div><h1>Laporan gabungan lintas cabang</h1></div></div>
        ${table(["Cabang", "Aktif", "Lulus", "Tunggakan", "Kehadiran"], [
          "<tr><td>Nusa Dua</td><td>86</td><td>24</td><td>Rp 21 jt</td><td>93%</td></tr>",
          "<tr><td>Denpasar</td><td>38</td><td>8</td><td>Rp 9 jt</td><td>90%</td></tr>",
          "<tr><td><b>Total</b></td><td>124</td><td>32</td><td>Rp 30 jt</td><td>92%</td></tr>"
        ])}`;
    },
    notifikasi() {
      return pages.mahasiswa.notifikasi();
    }
  };

  function pageFromHash() {
    const id = (location.hash || "#dashboard").slice(1);
    const set = pages[role] || {};
    return set[id] ? id : cfg.menus[0][0];
  }

  function render() {
    const page = pageFromHash();
    const html = pages[role][page]();
    root.innerHTML = `
      <div class="app">
        <aside class="sidebar">
          <div class="side-brand">
            <img src="../assets/logo.jpg" alt="" />
            <div><strong>Maritim Nusa Dewata</strong><small>International</small></div>
          </div>
          <div class="role-badge">${cfg.label}</div>
          ${cfg.menus.map(([id, label]) => `<a class="nav-item ${id === page ? "active" : ""}" href="#${id}">${label}</a>`).join("")}
          <div class="side-foot">
            <a href="../index.html">← Landing page</a><br />
            <a href="../login.html">Ganti peran / keluar</a>
          </div>
        </aside>
        <section class="main">
          <header class="topbar">
            <div class="crumbs">SIM LPK / <b>${cfg.menus.find((m) => m[0] === page)?.[1] || page}</b></div>
            <div class="top-actions">
              <button class="bell" id="bellBtn" title="Notifikasi">N<span class="dot"></span></button>
              <div class="avatar" title="${cfg.person}">${cfg.person.split(" ").pop().slice(0, 1)}</div>
            </div>
          </header>
          <div class="content">${html}</div>
        </section>
      </div>
      <aside class="drawer" id="drawer">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <b>Notifikasi</b><button class="btn btn-sm btn-ghost" id="closeDrawer">Tutup</button>
        </div>
        ${notifs.map(([t, d]) => `<div class="notif"><b>${t}</b><div style="color:var(--muted);font-size:12px">${d}</div></div>`).join("")}
        <a class="btn btn-ghost" style="width:100%;margin-top:8px" href="#notifikasi">Lihat semua</a>
      </aside>`;

    document.getElementById("bellBtn").onclick = () => document.getElementById("drawer").classList.add("open");
    document.getElementById("closeDrawer").onclick = () => document.getElementById("drawer").classList.remove("open");
    root.querySelectorAll("[data-go]").forEach((el) => {
      el.onclick = () => {
        location.hash = el.dataset.go;
      };
    });
  }

  window.addEventListener("hashchange", render);
  render();
})();
