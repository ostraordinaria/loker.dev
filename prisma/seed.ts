import { prisma } from "../src/server/db";

async function seed() {
  try {
    await prisma.location.createMany({
      data: [
        { remote: true, city: "", province: "" },
        { city: "Banda Aceh", province: "Aceh" },
        { city: "Langsa", province: "Aceh" },
        { city: "Lhokseumawe", province: "Aceh" },
        { city: "Sabang", province: "Aceh" },
        { city: "Subulussalam", province: "Aceh" },
        { city: "Denpasar", province: "Bali" },
        { city: "Pangkalpinang", province: "Bangka Belitung" },
        { city: "Cilegon", province: "Banten" },
        { city: "Serang", province: "Banten" },
        { city: "Tangerang Selatan", province: "Banten" },
        { city: "Tangerang", province: "Banten" },
        { city: "Bengkulu", province: "Bengkulu" },
        { city: "Yogyakarta", province: "Daerah Istimewa Yogyakarta" },
        { city: "Gorontalo", province: "Gorontalo" },
        { city: "Jakarta Barat", province: "DKI Jakarta" },
        { city: "Jakarta Pusat", province: "DKI Jakarta" },
        { city: "Jakarta Selatan", province: "DKI Jakarta" },
        { city: "Jakarta Timur", province: "DKI Jakarta" },
        { city: "Jakarta Utara", province: "DKI Jakarta" },
        { city: "Sungai Penuh", province: "Jambi" },
        { city: "Jambi", province: "Jambi" },
        { city: "Bandung", province: "Jawa Barat" },
        { city: "Bekasi", province: "Jawa Barat" },
        { city: "Bogor", province: "Jawa Barat" },
        { city: "Cimahi", province: "Jawa Barat" },
        { city: "Cirebon", province: "Jawa Barat" },
        { city: "Depok", province: "Jawa Barat" },
        { city: "Sukabumi", province: "Jawa Barat" },
        { city: "Tasikmalaya", province: "Jawa Barat" },
        { city: "Banjar", province: "Jawa Barat" },
        { city: "Magelang", province: "Jawa Tengah" },
        { city: "Pekalongan", province: "Jawa Tengah" },
        { city: "Salatiga", province: "Jawa Tengah" },
        { city: "Semarang", province: "Jawa Tengah" },
        { city: "Surakarta", province: "Jawa Tengah" },
        { city: "Tegal", province: "Jawa Tengah" },
        { city: "Batu", province: "Jawa Timur" },
        { city: "Blitar", province: "Jawa Timur" },
        { city: "Kediri", province: "Jawa Timur" },
        { city: "Madiun", province: "Jawa Timur" },
        { city: "Malang", province: "Jawa Timur" },
        { city: "Mojokerto", province: "Jawa Timur" },
        { city: "Pasuruan", province: "Jawa Timur" },
        { city: "Probolinggo", province: "Jawa Timur" },
        { city: "Surabaya", province: "Jawa Timur" },
        { city: "Pontianak", province: "Kalimantan Barat" },
        { city: "Singkawang", province: "Kalimantan Barat" },
        { city: "Banjarbaru", province: "Kalimantan Selatan" },
        { city: "Banjarmasin", province: "Kalimantan Selatan" },
        { city: "Palangka Raya", province: "Kalimantan Tengah" },
        { city: "Balikpapan", province: "Kalimantan Timur" },
        { city: "Bontang", province: "Kalimantan Timur" },
        { city: "Samarinda", province: "Kalimantan Timur" },
        { city: "Nusantara", province: "Kalimantan Timur" },
        { city: "Tarakan", province: "Kalimantan Utara" },
        { city: "Batam", province: "Kepulauan Riau" },
        { city: "Tanjungpinang", province: "Kepulauan Riau" },
        { city: "Bandar Lampung", province: "Lampung" },
        { city: "Metro", province: "Lampung" },
        { city: "Ternate", province: "Maluku Utara" },
        { city: "Tidore Kepulauan", province: "Maluku Utara" },
        { city: "Ambon", province: "Maluku" },
        { city: "Tual", province: "Maluku" },
        { city: "Bima", province: "Nusa Tenggara Barat" },
        { city: "Mataram", province: "Nusa Tenggara Barat" },
        { city: "Kupang", province: "Nusa Tenggara Timur" },
        { city: "Sorong", province: "Papua Barat Daya" },
        { city: "Jayapura", province: "Papua" },
        { city: "Dumai", province: "Riau" },
        { city: "Pekanbaru", province: "Riau" },
        { city: "Makassar", province: "Sulawesi Selatan" },
        { city: "Palopo", province: "Sulawesi Selatan" },
        { city: "Parepare", province: "Sulawesi Selatan" },
        { city: "Palu", province: "Sulawesi Tengah" },
        { city: "Baubau", province: "Sulawesi Tenggara" },
        { city: "Kendari", province: "Sulawesi Tenggara" },
        { city: "Bitung", province: "Sulawesi Utara" },
        { city: "Kotamobagu", province: "Sulawesi Utara" },
        { city: "Manado", province: "Sulawesi Utara" },
        { city: "Tomohon", province: "Sulawesi Utara" },
        { city: "Bukittinggi", province: "Sumatra Barat" },
        { city: "Padang", province: "Sumatra Barat" },
        { city: "Padang Panjang", province: "Sumatra Barat" },
        { city: "Pariaman", province: "Sumatra Barat" },
        { city: "Payakumbuh", province: "Sumatra Barat" },
        { city: "Sawahlunto", province: "Sumatra Barat" },
        { city: "Solok", province: "Sumatra Barat" },
        { city: "Lubuklinggau", province: "Sumatra Selatan" },
        { city: "Pagar Alam", province: "Sumatra Selatan" },
        { city: "Palembang", province: "Sumatra Selatan" },
        { city: "Prabumulih", province: "Sumatra Selatan" },
        { city: "Binjai", province: "Sumatra Utara" },
        { city: "Gunungsitoli", province: "Sumatra Utara" },
        { city: "Medan", province: "Sumatra Utara" },
        { city: "Padangsidimpuan", province: "Sumatra Utara" },
        { city: "Pematangsiantar", province: "Sumatra Utara" },
        { city: "Sibolga", province: "Sumatra Utara" },
        { city: "Tanjungbalai", province: "Sumatra Utara" },
        { city: "Tebing Tinggi", province: "Sumatra Utara" },
      ],
    });
  } catch (error) {
    console.warn("Please define your seed data.");
    console.error(error);
  }
}

void seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });