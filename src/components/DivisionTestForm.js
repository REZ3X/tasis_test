'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaCheckCircle, FaUpload, FaTrash, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

function Footer() {
    return (
        <div className="mt-8 text-center pb-4">
            <p className="text-xs sm:text-sm font-bold" style={{ color: '#999' }}>
                Created by{' '}
                <a
                    href="https://rejaka.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-black hover:underline transition-all"
                    style={{ color: '#ebae3b' }}
                >
                    rejaka.id
                </a>
                {' '}for TASIS
            </p>
        </div>
    );
}

const DIVISIONS = [
    {
        id: 'intel',
        name: 'Divisi Intel',
        questions: [
            'Jenis informasi apa yang dapat menjadi tanda-tanda awal bahwa seorang siswa mungkin berpotensi melakukan pelanggaran tata tertib?',
            'Bagaimana cara mengumpulkan informasi tanda awal pelanggaran tanpa membuat siswa merasa diawasi secara berlebihan atau tidak nyaman?',
            'Bagaimana divisi intel dapat membedakan mana perilaku yang benar-benar perlu diperhatikan dari yang hanya kebetulan atau tidak berkaitan dengan pelanggaran?',
            'Sistem pencatatan seperti apa yang paling mudah dipakai dan membantu memastikan setiap laporan indikasi pelanangan tetap jelas, rapi, dan tidak menimbulkan salah paham?',
            'Bagaimana mengatur siapa yang boleh melihat informasi sensitif, dan apa langkah yang perlu dilakukan jika terjadi kebocoran informasi agar tidak menimbulkan masalah bagi siswa maupun sekolah?',
            'Prosedur apa yang sebaiknya dilakukan ketika muncul indikasi pelanggaran, mulai dari pengecekan awal hingga upaya pencegahan sebelum pelanggaran benar-benar terjadi?'
        ]
    },
    {
        id: 'program',
        name: 'Divisi Program/Media',
        questions: [
            'Menurutmu, konten seperti apa yang paling cocok untuk meningkatkan engagement TaSis?',
            'Apakah kamu memiliki pengalaman dalam editing foto/video, desain, atau pengelolaan media sosial (akun pribadi/kelas)? Jika iya, jelaskan juga aplikasi atau software apa saja yang kamu kuasai, seperti CapCut, Canva, VN, Photoshop, dan lainnya. Sertakan bukti hasil karya yang dibuat secara individu/tanpa bantuan orang lain (foto/video/desain/file)',
            'Saat membutuhkan dokumentasi kegiatan sekolah, bagaimana cara anggota media meminta izin foto/video kepada siswa atau guru tanpa membuat mereka merasa terpaksa atau tidak nyaman?',
            'Bagaimana kamu dapat membedakan mana ide konten yang benar-benar membantu edukasi tata tertib dan mana yang hanya terlihat lucu/menarik tetapi dapat disalahartikan atau kurang sesuai suasana sekolah?',
            'Sistem pengarsipan apa yang paling efektif untuk menyimpan dokumentasi kegiatan TaSis, bahan konten, dan caption agar tidak terjadi salah unggah atau kebingungan antar anggota?',
            'Jika suatu saat kamu diminta membuat konten dalam waktu singkat atau secara mendadak, apakah kamu bersedia? Jelaskan juga bagaimana caramu mengatur waktu, menentukan prioritas, dan memastikan hasil kontennya tetap rapi, jelas, dan sesuai standar TaSis meskipun dikerjakan dalam kondisi terbatas.'
        ]
    },
    {
        id: 'humas',
        name: 'Divisi Humas',
        questions: [
            'Dalam menyampaikan informasi dari TaSis kepada siswa atau guru, bagaimana caramu memastikan bahwa pesan yang kamu sampaikan jelas, runtut, sopan, dan tidak menimbulkan salah tafsir, terutama ketika topiknya sensitif atau rawan disalahpahami?',
            'Ketika berhadapan dengan siswa yang bertanya atau merasa kebingungan mengenai aturan atau kegiatan TaSis, bagaimana langkahmu untuk memberi penjelasan dengan bahasa yang ramah, netral, tidak menggurui, dan tetap merepresentasikan TaSis secara positif?',
            'Jika kamu menerima komentar, kritik, atau masukan dari siswa mengenai kegiatan atau cara kerja TaSis, bagaimana caramu menanganinya, serta memastikan masukan itu sampai ke koordinator/pembina tanpa menimbulkan kesalahpahaman?',
            'Dalam situasi mendadak ketika kamu harus menyampaikan pengumuman penting, apa saja langkah yang akan kamu lakukan mulai dari mengonfirmasi keaslian informasi, memilih gaya bahasa yang tepat, hingga memastikan bahwa siswa dan guru menerima pesan tersebut secara utuh dan tidak salah mengerti?',
            'Divisi Humas sering berhadapan dengan situasi yang membutuhkan komunikasi langsung di depan banyak orang. Jika kamu diminta menjelaskan sesuatu, mempresentasikan informasi, atau berbicara di depan siswa/guru, bagaimana kamu menilai kemampuan presentasi dan public speaking-mu, serta strategi apa yang akan kamu gunakan agar penyampaianmu tetap lancar dan meyakinkan?',
            'Dalam menjalankan tugasnya, Humas perlu membangun hubungan baik dengan siswa, guru, dan divisi lain. Menurutmu, sejauh mana kemampuanmu dalam menjalin relasi, dan bagaimana cara kamu menjaga hubungan tersebut agar komunikasi antar pihak tetap harmonis dan mendukung citra positif TaSis?'
        ]
    }
];

export default function DivisionTestForm() {
    const [step, setStep] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('tasis_test_step');
            return saved || 'welcome';
        }
        return 'welcome';
    });

    const [formData, setFormData] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('tasis_test_formData');
            return saved ? JSON.parse(saved) : {
                nama: '',
                kelas: '',
                priority1: '',
                priority2: '',
                priority3: '',
                answers: {}
            };
        }
        return {
            nama: '',
            kelas: '',
            priority1: '',
            priority2: '',
            priority3: '',
            answers: {}
        };
    });

    const [files, setFiles] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('tasis_test_disclaimer');
            return saved === 'true';
        }
        return false;
    });

    useEffect(() => {
        if (typeof window !== 'undefined' && step !== 'welcome' && step !== 'submitted') {
            localStorage.setItem('tasis_test_step', step);
        }
    }, [step]);

    useEffect(() => {
        if (typeof window !== 'undefined' && (formData.nama || formData.kelas || Object.keys(formData.answers).length > 0)) {
            localStorage.setItem('tasis_test_formData', JSON.stringify(formData));
        }
    }, [formData]);

    useEffect(() => {
        if (typeof window !== 'undefined' && acceptedDisclaimer) {
            localStorage.setItem('tasis_test_disclaimer', 'true');
        }
    }, [acceptedDisclaimer]);

    const clearSavedData = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('tasis_test_step');
            localStorage.removeItem('tasis_test_formData');
            localStorage.removeItem('tasis_test_disclaimer');
        }
    };

    const getAvailableDivisions = (excludeIds = []) => {
        return DIVISIONS.filter(div => !excludeIds.includes(div.id));
    };

    const handleFileChange = (divisionId, e) => {
        const selectedFiles = Array.from(e.target.files).slice(0, 2);
        setFiles(prev => ({
            ...prev,
            [divisionId]: selectedFiles
        }));
    };

    const removeFile = (divisionId, fileIndex) => {
        setFiles(prev => ({
            ...prev,
            [divisionId]: prev[divisionId].filter((_, idx) => idx !== fileIndex)
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {

            const uploadData = new FormData();
            uploadData.append('formData', JSON.stringify(formData));

            Object.keys(files).forEach(divisionId => {
                files[divisionId]?.forEach((file, index) => {
                    uploadData.append(`${divisionId}_file_${index}`, file);
                });
            });

            const response = await fetch('/api/submit-test', {
                method: 'POST',
                body: uploadData,
            });

            const data = await response.json();

            if (data.success) {
                clearSavedData();
                setStep('submitted');
            } else {
                setError('Gagal mengirim data. Silakan coba lagi.');
            }
        } catch (err) {
            setError('Terjadi kesalahan. Silakan coba lagi.');
            console.error('Submit error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (step === 'welcome') {
        return (
            <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8" style={{ backgroundColor: '#0d1216' }}>
                <div className="w-full max-w-3xl rounded-lg shadow-2xl p-4 sm:p-6 md:p-12" style={{ backgroundColor: '#1a1f26', borderTop: '4px sm:6px solid #ebae3b', border: '2px solid #ebae3b' }}>
                    <div className="text-center mb-8">
                        <div className="mb-6 flex justify-center">
                            <Image
                                src="/logo.svg"
                                alt="TASIS Logo"
                                width={120}
                                height={120}
                                className="object-contain opacity-90"
                            />
                        </div>
                        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 tracking-tight leading-tight" style={{ color: '#ebae3b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            TES MINAT DIVISI TASIS
                        </h1>
                        <p className="text-lg xs:text-xl md:text-2xl font-bold mb-4 sm:mb-6" style={{ color: '#f2f3ff' }}>
                            Periode 2025/2026
                        </p>
                    </div>

                    <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-lg space-y-3 sm:space-y-4" style={{ backgroundColor: '#2a2f36', border: '2px solid #584928' }}>
                        <div className="flex items-start gap-3">
                            <div className="mt-1">
                                <FaCheckCircle style={{ color: '#ebae3b', fontSize: '1.25rem' }} />
                            </div>
                            <div>
                                <h2 className="text-base sm:text-lg font-black mb-2" style={{ color: '#ebae3b', textTransform: 'uppercase' }}>
                                    PERHATIAN PENTING!
                                </h2>
                                <p className="text-sm sm:text-base font-medium leading-relaxed" style={{ color: '#f2f3ff' }}>
                                    Tes ini bersifat <strong style={{ color: '#ebae3b' }}>RAHASIA</strong>. Segala informasi yang ada dalam tes ini dan segala hal mengenai TASIS hanya boleh dibicarakan dalam lingkungan TASIS.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="mt-1">
                                <FaCheckCircle style={{ color: '#ebae3b', fontSize: '1.25rem' }} />
                            </div>
                            <div>
                                <p className="text-sm sm:text-base font-medium leading-relaxed" style={{ color: '#f2f3ff' }}>
                                    Dengan melanjutkan, kamu menyetujui untuk menjaga kerahasiaan tes ini dan tidak membagikan informasi apapun kepada pihak luar.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="mt-1">
                                <FaCheckCircle style={{ color: '#ebae3b', fontSize: '1.25rem' }} />
                            </div>
                            <div>
                                <p className="text-sm sm:text-base font-medium leading-relaxed" style={{ color: '#f2f3ff' }}>
                                    Tes ini akan menguji minatmu terhadap 3 divisi TASIS: <strong>Intel</strong>, <strong>Program/Media</strong>, dan <strong>Humas</strong>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Saved Progress Notice */}
                    {formData.nama && (
                        <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: '#2a2f36', border: '2px solid #ebae3b' }}>
                            <div className="flex items-start gap-3">
                                <FaCheckCircle style={{ color: '#ebae3b', fontSize: '1.25rem', marginTop: '2px' }} />
                                <div>
                                    <p className="text-sm font-bold mb-2" style={{ color: '#ebae3b' }}>
                                        Data tersimpan ditemukan!
                                    </p>
                                    <p className="text-xs sm:text-sm mb-3" style={{ color: '#f2f3ff' }}>
                                        Kami menemukan data yang kamu isi sebelumnya. Kamu bisa melanjutkan dari terakhir kali atau mulai dari awal.
                                    </p>
                                    <button
                                        onClick={() => {
                                            clearSavedData();
                                            window.location.reload();
                                        }}
                                        className="text-xs sm:text-sm font-bold px-3 py-2 rounded hover:opacity-80 transition-all"
                                        style={{ backgroundColor: '#584928', color: '#f2f3ff' }}
                                    >
                                        Mulai dari Awal
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#2a2f36', border: '2px solid #3d321c' }}>
                        <label className="flex items-start gap-4 cursor-pointer group">
                            <div className="relative flex-shrink-0 mt-1">
                                <input
                                    type="checkbox"
                                    checked={acceptedDisclaimer}
                                    onChange={(e) => setAcceptedDisclaimer(e.target.checked)}
                                    className="peer absolute opacity-0 w-6 h-6 cursor-pointer"
                                />
                                <div
                                    className="w-6 h-6 border-2 rounded flex items-center justify-center transition-all peer-checked:bg-opacity-100"
                                    style={{
                                        borderColor: acceptedDisclaimer ? '#ebae3b' : '#584928',
                                        backgroundColor: acceptedDisclaimer ? '#ebae3b' : 'transparent'
                                    }}
                                >
                                    {acceptedDisclaimer && (
                                        <FaCheckCircle style={{ color: '#0d1216', fontSize: '1rem' }} />
                                    )}
                                </div>
                            </div>
                            <span className="text-sm sm:text-base font-bold leading-relaxed" style={{ color: '#f2f3ff' }}>
                                Saya memahami dan menyetujui untuk menjaga kerahasiaan tes ini
                            </span>
                        </label>
                    </div>

                    <button
                        onClick={() => setStep('data-diri')}
                        disabled={!acceptedDisclaimer}
                        className="w-full py-3 sm:py-4 rounded-lg font-black text-base sm:text-lg tracking-wide transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3"
                        style={{
                            backgroundColor: '#ebae3b',
                            color: '#0d1216',
                            textTransform: 'uppercase'
                        }}
                    >
                        MULAI TES
                        <FaArrowRight />
                    </button>

                    <Footer />
                </div>
            </div>
        );
    }

    if (step === 'submitted') {
        return (
            <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8" style={{ backgroundColor: '#0d1216' }}>
                <div className="w-full max-w-2xl rounded-lg shadow-lg p-4 sm:p-8 md:p-12" style={{ backgroundColor: '#1a1f26', borderTop: '4px solid #ebae3b' }}>
                    <div className="text-center mb-8">
                        <div className="mb-6 flex justify-center">
                            <Image
                                src="/logo.svg"
                                alt="TASIS Logo"
                                width={120}
                                height={120}
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-4xl font-black mb-4 tracking-tight" style={{ color: '#ebae3b', textTransform: 'uppercase' }}>
                            Terima Kasih!
                        </h1>
                        <p className="text-lg font-bold mb-6" style={{ color: '#f2f3ff' }}>
                            Jawaban tes kamu telah berhasil dikirim.
                        </p>
                    </div>

                    <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: '#2a2f36' }}>
                        <p className="text-sm mb-4 leading-relaxed" style={{ color: '#f2f3ff' }}>
                            Kami akan meninjau jawabanmu.
                        </p>
                        <p className="text-sm font-bold" style={{ color: '#ebae3b' }}>
                            Ingat: Jaga kerahasiaan tes ini!
                        </p>
                    </div>

                    <button
                        onClick={() => window.location.reload()}
                        className="w-full p-3 rounded-lg font-bold text-sm sm:text-base transition-all hover:opacity-90"
                        style={{ backgroundColor: '#3d321c', color: '#f2f3ff' }}
                    >
                        Kembali ke Halaman Awal
                    </button>

                    <Footer />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-6 sm:py-8 px-3 sm:px-4" style={{ backgroundColor: '#0d1216' }}>
            <div className="max-w-3xl mx-auto rounded-lg shadow-lg p-4 sm:p-6 md:p-10" style={{ backgroundColor: '#1a1f26', borderTop: '4px solid #ebae3b' }}>
                <div className="text-center mb-8">
                    <div className="mb-6 flex justify-center">
                        <Image
                            src="/logo.svg"
                            alt="TASIS Logo"
                            width={100}
                            height={100}
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 tracking-tight" style={{ color: '#ebae3b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Tes Minat Divisi TASIS
                    </h1>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-900 border border-red-700 text-red-200">
                        {error}
                    </div>
                )}

                {step === 'data-diri' && (
                    <div className="space-y-6">
                        <h2 className="text-lg sm:text-xl font-black" style={{ color: '#ebae3b', textTransform: 'uppercase' }}>
                            Data Diri
                        </h2>

                        <div>
                            <label className="block text-sm sm:text-base font-bold mb-2 tracking-wide" style={{ color: '#f2f3ff', textTransform: 'uppercase', fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', letterSpacing: '0.5px' }}>
                                Nama Lengkap <span style={{ color: '#ebae3b' }}>*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.nama}
                                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-600 font-medium text-sm sm:text-base"
                                style={{
                                    backgroundColor: '#2a2f36',
                                    color: '#f2f3ff',
                                    borderColor: '#3d321c'
                                }}
                            />
                        </div>

                        <div>
                            <label className="block text-sm sm:text-base font-bold mb-2 tracking-wide" style={{ color: '#f2f3ff', textTransform: 'uppercase', fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', letterSpacing: '0.5px' }}>
                                Kelas <span style={{ color: '#ebae3b' }}>*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.kelas}
                                onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                                placeholder="Contoh: 11 PPLG 1"
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-600 font-medium text-sm sm:text-base"
                                style={{
                                    backgroundColor: '#2a2f36',
                                    color: '#f2f3ff',
                                    borderColor: '#3d321c'
                                }}
                            />
                        </div>

                        <button
                            onClick={() => setStep('priority-1')}
                            disabled={!formData.nama || !formData.kelas}
                            className="w-full py-4 rounded-lg font-black text-lg tracking-wide transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            style={{
                                backgroundColor: '#ebae3b',
                                color: '#0d1216',
                                textTransform: 'uppercase'
                            }}
                        >
                            LANJUT
                            <FaArrowRight />
                        </button>
                    </div>
                )}

                {step === 'priority-1' && (
                    <DivisionQuestions
                        priority="1"
                        selectedDivision={formData.priority1}
                        availableDivisions={getAvailableDivisions()}
                        formData={formData}
                        setFormData={setFormData}
                        files={files}
                        handleFileChange={handleFileChange}
                        removeFile={removeFile}
                        onBack={() => setStep('data-diri')}
                        onNext={() => setStep('priority-2')}
                    />
                )}

                {step === 'priority-2' && (
                    <DivisionQuestions
                        priority="2"
                        selectedDivision={formData.priority2}
                        availableDivisions={getAvailableDivisions([formData.priority1])}
                        formData={formData}
                        setFormData={setFormData}
                        files={files}
                        handleFileChange={handleFileChange}
                        removeFile={removeFile}
                        onBack={() => setStep('priority-1')}
                        onNext={() => setStep('priority-3')}
                    />
                )}

                {step === 'priority-3' && (
                    <DivisionQuestions
                        priority="3"
                        selectedDivision={formData.priority3}
                        availableDivisions={getAvailableDivisions([formData.priority1, formData.priority2])}
                        formData={formData}
                        setFormData={setFormData}
                        files={files}
                        handleFileChange={handleFileChange}
                        removeFile={removeFile}
                        onBack={() => setStep('priority-2')}
                        onNext={handleSubmit}
                        isLast={true}
                        loading={loading}
                    />
                )}

                <Footer />
            </div>
        </div>
    );
}

function DivisionQuestions({
    priority,
    selectedDivision,
    availableDivisions,
    formData,
    setFormData,
    files,
    handleFileChange,
    removeFile,
    onBack,
    onNext,
    isLast = false,
    loading = false
}) {
    const division = DIVISIONS.find(d => d.id === selectedDivision);
    const priorityKey = `priority${priority}`;
    const canProceed = selectedDivision && division?.questions.every(
        (_, idx) => formData.answers[`${selectedDivision}_q${idx + 1}`]
    );

    return (
        <div className="space-y-6">
            <h2 className="text-lg sm:text-xl font-black" style={{ color: '#ebae3b', textTransform: 'uppercase' }}>
                Prioritas {priority}
            </h2>

            <div>
                <label className="block text-sm sm:text-base font-bold mb-2 tracking-wide" style={{ color: '#f2f3ff', textTransform: 'uppercase', fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', letterSpacing: '0.5px' }}>
                    Pilih Divisi <span style={{ color: '#ebae3b' }}>*</span>
                </label>
                <select
                    required
                    value={selectedDivision}
                    onChange={(e) => setFormData({ ...formData, [priorityKey]: e.target.value })}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-600 font-bold text-base"
                    style={{
                        backgroundColor: '#2a2f36',
                        color: '#f2f3ff',
                        borderColor: '#3d321c'
                    }}
                >
                    <option value="" style={{ color: '#999' }}>-- Pilih Divisi --</option>
                    {availableDivisions.map((div) => (
                        <option key={div.id} value={div.id} style={{ backgroundColor: '#2a2f36', color: '#f2f3ff', fontWeight: 'bold' }}>
                            {div.name}
                        </option>
                    ))}
                </select>
            </div>

            {division && (
                <>
                    <div className="space-y-6 mt-6">
                        {division.questions.map((question, idx) => (
                            <div key={idx}>
                                <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 leading-relaxed" style={{ color: '#f2f3ff' }}>
                                    {idx + 1}. {question} <span style={{ color: '#ebae3b' }}>*</span>
                                </label>
                                <textarea
                                    required
                                    rows="4"
                                    value={formData.answers[`${selectedDivision}_q${idx + 1}`] || ''}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        answers: {
                                            ...formData.answers,
                                            [`${selectedDivision}_q${idx + 1}`]: e.target.value
                                        }
                                    })}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-600 resize-none font-medium text-sm sm:text-base"
                                    style={{
                                        backgroundColor: '#2a2f36',
                                        color: '#f2f3ff',
                                        borderColor: '#3d321c'
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg" style={{ backgroundColor: '#2a2f36', border: '2px solid #3d321c' }}>
                        <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3" style={{ color: '#f2f3ff' }}>
                            Upload Bukti (Opsional - Maks 2 file)
                        </label>
                        <p className="text-xs mb-2 sm:mb-3" style={{ color: '#999' }}>
                            Upload portofolio, karya, atau bukti pendukung lainnya yang relevan dengan divisi ini
                        </p>

                        <input
                            type="file"
                            accept="image/*,video/*,.pdf,.doc,.docx"
                            multiple
                            onChange={(e) => handleFileChange(selectedDivision, e)}
                            className="hidden"
                            id={`file-upload-${selectedDivision}`}
                        />

                        {(!files[selectedDivision] || files[selectedDivision].length < 2) && (
                            <label
                                htmlFor={`file-upload-${selectedDivision}`}
                                className="flex items-center justify-center gap-2 w-full p-3 rounded-lg cursor-pointer transition-all hover:opacity-90 font-bold"
                                style={{ backgroundColor: '#3d321c', color: '#f2f3ff' }}
                            >
                                <FaUpload />
                                Pilih File
                            </label>
                        )}

                        {files[selectedDivision] && files[selectedDivision].length > 0 && (
                            <div className="mt-3 space-y-2">
                                {files[selectedDivision].map((file, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-2 rounded" style={{ backgroundColor: '#1a1f26' }}>
                                        <span className="text-xs truncate flex-1" style={{ color: '#f2f3ff' }}>
                                            {file.name}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(selectedDivision, idx)}
                                            className="ml-2 p-2 rounded hover:bg-red-600 transition-colors"
                                        >
                                            <FaTrash style={{ color: '#ef4444', fontSize: '0.875rem' }} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                <button
                    onClick={onBack}
                    className="w-full py-3 sm:py-4 rounded-lg font-black text-base sm:text-lg tracking-wide transition-all hover:opacity-90 flex items-center justify-center gap-2 sm:gap-3"
                    style={{
                        backgroundColor: '#3d321c',
                        color: '#f2f3ff',
                        textTransform: 'uppercase'
                    }}
                >
                    <FaArrowLeft />
                    KEMBALI
                </button>
                <button
                    onClick={onNext}
                    disabled={!canProceed || loading}
                    className="w-full py-3 sm:py-4 rounded-lg font-black text-base sm:text-lg tracking-wide transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3"
                    style={{
                        backgroundColor: '#ebae3b',
                        color: '#0d1216',
                        textTransform: 'uppercase'
                    }}
                >
                    {loading ? 'MENGIRIM...' : (isLast ? 'KIRIM' : 'LANJUT')}
                    {!loading && <FaArrowRight />}
                </button>
            </div>
        </div>
    );
}
