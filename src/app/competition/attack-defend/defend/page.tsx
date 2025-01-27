import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const DefensePage = () => {
  const [defenses, setDefenses] = useState<any[]>([]); // List of public defenses
  //const [userDefenses, setUserDefenses] = useState<any[]>([]); // Placeholder for user/team defenses
  const [form, setForm] = useState({ name: "", defensePrompt: "" }); // Form for new defense
  const [isLoading, setIsLoading] = useState(false);

  // Fetch defenses (public defenses)
  const fetchDefenses = async () => {
    try {
      const res = await fetch("/api/defense"); // Replace with your API
      if (!res.ok) throw new Error("Failed to fetch defenses.");
      const data = await res.json();
      setDefenses(data);
    } catch (error) {
      toast.error("Error fetching defenses.");
    }
  };

  // Fetch user/team-specific defenses (Placeholder)
//   const fetchUserDefenses = async () => {
//     try {
//       const res = await fetch("/api/defenses/user"); // Placeholder API
//       if (res.ok) {
//         const data = await res.json();
//         setUserDefenses(data);
//       } else {
//         console.warn("User-specific defense API is not yet implemented.");
//       }
//     } catch (error) {
//       console.error("Error fetching user defenses:", error);
//     }
//   };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Create a new defense
  const createDefense = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/defense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create defense.");
      toast.success("Defense created successfully!");
      fetchDefenses(); // Refresh defenses
    } catch (error) {
      toast.error("Error creating defense.");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a defense
//   const deleteDefense = async (id: string) => {
//     const confirm = window.confirm("Are you sure you want to delete this defense?");
//     if (!confirm) return;
//     try {
//       const res = await fetch(`/api/defense/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete defense.");
//       toast.success("Defense deleted successfully!");
//       fetchDefenses(); // Refresh defenses
//     } catch (error) {
//       toast.error("Error deleting defense.");
//     }
//   };

  useEffect(() => {
    fetchDefenses();
    // fetchUserDefenses(); // Placeholder call
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Defenses</h1>

      {/* Form to Create Defense */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Create New Defense</h2>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Defense Name"
          className="border rounded p-2 mb-2 w-full"
        />
        <textarea
          name="defensePrompt"
          value={form.defensePrompt}
          onChange={handleInputChange}
          placeholder="Defense Prompt"
          className="border rounded p-2 mb-2 w-full"
        />
        <button
          onClick={createDefense}
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {isLoading ? "Creating..." : "Create Defense"}
        </button>
      </div>

      {/* List of Public Defenses */}
      <h2 className="text-xl font-semibold mb-4">Available Defenses</h2>
      <div>
        {defenses.length === 0 ? (
          <p>No defenses found.</p>
        ) : (
          defenses.map((defense) => (
            <div key={defense.id} className="border p-4 rounded mb-4">
              <h3 className="font-bold">{defense.name}</h3>
              <p>{defense.description}</p>
              <button
                // onClick={() => deleteDefense(defense.id)}
                className="bg-red-500 text-white p-2 rounded mt-2"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DefensePage;
