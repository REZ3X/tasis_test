import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const formDataPayload = await request.formData();
        const formDataString = formDataPayload.get('formData');
        const formData = JSON.parse(formDataString);

        const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

        if (!GOOGLE_SCRIPT_URL) {
            throw new Error('Google Script URL not configured');
        }

        const fileUrls = {};

        for (const [key, value] of formDataPayload.entries()) {
            if (key.startsWith('intel_file_') || key.startsWith('program_file_') || key.startsWith('humas_file_')) {

                const arrayBuffer = await value.arrayBuffer();
                const base64 = Buffer.from(arrayBuffer).toString('base64');

                const divisionId = key.split('_file_')[0];
                const fileIndex = key.split('_file_')[1];

                if (!fileUrls[divisionId]) {
                    fileUrls[divisionId] = [];
                }

                fileUrls[divisionId].push({
                    name: value.name,
                    mimeType: value.type,
                    data: base64
                });
            }
        }

        const submissionData = {
            timestamp: new Date().toISOString(),
            nama: formData.nama,
            kelas: formData.kelas,
            priority1: formData.priority1,
            priority2: formData.priority2,
            priority3: formData.priority3,
            answers: formData.answers,
            files: fileUrls
        };

        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submissionData),
        });

        if (!response.ok) {
            throw new Error('Failed to submit to Google Sheets');
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error submitting form:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
