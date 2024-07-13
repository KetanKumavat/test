import express from "express";
import pool from "../db.js";
import pdf from "pdf-lib";
import fs from "fs";

const router = express.Router();

router.post('/createForm', async (req, res) => {
  try {
    const newForm = await pool.query(
      'INSERT INTO forms DEFAULT VALUES RETURNING id'
    );
    res.status(201).json({ formId: newForm.rows[0].id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/page1', async (req, res) => {
  const { formId, name, email, age, gender } = req.body;
  try {
    await pool.query(
      'UPDATE forms SET name = $1, email = $2, age = $3, gender = $4 WHERE id = $5',
      [name, email, age, gender, formId]
    );
    res.status(200).json({ message: "Basic Information Added" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/page2', async (req, res) => {
  const { formId, address, phoneNumber } = req.body;
  try {
    await pool.query(
      'UPDATE forms SET address = $1, phoneNumber = $2 WHERE id = $3',
      [address, phoneNumber, formId]
    );
    res.status(200).json({ message: "Detailed Information Added" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/page3', async (req, res) => {
  const { formId, occupation, institute } = req.body;
  try {
    await pool.query(
      'UPDATE forms SET occupation = $1, institute = $2 WHERE id = $3',
      [occupation, institute, formId]
    );
    res.status(200).json({ message: "Occupation and Institute Added" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/fetchFormData/:formId', async (req, res) => {
  const { formId } = req.params;
  try {
    const formData = await pool.query(
      'SELECT * FROM forms WHERE id = $1',
      [formId]
    );
    res.status(200).json(formData.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/downloadPDF/:formId', async (req, res) => {
  const { formId } = req.params;
  try {
    const formData = await pool.query(
      'SELECT * FROM forms WHERE id = $1',
      [formId]
    );

    const data = formData.rows[0];

    const pdfDoc = await pdf.PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText(`Name: ${data.name}`, { x: 50, y: 500 });
    page.drawText(`Email: ${data.email}`, { x: 50, y: 480 });
    page.drawText(`Age: ${data.age}`, { x: 50, y: 460 });
    page.drawText(`Gender: ${data.gender}`, { x: 50, y: 440 });
    page.drawText(`Address: ${data.address}`, { x: 50, y: 420 });
    page.drawText(`Phone Number: ${data.phonenumber}`, { x: 50, y: 400 });
    page.drawText(`Occupation: ${data.occupation}`, { x: 50, y: 380 });
    page.drawText(`Institute: ${data.institute}`, { x: 50, y: 360 });

    const pdfBytes = await pdfDoc.save();

    const fileName = `form_${formId}.pdf`;
    const filePath = `./pdfs/${fileName}`;
    fs.writeFileSync(filePath, pdfBytes);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Failed to download PDF');
      }
      fs.unlinkSync(filePath);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
