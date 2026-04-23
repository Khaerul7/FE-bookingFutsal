// ── Types ─────────────────────────────────────────────────────────────────────
export interface Field {
  id: number;
  venue: string;
  name: string;
  rating: number;
  price: number;
  status: "available" | "occupied";
  img: string;
}

export interface Review {
  id: number;
  name: string;
  stars: number;
  text: string;
  avatar: string;
}

export interface AdminField {
  id: number;
  name: string;
  type: "Standar" | "VIP";
  status: "available" | "occupied";
  time: string;
  user?: string;
}

// ── Mock Fields ───────────────────────────────────────────────────────────────
export const fields: Field[] = [
  {
    id: 1,
    venue: "Arena RUL09 Utama",
    name: "Lapangan A",
    rating: 4.9,
    price: 120000,
    status: "available",
    img: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&q=80",
  },
  {
    id: 2,
    venue: "Arena RUL09 Utama",
    name: "Lapangan B",
    rating: 4.7,
    price: 120000,
    status: "occupied",
    img: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=80",
  },
  {
    id: 3,
    venue: "Arena RUL09 VIP",
    name: "Lapangan C (VIP)",
    rating: 5.0,
    price: 180000,
    status: "available",
    img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80",
  },
  {
    id: 4,
    venue: "Arena RUL09 Utama",
    name: "Lapangan D",
    rating: 4.6,
    price: 100000,
    status: "available",
    img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
  },
  {
    id: 5,
    venue: "Arena RUL09 VIP",
    name: "Lapangan E (VIP)",
    rating: 4.8,
    price: 180000,
    status: "occupied",
    img: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=600&q=80",
  },
  {
    id: 6,
    venue: "Arena RUL09 Utama",
    name: "Lapangan F",
    rating: 4.5,
    price: 100000,
    status: "available",
    img: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=600&q=80",
  },
];

// ── Mock Reviews ──────────────────────────────────────────────────────────────
export const reviews: Review[] = [
  { id: 1, name: "Rizal A.", stars: 5, text: "Lapangan bersih banget, rumput sintetisnya enak buat main. Pasti balik lagi!", avatar: "R" },
  { id: 2, name: "Fajar M.", stars: 5, text: "Lokasinya strategis, parkir luas, penerangan malam hari mantap! Recommended.", avatar: "F" },
  { id: 3, name: "Bagas P.", stars: 4, text: "Harga terjangkau, fasilitasnya lengkap. Kamar mandinya juga bersih.", avatar: "B" },
  { id: 4, name: "Denny S.", stars: 5, text: "Sering main di sini, adminnya ramah dan responsif. Top markotop!", avatar: "D" },
  { id: 5, name: "Irfan H.", stars: 4, text: "Lapangan VIP-nya worth it banget. Kaca pinggirannya bikin vibes pro.", avatar: "I" },
  { id: 6, name: "Bambang", stars: 4, text: "nyaman banget sama tempatnya, jadi sering main disini.", avatar: "I" },
];

// ── Mock Admin Fields ─────────────────────────────────────────────────────────
export const adminFields: AdminField[] = [
  { id: 1, name: "Lapangan A", type: "Standar", status: "available", time: "08:00 - 10:00" },
  { id: 2, name: "Lapangan B", type: "Standar", status: "occupied",  time: "10:00 - 12:00", user: "Rizal A." },
  { id: 3, name: "Lapangan C (VIP)", type: "VIP", status: "available", time: "-" },
  { id: 4, name: "Lapangan D", type: "Standar", status: "available", time: "14:00 - 16:00" },
  { id: 5, name: "Lapangan E (VIP)", type: "VIP", status: "occupied",  time: "12:00 - 14:00", user: "Fajar M." },
  { id: 6, name: "Lapangan F", type: "Standar", status: "available", time: "-" },
];

// ── Types: Booking ────────────────────────────────────────────────────────────
export interface Booking {
  id: number;
  code: string;
  name: string;
  lapangan: string;
  tanggal: string;
  sesi: string;
  durasi: string;
  total: number;
  status: "confirmed" | "pending" | "cancelled";
}

export const bookings: Booking[] = [
  { id: 1, code: "BK-001", name: "Rizal A.",    lapangan: "Lapangan B",       tanggal: "22 Apr 2025", sesi: "10:00 - 12:00", durasi: "2 jam", total: 240000, status: "confirmed"  },
  { id: 2, code: "BK-002", name: "Fajar M.",    lapangan: "Lapangan E (VIP)", tanggal: "22 Apr 2025", sesi: "12:00 - 14:00", durasi: "2 jam", total: 360000, status: "confirmed"  },
  { id: 3, code: "BK-003", name: "Bagas P.",    lapangan: "Lapangan A",       tanggal: "23 Apr 2025", sesi: "08:00 - 10:00", durasi: "2 jam", total: 240000, status: "pending"    },
  { id: 4, code: "BK-004", name: "Denny S.",    lapangan: "Lapangan C (VIP)", tanggal: "23 Apr 2025", sesi: "16:00 - 18:00", durasi: "2 jam", total: 360000, status: "confirmed"  },
  { id: 5, code: "BK-005", name: "Irfan H.",    lapangan: "Lapangan D",       tanggal: "24 Apr 2025", sesi: "14:00 - 16:00", durasi: "2 jam", total: 200000, status: "pending"    },
  { id: 6, code: "BK-006", name: "Andi W.",     lapangan: "Lapangan F",       tanggal: "24 Apr 2025", sesi: "18:00 - 20:00", durasi: "2 jam", total: 200000, status: "cancelled"  },
  { id: 7, code: "BK-007", name: "Hendra K.",   lapangan: "Lapangan A",       tanggal: "25 Apr 2025", sesi: "06:00 - 08:00", durasi: "2 jam", total: 240000, status: "confirmed"  },
  { id: 8, code: "BK-008", name: "Surya T.",    lapangan: "Lapangan B",       tanggal: "25 Apr 2025", sesi: "20:00 - 22:00", durasi: "2 jam", total: 240000, status: "pending"    },
];

// ── Types: Member ─────────────────────────────────────────────────────────────
export interface Member {
  id: number;
  name: string;
  phone: string;
  email: string;
  totalBooking: number;
  totalSpend: number;
  joinDate: string;
  status: "active" | "inactive";
}

export const members: Member[] = [
  { id: 1, name: "Rizal Ardiansyah",  phone: "0812-1111-2222", email: "rizal@gmail.com",  totalBooking: 12, totalSpend: 2880000, joinDate: "Jan 2025", status: "active"   },
  { id: 2, name: "Fajar Maulana",     phone: "0813-2222-3333", email: "fajar@gmail.com",  totalBooking: 9,  totalSpend: 3240000, joinDate: "Feb 2025", status: "active"   },
  { id: 3, name: "Bagas Pratama",     phone: "0814-3333-4444", email: "bagas@gmail.com",  totalBooking: 7,  totalSpend: 1400000, joinDate: "Jan 2025", status: "active"   },
  { id: 4, name: "Denny Saputra",     phone: "0815-4444-5555", email: "denny@gmail.com",  totalBooking: 15, totalSpend: 5400000, joinDate: "Des 2024", status: "active"   },
  { id: 5, name: "Irfan Hakim",       phone: "0816-5555-6666", email: "irfan@gmail.com",  totalBooking: 5,  totalSpend: 1800000, joinDate: "Mar 2025", status: "active"   },
  { id: 6, name: "Andi Wijaya",       phone: "0817-6666-7777", email: "andi@gmail.com",   totalBooking: 3,  totalSpend:  600000, joinDate: "Apr 2025", status: "inactive" },
  { id: 7, name: "Hendra Kusuma",     phone: "0818-7777-8888", email: "hendra@gmail.com", totalBooking: 8,  totalSpend: 1920000, joinDate: "Feb 2025", status: "active"   },
  { id: 8, name: "Surya Tanggara",    phone: "0819-8888-9999", email: "surya@gmail.com",  totalBooking: 4,  totalSpend:  800000, joinDate: "Mar 2025", status: "active"   },
];

// ── Types: Laporan ────────────────────────────────────────────────────────────
export interface LaporanBulanan {
  bulan: string;
  booking: number;
  pendapatan: number;
  member: number;
}

export const laporanBulanan: LaporanBulanan[] = [
  { bulan: "Nov 2024", booking: 38, pendapatan: 8200000,  member: 5  },
  { bulan: "Des 2024", booking: 52, pendapatan: 11400000, member: 8  },
  { bulan: "Jan 2025", booking: 61, pendapatan: 13800000, member: 12 },
  { bulan: "Feb 2025", booking: 58, pendapatan: 12600000, member: 7  },
  { bulan: "Mar 2025", booking: 74, pendapatan: 16200000, member: 10 },
  { bulan: "Apr 2025", booking: 45, pendapatan: 9800000,  member: 6  },
];
