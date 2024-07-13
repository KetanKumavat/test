"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    formId: null,
    name: "",
    email: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNextStep = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.age ||
      !formData.gender
    ) {
      alert("Please fill all the fields");
      return;
    }

    try {
      let updatedFormData = { ...formData };

      if (!formData.formId) {
        const response = await axios.post(
          "https://test-6ufl.onrender.com/api/createForm"
        );
        const { formId } = response.data;
        updatedFormData = {
          ...updatedFormData,
          formId: formId,
        };
        setFormData(updatedFormData);
        localStorage.setItem("formData", JSON.stringify(updatedFormData));
        console.log(formId);
      }

      await axios.post(
        "https://test-6ufl.onrender.com/api/page1",
        updatedFormData
      );

      router.push("/page2");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Step 1: Basic Information
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={formData.gender}
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
