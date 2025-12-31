
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../Auth/auth"; // Update this path to your Firebase config
import { COLUMNS } from "../staticsComponents/managerRoleStatics";
import { InputCell } from "../functionContents/managerRoalFn";

/** 🔹 Create Empty Row */
const createEmptyRow = () =>
  COLUMNS.reduce((acc, col) => ({ ...acc, [col.key]: "" }), { id: Date.now() });

const ManageRole = () => {
  const [rows, setRows] = useState([createEmptyRow()]);
  const [loading, setLoading] = useState(false);

  const addRow = () => {
    try {
      setRows((prev) => [...prev, createEmptyRow()]);
    } catch (error) {
      console.error("Error adding row:", error);
      alert("Failed to add row. Please try again.");
    }
  };

  const updateRow = (id, field, value) => {
    try {
      setRows((prev) =>
        prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
      );
    } catch (error) {
      console.error("Error updating row:", error);
      alert("Failed to update row. Please try again.");
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Validate rows
      try {
        const hasEmptyFields = rows.some((row) =>
          COLUMNS.some((col) => !row[col.key] || row[col.key].trim() === "")
        );

        if (hasEmptyFields) {
          alert("Please fill in all fields before submitting.");
          return;
        }
      } catch (validationError) {
        console.error("Validation error:", validationError);
        alert("Validation failed. Please check your data.");
        return;
      }

      // Save to Firebase
      try {
        console.log("Starting data submission...");
        console.log("Number of rows:", rows.length);
        console.log("Database reference:", db);

        const promises = rows.map(async (row) => {
          try {
            const { id, ...rowData } = row;
            console.log("Saving row:", rowData);
            return await addDoc(collection(db, "vocapsCollection"), {
              eng: rowData.eng || "",
              hindi: rowData.hindi || "",
              createdAt: serverTimestamp(),
            });
          } catch (docError) {
            console.error("Error saving document:", docError);
            console.error("Error code:", docError.code);
            console.error("Error message:", docError.message);
            throw new Error(`Failed to save document: ${docError.message}`);
          }
        });

        await Promise.all(promises);

        alert("✅ Data submitted successfully!");
        console.log("✅ Submitted Data:", rows);
        setRows([createEmptyRow()]);
      } catch (firebaseError) {
        console.error("❌ Firebase error:", firebaseError);
        console.error("Error details:", {
          code: firebaseError.code,
          message: firebaseError.message,
          name: firebaseError.name,
        });
        alert(`❌ Database error: ${firebaseError.message}\n\nPlease check Firebase security rules.`);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to cancel? All changes will be lost."
      );
      if (confirmed) {
        setRows([createEmptyRow()]);
      }
    } catch (error) {
      console.error("Error canceling:", error);
      alert("Failed to cancel. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <div
        style={{
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <h2 style={{ margin: 0 }}>Risk Register</h2>
          <button
            onClick={addRow}
            disabled={loading}
            style={{
              color: "#e53e3e",
              background: "none",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              opacity: loading ? 0.5 : 1,
            }}
          >
            + Add Row
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#edf2f7" }}>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    style={{ padding: "16px 24px", textAlign: "left" }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  {COLUMNS.map((col) => (
                    <td key={col.key} style={{ padding: "12px 24px" }}>
                      <InputCell
                        value={row[col.key]}
                        placeholder={col.placeholder}
                        lang={col.lang}
                        onChangeValue={(val) => updateRow(row.id, col.key, val)}
                        disabled={loading}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            padding: "16px 24px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <button
            onClick={handleCancel}
            disabled={loading}
            style={{
              padding: "10px 24px",
              background: "#fff",
              color: "#4a5568",
              border: "1px solid #cbd5e0",
              borderRadius: "6px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "500",
              opacity: loading ? 0.5 : 1,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: "10px 24px",
              background: loading ? "#fc8181" : "#e53e3e",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageRole;
