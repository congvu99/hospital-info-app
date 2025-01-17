import { PDFDocument } from 'pdf-lib';

// Function to convert a file to PDF
export const convertToPdf = async (file: File): Promise<string> => {
    if (file.type === 'application/pdf') {
        return URL.createObjectURL(file);
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText(`Nội dung của file: ${file.name}`, {
        x: 50,
        y: 700,
        size: 30
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    return URL.createObjectURL(pdfBlob);
};
