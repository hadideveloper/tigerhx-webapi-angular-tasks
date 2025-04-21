Printer Management System
=========================

Technical Implementation
------------------------

- Frontend: Angular 19, DevExtreme UI, Bootstrap 5, Material Dialog
- Backend: ASP.NET Core 6, Entity Framework Core
- Database: SQL Server
- Printing Protocol: ESC/POS over TCP/IP
- API Documentation: Swagger UI

1. Installation
--------------
1.1 Backend Requirements:
- .NET 6 SDK
- SQL Server (local or Docker)

1.2 Frontend Requirements:
- Node.js 18+
- Angular CLI (npm install -g @angular/cli)

2. Configuration
---------------
2.1 Backend:
- Update connection string in appsettings.json:
  "DefaultConnection": "Server=localhost;Database=PrinterDB;Trusted_Connection=True;"

2.2 Frontend:
  apiUrl: 'https://localhost:5001/api'

3. Running the Application
-------------------------
3.1 Backend:
> dotnet run
- API available at https://localhost:5001
- Swagger UI at https://localhost:5001/swagger

3.2 Frontend:
> npm install
> npm start
- Application runs on http://localhost:4200

4. Key Features
--------------
4.1 Printer Management:
- Add/remove printers with IP validation
- Printer list with DevExtreme DataGrid

4.2 Document Printing:
- ESC/POS command support
- Test page printing ("Hello World")
- Invoice generation with dynamic total calculation

4.3 Status Monitoring:
- Printer connection checking
- Error handling (paper out, cover open)

5. Project Structure
-------------------
5.1 Backend:
PrinterBackend/
├── Controllers/       # API endpoints
├── Services/          # Business logic
├── Models/            # DTOs and DB entities
├── Data/              # Entity Framework
└── appsettings.json   # Configuration

5.2 Frontend:
src/
├── app/
│   ├── components/    # UI components
│   ├── models/        # Data interfaces
│   ├── services/      # API client
│   ├── routes/        # Routing
│   └── core/          # Interceptors


6. Integration
-------------
- CORS configured for http://localhost:4200
- JSON for API communication
- Binary data for ESC/POS commands

7. Demonstration
---------------
1. Open http://localhost:4200
2. Printer Management:
   - Add printer with valid IP
   - Remove printers via context menu
3. Print Documents:
   - Generate and print invoices
   - Print test pages

8. Testing
----------
- Backend: dotnet test
- Frontend: npm test (Karma + Jasmine)

9. Deployment
--------------
- Backend: docker build -t printer-api .
- Frontend: npm run build (output in dist/)
Known Issues
------------

1. Current Bugs:
- Add printer modal may require two clicks
- Printer status doesn't auto-refresh
- No print job queue system

2. Planned Fixes:
- Modal lifecycle improvements
- Better state management
- Enhanced error recovery

Future Enhancements
------------------

1. Printer Features:
- Real-time status monitoring
- QR code printing support
- Paper level alerts
- Print job history

2. UI Improvements:
- Dark mode support
- Dashboard with stats
- Printer health indicators
- Mobile-friendly layout

3. Advanced Functionality:
- User authentication
- Role-based access
- Print templates
- Bulk operations

Developer Notes
--------------

### API Endpoints:
- GET    /api/printers       - List all printers
- POST   /api/printers       - Add new printer
- DELETE /api/printers/{id}  - Remove printer
- POST   /api/print/invoice  - Print invoice
- GET    /api/status         - Check printer status

This project represents my first experience with:
- Angular framework (v19)
- DevExtreme UI components (v24)
- Building complete web applications
- ESC/POS printer integration

Troubleshooting
------------------
- Printer not responding? Check:
  1. Correct IP address
  2. Port 9100 is open
  3. Printer is online
- Database issues? Verify:
  1. SQL Server is running
  2. Connection string is correct
  3. Migrations applied

While the application meets core requirements, I'm actively working to improve both the code quality and user experience. The current known issues are being addressed in upcoming updates.