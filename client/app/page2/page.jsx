"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page2() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    formId: null,
    address: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem("formData"));
    if (!savedFormData || !savedFormData.formId) {
      router.push("/page1");
    } else {
      setFormData(savedFormData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNextStep = async () => {
    if (!formData.address || !formData.phoneNumber) {
      alert("Please fill all the fields");
      return;
    }

    try {
      await axios.post("https://test-6ufl.onrender.com/api/page2", formData);
      localStorage.setItem("formData", JSON.stringify(formData));
      router.push("/page3");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Step 2: Detailed Information
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="button"
          onClick={handleNextStep}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Next
        </button>
      </div>
    </div>
  );
}
