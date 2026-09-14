import { useState } from 'react';

function UploadForm({ onUpload, busy }) {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file first");
    onUpload(file);
  };

  return (
    <form onSubmit={handleSubmit} className="filearea">
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit" className="animated-button" disabled={busy}>
        {busy ? "Uploading..." : "Generate Quiz"}
      </button>
    </form>
  );
}

export default UploadForm;