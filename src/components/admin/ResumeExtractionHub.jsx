import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  Upload,
  FileText,
  Download,
  Search,
  Trash2,
  Pencil,
  Check,
  X,
  ExternalLink,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  RefreshCw,
  Folder,
  FolderOpen,
  ChevronDown,
  ChevronUp,
  Save,
  FileSpreadsheet
} from "lucide-react";

function triggerCsvDownload(filename, rows) {
  if (!rows || rows.length === 0) return;
  const escapeCsv = (val) => `"${String(val || "").replace(/"/g, '""')}"`;
  const lines = ["Name,Email,Phone"];
  rows.forEach((r) => {
    lines.push([escapeCsv(r.name), escapeCsv(r.email), escapeCsv(r.phone)].join(","));
  });
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function ResumeExtractionHub({ adminEmail = "" }) {
  // Directories & per-directory resumes cache
  const [directories, setDirectories] = useState([]);
  const [dirResumesMap, setDirResumesMap] = useState({}); // { [dirId]: Resume[] }
  const [loadingDirIds, setLoadingDirIds] = useState(new Set());
  const [expandedDirIds, setExpandedDirIds] = useState(new Set());
  const [loadingDirs, setLoadingDirs] = useState(true);

  // Saved CSVs Vault (independent of resume directories)
  const [savedCsvs, setSavedCsvs] = useState([]);
  const [loadingSavedCsvs, setLoadingSavedCsvs] = useState(true);
  const [savingCsvDirId, setSavingCsvDirId] = useState(null);
  const [renamingCsvId, setRenamingCsvId] = useState(null);
  const [renameCsvValue, setRenameCsvValue] = useState("");

  // Upload state
  const [uploadTargetMode, setUploadTargetMode] = useState("new"); // 'new' | 'existing'
  const [newDirName, setNewDirName] = useState("");
  const [targetExistingDirId, setTargetExistingDirId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const cancelUploadRef = useRef(false);
  const fileInputRef = useRef(null);

  // Directory rename state
  const [renamingDirId, setRenamingDirId] = useState(null);
  const [renameDirValue, setRenameDirValue] = useState("");

  // Per-directory search & selection
  const [dirSearchMap, setDirSearchMap] = useState({});
  const [selectedResumeIds, setSelectedResumeIds] = useState(new Set());

  // Inline resume edit state
  const [editingResumeId, setEditingResumeId] = useState(null);
  const [editResumeForm, setEditResumeForm] = useState({ name: "", email: "", phone: "" });
  const [savingResumeEdit, setSavingResumeEdit] = useState(false);

  const apiBase =
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_BACKEND_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    "https://server.datasenseai.com";

  const fetchDirectories = useCallback(async () => {
    if (!adminEmail) return;
    setLoadingDirs(true);
    try {
      const res = await fetch(`${apiBase}/careersense/admin/resume-extraction/directories`, {
        headers: { "x-admin-email": adminEmail }
      });
      const data = await res.json();
      if (data.success) {
        const dirs = data.directories || [];
        setDirectories(dirs);
        if (dirs.length > 0 && !targetExistingDirId) {
          setTargetExistingDirId(dirs[0]._id);
        }
      }
    } catch (err) {
      console.error("[ResumeExtractionHub] Fetch directories error:", err);
    } finally {
      setLoadingDirs(false);
    }
  }, [apiBase, adminEmail, targetExistingDirId]);

  const fetchSavedCsvs = useCallback(async () => {
    if (!adminEmail) return;
    setLoadingSavedCsvs(true);
    try {
      const res = await fetch(`${apiBase}/careersense/admin/resume-extraction/saved-csvs`, {
        headers: { "x-admin-email": adminEmail }
      });
      const data = await res.json();
      if (data.success) {
        setSavedCsvs(data.csvs || []);
      }
    } catch (err) {
      console.error("[ResumeExtractionHub] Fetch saved CSVs error:", err);
    } finally {
      setLoadingSavedCsvs(false);
    }
  }, [apiBase, adminEmail]);

  useEffect(() => {
    fetchDirectories();
    fetchSavedCsvs();
  }, [fetchDirectories, fetchSavedCsvs]);

  // Fetch resumes inside a specific directory
  const fetchDirectoryResumes = async (dirId) => {
    setLoadingDirIds((prev) => new Set(prev).add(dirId));
    try {
      const res = await fetch(`${apiBase}/careersense/admin/resume-extraction/directories/${dirId}/resumes`, {
        headers: { "x-admin-email": adminEmail }
      });
      const data = await res.json();
      if (data.success) {
        setDirResumesMap((prev) => ({ ...prev, [dirId]: data.records || [] }));
        return data.records || [];
      }
    } catch (err) {
      console.error("[ResumeExtractionHub] Fetch dir resumes error:", err);
    } finally {
      setLoadingDirIds((prev) => {
        const next = new Set(prev);
        next.delete(dirId);
        return next;
      });
    }
    return [];
  };

  // Toggle expand/collapse directory dropdown
  const handleToggleDirectory = async (dirId) => {
    const isExpanded = expandedDirIds.has(dirId);
    const next = new Set(expandedDirIds);
    if (isExpanded) {
      next.delete(dirId);
      setExpandedDirIds(next);
    } else {
      next.add(dirId);
      setExpandedDirIds(next);
      if (!dirResumesMap[dirId]) {
        await fetchDirectoryResumes(dirId);
      }
    }
  };

  // Chunked batch upload into a directory
  const handleFilesUpload = async (fileList) => {
    const files = Array.from(fileList || []);
    if (files.length === 0) return;

    cancelUploadRef.current = false;
    setUploading(true);
    setUploadStatus(null);

    try {
      // 1. Resolve or create target directory ONCE before sending chunks
      let resolvedDirId = uploadTargetMode === "existing" ? targetExistingDirId : "";
      if (!resolvedDirId) {
        const defaultName =
          newDirName.trim() ||
          `Resume Batch (${files.length}) - ${new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          })}`;

        const dirRes = await fetch(`${apiBase}/careersense/admin/resume-extraction/directories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-email": adminEmail
          },
          body: JSON.stringify({ name: defaultName })
        });
        const dirData = await dirRes.json();
        if (!dirRes.ok || !dirData.success || !dirData.directory) {
          throw new Error(dirData.message || "Failed to create target directory.");
        }
        resolvedDirId = dirData.directory._id;
        setDirectories((prev) => [dirData.directory, ...prev]);
        setNewDirName("");
      }

      // 2. Split into safe chunks: max 5 files or max 8MB per request
      const MAX_FILES_PER_BATCH = 5;
      const MAX_BYTES_PER_BATCH = 8 * 1024 * 1024;
      const batches = [];
      let currentBatch = [];
      let currentBytes = 0;

      for (const file of files) {
        if (
          currentBatch.length >= MAX_FILES_PER_BATCH ||
          (currentBatch.length > 0 && currentBytes + file.size > MAX_BYTES_PER_BATCH)
        ) {
          batches.push(currentBatch);
          currentBatch = [];
          currentBytes = 0;
        }
        currentBatch.push(file);
        currentBytes += file.size || 0;
      }
      if (currentBatch.length > 0) batches.push(currentBatch);

      setUploadProgress({
        totalFiles: files.length,
        processedFiles: 0,
        failedFiles: 0,
        completedBatches: 0,
        totalBatches: batches.length
      });

      let totalSuccess = 0;
      let totalFailed = 0;
      let batchCursor = 0;
      const CONCURRENCY = 2;

      const processNextBatch = async () => {
        while (batchCursor < batches.length && !cancelUploadRef.current) {
          const batchIdx = batchCursor++;
          const batch = batches[batchIdx];

          try {
            const formData = new FormData();
            formData.append("directoryId", resolvedDirId);
            batch.forEach((f) => formData.append("files", f));

            const res = await fetch(`${apiBase}/careersense/admin/resume-extraction/upload`, {
              method: "POST",
              headers: { "x-admin-email": adminEmail },
              body: formData
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
              throw new Error(data.message || `Batch ${batchIdx + 1} failed`);
            }

            const newRecords = data.records || [];
            const errCount = (data.errors || []).length;
            totalSuccess += newRecords.length;
            totalFailed += errCount;

            if (newRecords.length > 0) {
              setDirResumesMap((prev) => ({
                ...prev,
                [resolvedDirId]: [...newRecords, ...(prev[resolvedDirId] || [])]
              }));
            }
          } catch (err) {
            console.error(`[ResumeExtractionHub] Batch ${batchIdx + 1} error:`, err);
            totalFailed += batch.length;
          } finally {
            setUploadProgress((prev) =>
              prev
                ? {
                    ...prev,
                    processedFiles: prev.processedFiles + batch.length,
                    failedFiles: totalFailed,
                    completedBatches: prev.completedBatches + 1
                  }
                : null
            );
          }
        }
      };

      await Promise.all(
        Array.from({ length: Math.min(CONCURRENCY, batches.length) }, () => processNextBatch())
      );

      // Expand the target directory and refresh directory counts
      setExpandedDirIds((prev) => new Set(prev).add(resolvedDirId));
      await fetchDirectories();

      setUploadStatus({
        success: totalSuccess > 0,
        message: cancelUploadRef.current
          ? `Upload stopped. ${totalSuccess} resume(s) were extracted and saved.`
          : `Completed! Uploaded to S3 & extracted ${totalSuccess} of ${files.length} resume(s)${
              totalFailed > 0 ? ` (${totalFailed} failed)` : ""
            }.`
      });
    } catch (err) {
      setUploadStatus({
        success: false,
        message: err.message || "Upload failed."
      });
    } finally {
      setUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Directory Rename
  const handleRenameDirectory = async (dirId) => {
    const trimmed = renameDirValue.trim();
    if (!trimmed) return;
    try {
      const res = await fetch(`${apiBase}/careersense/admin/resume-extraction/directories/${dirId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": adminEmail
        },
        body: JSON.stringify({ name: trimmed })
      });
      const data = await res.json();
      if (data.success && data.directory) {
        setDirectories((prev) =>
          prev.map((d) => (d._id === dirId ? { ...d, name: data.directory.name } : d))
        );
        setRenamingDirId(null);
      }
    } catch (err) {
      console.error("[ResumeExtractionHub] Rename dir error:", err);
    }
  };

  // Delete Directory (does NOT affect Saved CSVs)
  const handleDeleteDirectory = async (dirId) => {
    try {
      const res = await fetch(`${apiBase}/careersense/admin/resume-extraction/directories/${dirId}`, {
        method: "DELETE",
        headers: { "x-admin-email": adminEmail }
      });
      const data = await res.json();
      if (data.success) {
        setDirectories((prev) => prev.filter((d) => d._id !== dirId));
        setDirResumesMap((prev) => {
          const next = { ...prev };
          delete next[dirId];
          return next;
        });
        setExpandedDirIds((prev) => {
          const next = new Set(prev);
          next.delete(dirId);
          return next;
        });
      }
    } catch (err) {
      console.error("[ResumeExtractionHub] Delete directory error:", err);
    }
  };

  // Save Directory as independent CSV snapshot into Saved CSVs Vault
  const handleSaveDirectoryCsv = async (dir) => {
    setSavingCsvDirId(dir._id);
    try {
      const res = await fetch(`${apiBase}/careersense/admin/resume-extraction/saved-csvs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": adminEmail
        },
        body: JSON.stringify({
          directoryId: dir._id,
          name: `${dir.name}.csv`
        })
      });
      const data = await res.json();
      if (data.success && data.csv) {
        setSavedCsvs((prev) => [data.csv, ...prev]);
        setUploadStatus({
          success: true,
          message: `Saved CSV "${data.csv.name}" (${data.csv.rowCount} rows) to Saved CSVs Directory. Deleting resumes later will not affect it.`
        });
      }
    } catch (err) {
      console.error("[ResumeExtractionHub] Save directory CSV error:", err);
    } finally {
      setSavingCsvDirId(null);
    }
  };

  // Download Directory CSV directly
  const handleDownloadDirectoryCsv = async (dir) => {
    let rows = dirResumesMap[dir._id];
    if (!rows) {
      rows = await fetchDirectoryResumes(dir._id);
    }
    triggerCsvDownload(`${dir.name || "extracted-resumes"}.csv`, rows);
  };

  // Saved CSV Vault actions: Rename, Download, Delete
  const handleRenameSavedCsv = async (csvId) => {
    const trimmed = renameCsvValue.trim();
    if (!trimmed) return;
    try {
      const res = await fetch(`${apiBase}/careersense/admin/resume-extraction/saved-csvs/${csvId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": adminEmail
        },
        body: JSON.stringify({ name: trimmed })
      });
      const data = await res.json();
      if (data.success && data.csv) {
        setSavedCsvs((prev) => prev.map((c) => (c._id === csvId ? data.csv : c)));
        setRenamingCsvId(null);
      }
    } catch (err) {
      console.error("[ResumeExtractionHub] Rename saved CSV error:", err);
    }
  };

  const handleDeleteSavedCsv = async (csvId) => {
    try {
      const res = await fetch(`${apiBase}/careersense/admin/resume-extraction/saved-csvs/${csvId}`, {
        method: "DELETE",
        headers: { "x-admin-email": adminEmail }
      });
      const data = await res.json();
      if (data.success) {
        setSavedCsvs((prev) => prev.filter((c) => c._id !== csvId));
      }
    } catch (err) {
      console.error("[ResumeExtractionHub] Delete saved CSV error:", err);
    }
  };

  // Inline Resume Edit / Delete
  const saveResumeEdit = async (dirId, resumeId) => {
    setSavingResumeEdit(true);
    try {
      const res = await fetch(`${apiBase}/careersense/admin/resume-extraction/${resumeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": adminEmail
        },
        body: JSON.stringify(editResumeForm)
      });
      const data = await res.json();
      if (data.success && data.record) {
        setDirResumesMap((prev) => ({
          ...prev,
          [dirId]: (prev[dirId] || []).map((r) => (r._id === resumeId ? data.record : r))
        }));
        setEditingResumeId(null);
      }
    } catch (err) {
      console.error("[ResumeExtractionHub] Update resume error:", err);
    } finally {
      setSavingResumeEdit(false);
    }
  };

  const handleDeleteResume = async (dirId, resumeId) => {
    try {
      const res = await fetch(`${apiBase}/careersense/admin/resume-extraction/${resumeId}`, {
        method: "DELETE",
        headers: { "x-admin-email": adminEmail }
      });
      const data = await res.json();
      if (data.success) {
        setDirResumesMap((prev) => ({
          ...prev,
          [dirId]: (prev[dirId] || []).filter((r) => r._id !== resumeId)
        }));
        setDirectories((prev) =>
          prev.map((d) =>
            d._id === dirId ? { ...d, totalCount: Math.max(0, (d.totalCount || 1) - 1) } : d
          )
        );
        setSelectedResumeIds((prev) => {
          const next = new Set(prev);
          next.delete(resumeId);
          return next;
        });
      }
    } catch (err) {
      console.error("[ResumeExtractionHub] Delete resume error:", err);
    }
  };

  const handleBulkDeleteInDir = async (dirId, dirResumes) => {
    const idsInDir = dirResumes.filter((r) => selectedResumeIds.has(r._id)).map((r) => r._id);
    if (idsInDir.length === 0) return;
    try {
      const res = await fetch(`${apiBase}/careersense/admin/resume-extraction/bulk-delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": adminEmail
        },
        body: JSON.stringify({ ids: idsInDir })
      });
      const data = await res.json();
      if (data.success) {
        const deletedSet = new Set(idsInDir);
        setDirResumesMap((prev) => ({
          ...prev,
          [dirId]: (prev[dirId] || []).filter((r) => !deletedSet.has(r._id))
        }));
        setDirectories((prev) =>
          prev.map((d) =>
            d._id === dirId
              ? { ...d, totalCount: Math.max(0, (d.totalCount || idsInDir.length) - idsInDir.length) }
              : d
          )
        );
        setSelectedResumeIds((prev) => {
          const next = new Set(prev);
          idsInDir.forEach((id) => next.delete(id));
          return next;
        });
      }
    } catch (err) {
      console.error("[ResumeExtractionHub] Bulk delete error:", err);
    }
  };

  // Summary metrics across all directories & saved CSVs
  const metrics = useMemo(() => {
    const totalDirs = directories.length;
    const totalResumes = directories.reduce((acc, d) => acc + (d.totalCount || 0), 0);
    const totalEmails = directories.reduce((acc, d) => acc + (d.withEmail || 0), 0);
    const totalPhones = directories.reduce((acc, d) => acc + (d.withPhone || 0), 0);
    return { totalDirs, totalResumes, totalEmails, totalPhones, totalCsvs: savedCsvs.length };
  }, [directories, savedCsvs]);

  return (
    <div className="space-y-6">
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Resume Directories</span>
            <Folder size={15} className="text-teal-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">{metrics.totalDirs}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">{metrics.totalResumes} total resumes in S3</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Valid Emails</span>
            <Mail size={15} className="text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">{metrics.totalEmails}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Ready for Email Marketing CSV</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Phone Numbers</span>
            <Phone size={15} className="text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">{metrics.totalPhones}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">CRM WhatsApp format (+CC)</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Saved CSVs Vault</span>
            <FileSpreadsheet size={15} className="text-indigo-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">{metrics.totalCsvs}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Independent of resume deletion</div>
        </div>
      </div>

      {/* Upload Dropzone Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Upload Resumes into a Directory</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload any number of PDF, DOCX, or TXT resumes (auto-chunked in safe batches). Stored in{" "}
              <code className="text-[11px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
                careersense/admin-resume-extraction/
              </code>{" "}
              on AWS S3, separate from platform user CRM resumes.
            </p>
          </div>
        </div>

        {/* Target Directory Selector */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <div className="md:col-span-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setUploadTargetMode("new")}
              className={`flex-1 rounded-lg py-1.5 px-2.5 text-xs font-bold transition cursor-pointer ${
                uploadTargetMode === "new"
                  ? "bg-[#0b132b] text-teal-300 shadow-2xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              + New Directory
            </button>
            <button
              type="button"
              disabled={directories.length === 0}
              onClick={() => setUploadTargetMode("existing")}
              className={`flex-1 rounded-lg py-1.5 px-2.5 text-xs font-bold transition cursor-pointer disabled:opacity-40 ${
                uploadTargetMode === "existing"
                  ? "bg-[#0b132b] text-teal-300 shadow-2xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              Existing Directory
            </button>
          </div>

          <div className="md:col-span-8">
            {uploadTargetMode === "new" ? (
              <input
                type="text"
                value={newDirName}
                onChange={(e) => setNewDirName(e.target.value)}
                placeholder="Directory name (optional, e.g. '1000 Data Analyst Leads - Nov 26')"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            ) : (
              <select
                value={targetExistingDirId}
                onChange={(e) => setTargetExistingDirId(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {directories.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name} ({d.totalCount || 0} resumes)
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (!uploading && e.dataTransfer.files?.length) {
              handleFilesUpload(e.dataTransfer.files);
            }
          }}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center transition cursor-pointer ${
            isDragging
              ? "border-teal-500 bg-teal-50/50"
              : "border-slate-200 hover:border-teal-500 bg-slate-50/70"
          } ${uploading ? "opacity-70 cursor-wait" : ""}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
            onChange={(e) => handleFilesUpload(e.target.files)}
            className="hidden"
          />

          {uploading ? (
            <div className="space-y-3 max-w-md mx-auto">
              <Loader2 size={28} className="mx-auto text-teal-600 animate-spin" />
              <div className="text-sm font-bold text-slate-800">
                {uploadProgress
                  ? `Uploading & Extracting: ${uploadProgress.processedFiles} / ${uploadProgress.totalFiles} resumes`
                  : "Creating directory & preparing upload..."}
              </div>
              {uploadProgress && (
                <>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-600 transition-all duration-300"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round((uploadProgress.processedFiles / uploadProgress.totalFiles) * 100)
                        )}%`
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>
                      Batch {uploadProgress.completedBatches} of {uploadProgress.totalBatches}
                    </span>
                    <span>
                      {Math.round((uploadProgress.processedFiles / uploadProgress.totalFiles) * 100)}%
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelUploadRef.current = true;
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition cursor-pointer"
                  >
                    <X size={12} />
                    <span>Stop Remaining Batches</span>
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center mx-auto mb-2">
                <Upload size={20} />
              </div>
              <div className="text-sm font-bold text-slate-800">
                Click or drag & drop resume files here
              </div>
              <div className="text-xs text-slate-400">
                Supports batch upload (.PDF, .DOCX, .TXT) • Extracts Name, Email & CRM-formatted Phone
              </div>
            </div>
          )}
        </div>

        {uploadStatus && (
          <div
            className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
              uploadStatus.success
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-700"
            }`}
          >
            {uploadStatus.success ? (
              <CheckCircle2 size={15} className="shrink-0" />
            ) : (
              <AlertCircle size={15} className="shrink-0" />
            )}
            <span>{uploadStatus.message}</span>
          </div>
        )}
      </div>

      {/* RESUME DIRECTORIES (Collapsible Folders) */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen size={17} className="text-teal-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">Resume Upload Directories</h3>
              <p className="text-[11px] text-slate-400">
                Expand any directory to inspect extracted candidates, save a CSV snapshot, or download directly.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={fetchDirectories}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition cursor-pointer"
          >
            <RefreshCw size={12} className={loadingDirs ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>

        {loadingDirs ? (
          <div className="py-10 text-center text-xs text-slate-400">
            <Loader2 size={20} className="mx-auto animate-spin text-teal-600 mb-2" />
            Loading resume directories...
          </div>
        ) : directories.length === 0 ? (
          <div className="py-10 text-center text-xs text-slate-400">
            No resume directories yet. Upload resumes above to create your first directory.
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {directories.map((dir) => {
              const isExpanded = expandedDirIds.has(dir._id);
              const isLoadingResumes = loadingDirIds.has(dir._id);
              const isRenaming = renamingDirId === dir._id;
              const rawResumes = dirResumesMap[dir._id] || [];
              const q = (dirSearchMap[dir._id] || "").toLowerCase().trim();
              const filteredResumes = q
                ? rawResumes.filter(
                    (r) =>
                      (r.name && r.name.toLowerCase().includes(q)) ||
                      (r.email && r.email.toLowerCase().includes(q)) ||
                      (r.phone && r.phone.toLowerCase().includes(q)) ||
                      (r.originalFileName && r.originalFileName.toLowerCase().includes(q))
                  )
                : rawResumes;
              const selectedInDirCount = filteredResumes.filter((r) => selectedResumeIds.has(r._id)).length;

              return (
                <div key={dir._id} className="bg-white">
                  {/* Directory Header Row */}
                  <div className="p-4 flex flex-wrap items-center justify-between gap-3 hover:bg-slate-50/70 transition">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <button
                        type="button"
                        onClick={() => handleToggleDirectory(dir._id)}
                        className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0 hover:bg-teal-100 transition cursor-pointer"
                        title={isExpanded ? "Collapse directory" : "Expand directory"}
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      {isRenaming ? (
                        <div className="flex items-center gap-1.5 flex-1 max-w-md">
                          <input
                            type="text"
                            value={renameDirValue}
                            onChange={(e) => setRenameDirValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleRenameDirectory(dir._id);
                              if (e.key === "Escape") setRenamingDirId(null);
                            }}
                            autoFocus
                            className="flex-1 rounded-lg border border-teal-400 px-2.5 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleRenameDirectory(dir._id)}
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 cursor-pointer"
                          >
                            <Check size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setRenamingDirId(null)}
                            className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200 cursor-pointer"
                          >
                            <X size={13} />
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => handleToggleDirectory(dir._id)}
                          className="min-w-0 cursor-pointer"
                        >
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-slate-900 truncate">{dir.name}</span>
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                              {dir.totalCount || 0} resumes
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-3">
                            <span>
                              Uploaded:{" "}
                              {new Date(dir.createdAt).toLocaleString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </span>
                            <span>• {dir.withEmail || 0} emails</span>
                            <span>• {dir.withPhone || 0} phones</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Directory Actions */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setRenamingDirId(dir._id);
                          setRenameDirValue(dir.name || "");
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition cursor-pointer"
                        title="Rename Directory"
                      >
                        <Pencil size={12} />
                        <span>Rename</span>
                      </button>

                      <button
                        type="button"
                        disabled={savingCsvDirId === dir._id || (dir.totalCount || 0) === 0}
                        onClick={() => handleSaveDirectoryCsv(dir)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition cursor-pointer disabled:opacity-40"
                        title="Save independent CSV snapshot to Saved CSVs Vault"
                      >
                        {savingCsvDirId === dir._id ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <Save size={12} />
                        )}
                        <span>Save CSV</span>
                      </button>

                      <button
                        type="button"
                        disabled={(dir.totalCount || 0) === 0}
                        onClick={() => handleDownloadDirectoryCsv(dir)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0b132b] hover:bg-slate-800 text-teal-300 text-xs font-bold transition cursor-pointer disabled:opacity-40"
                        title="Download CSV"
                      >
                        <Download size={12} />
                        <span>Download CSV</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteDirectory(dir._id)}
                        className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-rose-50 hover:border-rose-200 text-rose-600 transition cursor-pointer"
                        title="Delete Directory & Resumes (Saved CSVs remain safe)"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Directory Dropdown Body */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-slate-50/40 p-4 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="relative flex-1 max-w-sm">
                          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            value={dirSearchMap[dir._id] || ""}
                            onChange={(e) =>
                              setDirSearchMap((prev) => ({ ...prev, [dir._id]: e.target.value }))
                            }
                            placeholder="Search inside this directory..."
                            className="w-full rounded-xl border border-slate-200 bg-white pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </div>

                        {selectedInDirCount > 0 && (
                          <button
                            type="button"
                            onClick={() => handleBulkDeleteInDir(dir._id, filteredResumes)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition cursor-pointer"
                          >
                            <Trash2 size={12} />
                            <span>Delete Selected ({selectedInDirCount})</span>
                          </button>
                        )}
                      </div>

                      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                              <th className="py-2.5 px-3 w-10">
                                <input
                                  type="checkbox"
                                  checked={
                                    filteredResumes.length > 0 &&
                                    filteredResumes.every((r) => selectedResumeIds.has(r._id))
                                  }
                                  onChange={() => {
                                    const ids = filteredResumes.map((r) => r._id);
                                    const allSelected =
                                      ids.length > 0 && ids.every((id) => selectedResumeIds.has(id));
                                    const next = new Set(selectedResumeIds);
                                    if (allSelected) ids.forEach((id) => next.delete(id));
                                    else ids.forEach((id) => next.add(id));
                                    setSelectedResumeIds(next);
                                  }}
                                  className="h-3.5 w-3.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                                />
                              </th>
                              <th className="py-2.5 px-3">Candidate Name</th>
                              <th className="py-2.5 px-3">Email Address</th>
                              <th className="py-2.5 px-3">Phone Number</th>
                              <th className="py-2.5 px-3">Resume (S3)</th>
                              <th className="py-2.5 px-3 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-xs">
                            {isLoadingResumes ? (
                              <tr>
                                <td colSpan={6} className="py-8 text-center text-slate-400">
                                  <Loader2 size={18} className="mx-auto animate-spin text-teal-600 mb-1" />
                                  Loading resumes in directory...
                                </td>
                              </tr>
                            ) : filteredResumes.length === 0 ? (
                              <tr>
                                <td colSpan={6} className="py-8 text-center text-slate-400">
                                  No resumes found in this directory.
                                </td>
                              </tr>
                            ) : (
                              filteredResumes.map((r) => {
                                const isEditing = editingResumeId === r._id;
                                const isChecked = selectedResumeIds.has(r._id);

                                return (
                                  <tr key={r._id} className="hover:bg-slate-50/80 transition">
                                    <td className="py-2.5 px-3">
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => {
                                          const next = new Set(selectedResumeIds);
                                          if (isChecked) next.delete(r._id);
                                          else next.add(r._id);
                                          setSelectedResumeIds(next);
                                        }}
                                        className="h-3.5 w-3.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                                      />
                                    </td>

                                    <td className="py-2.5 px-3 font-bold text-slate-800">
                                      {isEditing ? (
                                        <input
                                          type="text"
                                          value={editResumeForm.name}
                                          onChange={(e) =>
                                            setEditResumeForm((p) => ({ ...p, name: e.target.value }))
                                          }
                                          className="w-full rounded-lg border border-teal-300 px-2 py-1 text-xs font-semibold"
                                        />
                                      ) : r.name ? (
                                        r.name
                                      ) : (
                                        <span className="text-amber-600 font-medium italic">Not detected</span>
                                      )}
                                    </td>

                                    <td className="py-2.5 px-3 text-slate-700">
                                      {isEditing ? (
                                        <input
                                          type="email"
                                          value={editResumeForm.email}
                                          onChange={(e) =>
                                            setEditResumeForm((p) => ({ ...p, email: e.target.value }))
                                          }
                                          className="w-full rounded-lg border border-teal-300 px-2 py-1 text-xs"
                                        />
                                      ) : r.email ? (
                                        <span className="font-medium text-slate-800">{r.email}</span>
                                      ) : (
                                        <span className="text-amber-600 font-medium italic">Not detected</span>
                                      )}
                                    </td>

                                    <td className="py-2.5 px-3 font-mono text-[11.5px]">
                                      {isEditing ? (
                                        <input
                                          type="text"
                                          value={editResumeForm.phone}
                                          onChange={(e) =>
                                            setEditResumeForm((p) => ({ ...p, phone: e.target.value }))
                                          }
                                          className="w-full rounded-lg border border-teal-300 px-2 py-1 text-xs font-mono"
                                        />
                                      ) : r.phone ? (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/70 font-semibold">
                                          {r.phone}
                                        </span>
                                      ) : (
                                        <span className="text-slate-400 italic font-sans">Not detected</span>
                                      )}
                                    </td>

                                    <td className="py-2.5 px-3">
                                      <a
                                        href={r.s3Url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:underline max-w-[190px] truncate"
                                        title={r.originalFileName}
                                      >
                                        <span className="truncate">{r.originalFileName}</span>
                                        <ExternalLink size={11} className="shrink-0" />
                                      </a>
                                    </td>

                                    <td className="py-2.5 px-3 text-right">
                                      <div className="inline-flex items-center gap-1.5">
                                        {isEditing ? (
                                          <>
                                            <button
                                              type="button"
                                              disabled={savingResumeEdit}
                                              onClick={() => saveResumeEdit(dir._id, r._id)}
                                              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 cursor-pointer"
                                            >
                                              {savingResumeEdit ? (
                                                <Loader2 size={12} className="animate-spin" />
                                              ) : (
                                                <Check size={12} />
                                              )}
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => setEditingResumeId(null)}
                                              className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200 cursor-pointer"
                                            >
                                              <X size={12} />
                                            </button>
                                          </>
                                        ) : (
                                          <>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setEditingResumeId(r._id);
                                                setEditResumeForm({
                                                  name: r.name || "",
                                                  email: r.email || "",
                                                  phone: r.phone || ""
                                                });
                                              }}
                                              className="p-1.5 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 cursor-pointer"
                                            >
                                              <Pencil size={12} />
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => handleDeleteResume(dir._id, r._id)}
                                              className="p-1.5 rounded-lg bg-slate-50 text-rose-600 hover:bg-rose-50 border border-slate-200 cursor-pointer"
                                            >
                                              <Trash2 size={12} />
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SEPARATE SAVED CSVs DIRECTORY (Independent of Resume Deletions) */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-indigo-50/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet size={17} className="text-indigo-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">Saved CSVs Directory</h3>
              <p className="text-[11px] text-slate-500">
                Permanent CSV snapshots saved from your resume batches. Deleting resumes or directories above will{" "}
                <strong>never</strong> delete these saved CSVs.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={fetchSavedCsvs}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition cursor-pointer"
          >
            <RefreshCw size={12} className={loadingSavedCsvs ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>

        {loadingSavedCsvs ? (
          <div className="py-8 text-center text-xs text-slate-400">
            <Loader2 size={18} className="mx-auto animate-spin text-indigo-600 mb-1" />
            Loading saved CSVs...
          </div>
        ) : savedCsvs.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No saved CSVs yet. Click <strong>Save CSV</strong> on any resume directory above to preserve it here.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {savedCsvs.map((csv) => {
              const isRenaming = renamingCsvId === csv._id;
              return (
                <div
                  key={csv._id}
                  className="p-4 flex flex-wrap items-center justify-between gap-3 hover:bg-slate-50/70 transition"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0">
                      <FileText size={15} />
                    </div>

                    {isRenaming ? (
                      <div className="flex items-center gap-1.5 flex-1 max-w-md">
                        <input
                          type="text"
                          value={renameCsvValue}
                          onChange={(e) => setRenameCsvValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleRenameSavedCsv(csv._id);
                            if (e.key === "Escape") setRenamingCsvId(null);
                          }}
                          autoFocus
                          className="flex-1 rounded-lg border border-indigo-400 px-2.5 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleRenameSavedCsv(csv._id)}
                          className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 cursor-pointer"
                        >
                          <Check size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setRenamingCsvId(null)}
                          className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200 cursor-pointer"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ) : (
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-slate-900 truncate">{csv.name}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {csv.rowCount || (csv.rows || []).length} candidates
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2 flex-wrap">
                          {csv.sourceDirectoryName && (
                            <span>Source: {csv.sourceDirectoryName} •</span>
                          )}
                          <span>
                            Saved:{" "}
                            {new Date(csv.createdAt).toLocaleString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setRenamingCsvId(csv._id);
                        setRenameCsvValue(csv.name || "");
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition cursor-pointer"
                    >
                      <Pencil size={12} />
                      <span>Rename</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => triggerCsvDownload(csv.name || "saved-resumes.csv", csv.rows || [])}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition cursor-pointer"
                    >
                      <Download size={12} />
                      <span>Download</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteSavedCsv(csv._id)}
                      className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-rose-50 hover:border-rose-200 text-rose-600 transition cursor-pointer"
                      title="Delete Saved CSV"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
