import * as React from 'react';
import { useState } from 'react';
import { Grid, GridColumn, GridRowClickEvent } from '@progress/kendo-react-grid';
import { PDFViewer } from '@progress/kendo-react-pdf-viewer';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

interface FileData {
    id: number;
    name: string;
    createdAt: string;
    file: File;
    previewUrl: string;
    fileType: string;
}

const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

export const FileUploadComponent: React.FC = () => {
    const [files, setFiles] = useState<FileData[]>([]);
    const [previewFile, setPreviewFile] = useState<FileData | null>(null);

    // Thêm file vào danh sách
    const handleAddFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = await Promise.all(Array.from(event.target.files).map(async (file) => ({
                id: Math.random(),
                name: file.name,
                createdAt: new Date().toLocaleString(),
                file: file,
                previewUrl: await convertToBase64(file),
                fileType: file.type.split('/')[1],
            })));
            setFiles((prev) => [...prev, ...newFiles]);
        }
    };

    // Xử lý kéo và thả file
    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const filesDropped = await Promise.all(Array.from(event.dataTransfer.files).map(async (file) => ({
            id: Math.random(),
            name: file.name,
            createdAt: new Date().toLocaleString(),
            file: file,
            previewUrl: await convertToBase64(file),
            fileType: file.type.split('/')[1],
        })));
        setFiles((prev) => [...prev, ...filesDropped]);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    // Xóa tệp khỏi danh sách
    const handleDeleteFile = (id: number) => {
        setFiles((prev) => prev.filter((file) => file.id !== id));
        if (previewFile && previewFile.id === id) {
            URL.revokeObjectURL(previewFile.previewUrl);
            setPreviewFile(null);
        }
    };

    // Xử lý khi nhấn vào một hàng
    const handleRowClick = (event: GridRowClickEvent) => {
        const clickedFile = event.dataItem as FileData;
        setPreviewFile(clickedFile);
    };

    return (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            {/* Bảng và Khu vực tải lên */}
            <div style={{ flex: 1 }}>
                <h2>Quản lý tệp</h2>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="file"
                        multiple
                        onChange={handleAddFiles}
                        style={{ display: 'none' }}
                        id="fileInput"
                    />
                    <label htmlFor="fileInput" className="k-button k-primary">
                        Thêm tệp
                    </label>
                </div>
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    style={{
                        border: '2px dashed #ccc',
                        padding: '20px',
                        marginBottom: '20px',
                        textAlign: 'center',
                        color: '#888',
                        cursor: 'pointer',
                    }}
                >
                    Kéo và thả tệp vào đây hoặc nhấn nút Thêm tệp
                </div>
                <Grid
                    data={files}
                    onRowClick={handleRowClick}
                    style={{ maxHeight: '400px' }}
                >
                    <GridColumn field="name" title="Tên tệp" />
                    <GridColumn field="createdAt" title="Thời gian tạo" />
                    <GridColumn
                        title="Hành động"
                        cell={(props) => (
                            <td>
                                <button
                                    onClick={() => handleDeleteFile(props.dataItem.id)}
                                    className="k-button k-danger"
                                >
                                    Xóa
                                </button>
                            </td>
                        )}
                    />
                </Grid>
            </div>

            {/* Khu vực xem trước tệp */}
            <div style={{ flex: 1 }}>
                <h2>Xem trước</h2>
                {previewFile ? (
                    previewFile.fileType === 'pdf' ? (
                        <PDFViewer data={previewFile.previewUrl} style={{ height: 615 }} />
                    ) : (
                        <DocViewer
                            pluginRenderers={DocViewerRenderers}
                            documents={[{ uri: previewFile.previewUrl, fileType: previewFile.fileType }]}
                        />
                    )
                ) : (
                    <p style={{ textAlign: 'center', color: '#666' }}>
                        Nhấn vào hàng trong bảng để xem trước tệp.
                    </p>
                )}
            </div>
        </div>
    );
};
