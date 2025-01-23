"use client";

import { useState, useEffect } from "react";

// Define the expected structure of API responses
type ApiKeyResponse = {
  apiKey?: string; // For GET and POST responses
  error?: string;  // For error messages
  message?: string; // For DELETE success messages
};

export default function ApiKeyPage() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch the user's current API key
  useEffect(() => {
    async function fetchApiKey() {
      try {
        setLoading(true);

        const res = await fetch("/api/api-key", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          const errorData = (await res.json()) as ApiKeyResponse;
          throw new Error(errorData.error ?? "Failed to fetch API key.");
        }

        const data = (await res.json()) as ApiKeyResponse;
        if (data.apiKey) {
          setApiKey(data.apiKey);
        } else {
          setApiKey(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    }

    void fetchApiKey();
  }, []);

  // Generate a new API key
  async function handleGenerateApiKey() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/api-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errorData = (await res.json()) as ApiKeyResponse;
        throw new Error(errorData.error ?? "Failed to generate API key.");
      }

      const data = (await res.json()) as ApiKeyResponse;
      if (data.apiKey) {
        setApiKey(data.apiKey);
      } else {
        throw new Error("No API key returned from server.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }

  // Revoke the current API key
  async function handleRevokeApiKey() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/api-key", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errorData = (await res.json()) as ApiKeyResponse;
        throw new Error(errorData.error ?? "Failed to revoke API key.");
      }

      const data = (await res.json()) as ApiKeyResponse;
      if (data.message) {
        setApiKey(null); // Successfully revoked
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">API Key Management</h1>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          {apiKey ? (
            <div className="mb-4">
              <p className="font-medium">Your API Key:</p>
              <div className="bg-gray-100 p-2 rounded text-sm font-mono break-all">{apiKey}</div>
              <button
                onClick={handleRevokeApiKey}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Revoke API Key
              </button>
            </div>
          ) : (
            <div className="mb-4">
              <p>You do not have an API key currently.</p>
              <button
                onClick={handleGenerateApiKey}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Generate API Key
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
