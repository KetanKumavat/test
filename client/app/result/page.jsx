"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ResultPage() {
  const router = useRouter();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    const formId = storedFormData ? storedFormData.formId : null;
    if (!formId) {
      router.push("/page1");
      return;
    }

    const fetchFormData = async () => {
      try {
        const response = await axios.get(
          `https://test-6ufl.onrender.com/api/fetchFormData/${formId}`
        );
        setFormData(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchFormData();
  }, [formId]);

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto my-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Form Data</h2>
      <div className="space-y-4">
        <div>
          <strong>Name:</strong> {formData.name}
        </div>
        <div>
          <strong>Email:</strong> {formData.email}
        </div>
        <div>
          <strong>Age:</strong> {formData.age}
        </div>
        <div>
          <strong>Gender:</strong> {formData.gender}
        </div>
        <div>
          <strong>Address:</strong> {formData.address}
        </div>
        <div>
          <strong>Phone Number:</strong> {formData.phoneNumber}
        </div>
        <div>
          <strong>Occupation:</strong> {formData.occupation}
        </div>
        <div>
          <strong>Institute:</strong> {formData.institute}
        </div>
        {/* <a
          href={`https://test-6ufl.onrender.com/api/downloadPDF/${formId}`}
          className="text-blue-500">
          Download PDF
        </a>/ */}
      </div>
    </div>
  );
}
