import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="p-3">{props.record.name}</td>
    <td className="p-3">{props.record.position}</td>
    <td className="p-3">{props.record.level}</td>
    <td className="p-3">
      <div className="flex gap-2">
        <Link
          className="border px-3 py-1 rounded hover:bg-gray-100"
          to={`/edit/${props.record._id}`}
        >
          Edit
        </Link>

        <button
          className="border px-3 py-1 rounded hover:bg-gray-100"
          onClick={() => props.deleteRecord(props.record._id)}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // FETCH ONCE (FIXED)
  useEffect(() => {
    async function getRecords() {
      const response = await fetch("http://localhost:5050/record/");

      if (!response.ok) {
        console.error("Error fetching records:", response.statusText);
        return;
      }

      const data = await response.json();
      setRecords(data);
    }

    getRecords();
  }, []); // ✅ FIXED

  // DELETE
  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE",
    });

    setRecords((prev) => prev.filter((r) => r._id !== id));
  }

  function recordList() {
    return records.map((record) => (
      <Record
        key={record._id}
        record={record}
        deleteRecord={deleteRecord}
      />
    ));
  }

  return (
    <div>
      <h3 className="text-lg font-semibold p-4">Employee Records</h3>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}