**Subject:** Full Stack Developer Test Task  

### **Task Overview**  

You will create a **WebAPI project** using **C#** and **Entity Framework**, along with a **Single Page Application (SPA)** using **Angular**.  

---

### **Backend Requirements**  

1. **Endpoints**  
   - Create a REST API with the following endpoints:
     - Send "Hello World" to a printer.
     - Send invoice data (Invoice Number, Date, Customer Name, Product details, and Total) to a printer.
     - Add, remove, and retrieve printers from a database.  

2. **Printer Integration**  
   - Integrate with **Epson Thermal Printers**.
   - Use **ESC/POS commands** to send print jobs.  

3. **Database**  
   - Maintain a simple printer record in the database with fields:
     - Printer Name
     - IP Address  
   - Use **MS SQL Server Express** for data storage.  

4. **Dependency Injection**  
   - Use **Dependency Injection (DI)** to manage backend services and business logic. Avoid tightly coupling logic with controllers.  

---

### **Frontend Requirements**  

1. **Angular Components**  
   - Use **100% standalone components** in Angular.  
   - Use **Angular Services** for business logic and API communication.  
   - Leverage **Bootstrap** for styling and **DevExpress** for UI components (trial version is acceptable).  

2. **Pages**  
   - **Printer Management Page**:  
     - Display a list of printers retrieved from the backend.  
     - Add a new printer by entering Printer Name and IP Address.  
     - Remove an existing printer.  

   - **Printer Actions Page** (Two Sections):  
     - **Section 1**:  
       - A dropdown to select a printer by name.  
       - A button to send "Hello World" to the selected printer.  
     - **Section 2**:  
       - Input fields for:
         - Invoice Number  
         - Date  
         - Customer Name  
         - Product details (Product Name, Quantity, Price)  
         - Total Amount  
       - A button to send this data as an invoice to the printer.  

---

### **Expectations**  

1. Write clean, maintainable, and well-documented code.  
2. Ensure the code is modular, scalable, and follows best practices.  
3. Include validation and error handling for inputs and printer connectivity issues.  
4. Submit the project in this GitHub repository with clear setup instructions for both backend and frontend.  

---

### **Optional Bonus Points**  

The following items are not mandatory but will earn you bonus points if implemented:  
1. **Dockerization**:  
   - Provide a Docker setup for the backend and database to simplify deployment.  
2. **Unit Tests**:  
   - Implement unit tests for critical backend functionality and Angular components.  
3. **Validation**:  
   - Add client-side and server-side validations for all input fields.  
4. **Scalability**:  
   - Structure your application for future enhancements, such as supporting additional printer models or protocols.  
5. **Best Practices**:  
   - Use best practices for security, such as data sanitization and HTTPS for communication.  

---

### **Checklist for Deliverables**  

1. Backend project with all required endpoints and DI implementation.  
2. Database schema for printers (MS SQL Server Express).  
3. Frontend project with the specified pages, standalone components, and Angular services.  
4. ESC/POS-based printing functionality for "Hello World" and invoices.  
5. Documentation (README with setup instructions and inline comments).  

---

### **Time Frame**  

You are expected to complete this task within **3-5 days**. Please manage your time effectively.  

If you have any questions, feel free to commit an issue here  

Good luck, and I look forward to seeing your work!  

Best regards,  

---
