"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    formId: null,
    occupation: "",
    institute: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem("formData"));
    if (savedFormData) {
      setFormData({
        formId: savedFormData.formId,
        occupation: "",
        institute: "",
      });
    } else {
      router.push("/page2");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.occupation || !formData.institute) {
      alert("Please fill all the fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/page3", formData);
      alert("Form submitted successfully!");
      setIsSubmitted(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/downloadPDF/${formData.formId}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `form_${formData.formId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Step 3: Occupation and Institute
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          name="occupation"
          placeholder="Occupation"
          value={formData.occupation}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="institute"
          placeholder="Institute"
          value={formData.institute}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Submit
        </button>
        {isSubmitted && (
          <button
            onClick={handleDownloadPDF}
            className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Download PDF
          </button>
        )}
      </div>
    </div>
  );
}
